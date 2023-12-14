import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SchemaRegisteryService {
    private readonly registry = new SchemaRegistry({ host: 'http://registry:8081/' });

    public async checkSchema(topicId: number, schema: unknown) {
        return await this.registry.encode(topicId, schema);
    }
}
