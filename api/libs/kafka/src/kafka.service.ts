import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import type { BinanceTicker, RSSNews } from '@/libs/entities/src';
import type { KafkaTopicEnum } from '@/libs/kafka/src/topic.enum';

@Injectable()
export class KafkaService {
    private readonly kafka = new Kafka({
        brokers: ['localhost:19092']
    });
    private readonly producer = this.kafka.producer();
    private readonly topics: KafkaTopicEnum[] = [];

    public constructor() {
        this.init();
    }

    private async init() {
        await this.producer.connect();
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

    public async sendMessage(topic: KafkaTopicEnum, message: BinanceTicker | string) {
        try {
            if (!this.topics.includes(topic)) await this.createTopic(topic);
            await this.producer.send({
                topic,
                messages: [{ value: typeof message === 'string' ? message : JSON.stringify(message) }]
            });
            console.log('Message sent successfully');
        } catch (error) {
            console.error('Failed to send message', error);
        }
    }
}
