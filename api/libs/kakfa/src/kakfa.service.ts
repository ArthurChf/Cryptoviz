import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import type { BinanceTicker, RSSNews } from '@/libs/entities/src';
import { SchemaRegisteryService } from './schema-registery.service';

@Injectable()
export class KakfaService {
    private readonly kafka = new Kafka({
        brokers: ['localhost:9092']
    });

    private readonly producer = this.kafka.producer();

    public constructor(private readonly schemaRegisteryService: SchemaRegisteryService) {
        this.connect();
    }

    private async connect() {
        await this.producer.connect();
    }

    public async createTopic(topic: string) {
        const admin = this.kafka.admin();
        await admin.connect();
        await admin.createTopics({
            topics: [{
                topic,
                numPartitions: 1,
                replicationFactor: 1
            }]
        });
        await admin.disconnect();
    }

    public async sendMessage(topic: string, topicId: number, message: RSSNews[] | BinanceTicker[] | unknown[]) {
        try {
            await this.createTopic(topic);
            const encodedMessage = await this.schemaRegisteryService.checkSchema(topicId, message);
            await this.producer.send({
                topic,
                messages: [{ value: encodedMessage }]
            });
            console.log('Message sent successfully');
        } catch (error) {
            console.error('Failed to send message', error);
        }
    }
}
