import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import type { BinanceTicker, RSSNews } from '@/libs/entities/src';
import { KafkaTopicEnum } from '@/libs/kafka/src/topic.enum';

@Injectable()
export class KafkaService {
    private readonly kafka = new Kafka({
        brokers: ['localhost:19092']
    });
    private readonly binanceProducer = this.kafka.producer();
    private readonly rssfeedProducer = this.kafka.producer();
    private readonly topics: KafkaTopicEnum[] = [];

    public constructor() {
        this.init();
    }

    private async init() {
        await this.binanceProducer.connect();
        await this.rssfeedProducer.connect();
    }

    private async createTopic(topic: KafkaTopicEnum) {
        const admin = this.kafka.admin();
        await admin.connect();
        await admin.createTopics({
            topics: [{
                topic,
                numPartitions: 1,
                replicationFactor: 1
            }]
        });
        this.topics.push(topic);
        await admin.disconnect();
    }

    public async sendRssNews(messages: RSSNews[]) {
        try {
            if (!this.topics.includes(KafkaTopicEnum.RSS_FEED)) await this.createTopic(KafkaTopicEnum.RSS_FEED);
            await this.rssfeedProducer.send({
                topic: KafkaTopicEnum.RSS_FEED,
                messages: [{ value: JSON.stringify(messages) }]
            });
        } catch (e) {
            console.log('Failed to send rss feed', e);
        }
    }

    public async sendBinanceData(message: BinanceTicker | string) {
        try {
            if (!this.topics.includes(KafkaTopicEnum.BINANCE_DATA)) await this.createTopic(KafkaTopicEnum.BINANCE_DATA);
            await this.binanceProducer.send({
                topic: KafkaTopicEnum.BINANCE_DATA,
                messages: [{ value: typeof message === 'string' ? message : JSON.stringify(message) }]
            });
            console.log('Message sent successfully');
        } catch (e) {
            console.log('Failed to send rss feed', e);
        }
    }
}
