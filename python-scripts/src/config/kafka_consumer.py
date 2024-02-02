from confluent_kafka import Consumer, KafkaError, KafkaException

class KafkaConsumer:
    def __init__(self, topic):
        self.topic = topic
        self.consumer = self.create_consumer()
    
    def create_consumer(self):
        consumer_config = {
            'bootstrap.servers': 'broker-1:9092,broker-2:9092,broker-3:9092',
            'group.id': self.topic,
            'auto.offset.reset': 'earliest',
            'enable.auto.commit': False,
            'fetch.min.bytes': 30000    
        }
        return Consumer(consumer_config)

    def consume(self):
        try:
            msg = self.consumer.poll()
            if msg is None:
                return None
            if msg.error():
                print(f"Consumer error: {msg.error()}")
                return None
            return msg
        except Exception as e:
            print(f"Error in consume: {e}")
            return None

    def commit(self):
        self.consumer.commit(asynchronous=False)

    def close(self):
        self.consumer.close()