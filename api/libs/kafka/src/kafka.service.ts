import { Injectable } from '@nestjs/common';
import { Kafka, KafkaJSError, KafkaJSNumberOfRetriesExceeded, logLevel } from 'kafkajs';
import type { RSSNews } from '@/libs/entities/src';
import { KafkaTopicEnum } from '@/libs/kafka/src/topic.enum';

@Injectable()
export class KafkaService {
    private readonly kafka = new Kafka({
        brokers: ['broker-1:9092', 'broker-2:9092', 'broker-3:9092'],
        logLevel: logLevel.NOTHING
    });
    private readonly binanceProducer = this.kafka.producer();
    private readonly rssfeedProducer = this.kafka.producer();
    private readonly topics: KafkaTopicEnum[] = [];

    public constructor() {
        this.init();
    }

    private handleError(error: unknown, from: string) {
        if (error instanceof KafkaJSNumberOfRetriesExceeded) {
            console.error(`${from} | Connexion Kafka - nombre de tentatives atteint`, error);
        } else if (error instanceof KafkaJSError) {
            console.error(`${from} | Erreur de connexion Kafka`, error);
        } else {
            console.error(`${from} | Erreur Kafka inconnue`, error);
        }
    }

    private async init() {
        try {
            await this.binanceProducer.connect();
            await this.rssfeedProducer.connect();
        } catch (error) {
            this.handleError(error, 'INIT');
        }
    }

    private async createTopic(topic: KafkaTopicEnum) {
        const admin = this.kafka.admin();
        await admin.connect();
        const clusterInfo = await admin.describeCluster();
        const numBrokers = clusterInfo.brokers.length;

        await admin.createTopics({
            topics: [{
                topic,
                numPartitions: 1,
                replicationFactor: numBrokers,
                configEntries: [
                    {
                        name: 'cleanup.policy',
                        value: 'delete'
                    },
                    {
                        name: 'retention.ms',
                        // 5 minutes
                        value: '300000'
                    }
                ]
            }]
        });
        this.topics.push(topic);
        await admin.disconnect();
    }

    public async sendRssNews(messages: RSSNews[]) {
        try {
            if (!this.topics.includes(KafkaTopicEnum.RSS_FEED_BACKUP)) await this.createTopic(KafkaTopicEnum.RSS_FEED_BACKUP);
            if (!this.topics.includes(KafkaTopicEnum.RSS_FEED_PROCESSING)) await this.createTopic(KafkaTopicEnum.RSS_FEED_PROCESSING);
            await this.rssfeedProducer.send({
                topic: KafkaTopicEnum.RSS_FEED_BACKUP,
                messages: [{ value: JSON.stringify(messages) }]
            });
            await this.rssfeedProducer.send({
                topic: KafkaTopicEnum.RSS_FEED_PROCESSING,
                messages: [{ value: JSON.stringify(messages) }]
            });
        } catch (e) {
            this.handleError(e, 'RSS News');
        }
    }

    public async sendBinanceData(message: string) {
        try {
            if (!this.topics.includes(KafkaTopicEnum.BINANCE_DATA_BACKUP)) await this.createTopic(KafkaTopicEnum.BINANCE_DATA_BACKUP);
            if (!this.topics.includes(KafkaTopicEnum.BINANCE_DATA_PROCESSING)) await this.createTopic(KafkaTopicEnum.BINANCE_DATA_PROCESSING);
            await this.binanceProducer.send({
                topic: KafkaTopicEnum.BINANCE_DATA_BACKUP,
                messages: [{ value: message }]
            });
            await this.binanceProducer.send({
                topic: KafkaTopicEnum.BINANCE_DATA_PROCESSING,
                messages: [{ value: message }]
            });
            console.log('Message sent successfully');
        } catch (e) {
            this.handleError(e, 'Binance Data');
        }
    }
}
