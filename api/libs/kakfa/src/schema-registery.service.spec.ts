import { Test, TestingModule } from '@nestjs/testing';
import { KakfaService } from './kakfa.service';
import type { Kafka } from 'kafkajs';
import { SchemaRegistry } from '@kafkajs/confluent-schema-registry';

describe('KafkaService', () => {
    let kafkaService: Kafka;
    let mockKafkaProducer;
    let mockSchemaRegistry;
});

