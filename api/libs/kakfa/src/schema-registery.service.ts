import {SchemaRegistry} from "@kafkajs/confluent-schema-registry";
import {Injectable} from "@nestjs/common";

@Injectable()
export class SchemaRegisteryService {
    private registry = new SchemaRegistry({ host: 'http://registry:8081/' });

    async checkSchema(topicId: number, schema: any) {
        return await this.registry.encode(topicId, schema);
    }

}