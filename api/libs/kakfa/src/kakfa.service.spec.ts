import { KakfaService } from './kakfa.service';

describe('KakfaService', () => {
  let kafkaService: KakfaService;
  let mockKafkaProducer;
  let mockSchemaRegistry;
  let mockKafkaAdmin;

  beforeEach(async () => {
    mockKafkaProducer = {
      connect: jest.fn(),
      send: jest.fn(),
      producer: jest.fn(() => mockKafkaProducer)
    };

    mockSchemaRegistry = {
      encode: jest.fn(),
    };

    kafkaService = new KakfaService(mockSchemaRegistry);
  });

  it('should create a topic', async () => {
    const topic = 'test-topic';

    await kafkaService.createTopic(topic);

    expect(mockKafkaAdmin.connect).toHaveBeenCalled();
    expect(mockKafkaAdmin.createTopics).toHaveBeenCalledWith({
      topics: [{
        topic,
        numPartitions: 1,
        replicationFactor: 1,
      }],
    });
    expect(mockKafkaAdmin.disconnect).toHaveBeenCalled();
  });

  it('should send a message in Avro format', async () => {
    const topic = 'test-topic';
    const message = [{test: 'test'}];
    const encodedMessage = Buffer.from('encoded');

    mockSchemaRegistry.encode.mockResolvedValue(encodedMessage);

    await kafkaService.sendMessage(topic, 3, message);

    expect(mockSchemaRegistry.encode).toHaveBeenCalled();
    expect(mockKafkaProducer.send).toHaveBeenCalledWith({
      topic,
      messages: [{value: encodedMessage}],
    });
  });
});
