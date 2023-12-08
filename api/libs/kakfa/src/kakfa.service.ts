import { Injectable } from '@nestjs/common';
import { Kafka } from "kafkajs";
import {BinanceTicker, RSSNews} from "@app/entities";
import { SchemaRegisteryService } from "./schema-registery.service";

@Injectable()
export class KakfaService {
    private kafka = new Kafka({
        brokers: ['localhost:9092'],
    });

    private producer = this.kafka.producer();

    constructor(private readonly schemaRegisteryService: SchemaRegisteryService) {
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
                replicationFactor: 1,
            }],
        });
        await admin.disconnect();
    }

    async sendMessage(topic: string, topicId: number, message: RSSNews[] | BinanceTicker[] | any[]) {
        try {
            await this.createTopic(topic);
            const encodedMessage = await this.schemaRegisteryService.checkSchema(topicId, message);
            await this.producer.send({
                topic,
                messages: [{ value: encodedMessage }],
            });
            console.log('Message sent successfully');
        } catch (error) {
            console.error('Failed to send message', error);
        }
    }
}
