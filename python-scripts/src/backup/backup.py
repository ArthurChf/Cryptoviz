from abc import ABC, abstractmethod
import sys
import signal
import json
from src.config.kafka_consumer import KafkaConsumer
from confluent_kafka import KafkaException


class Backup(ABC):
    def __init__(self, topic):
        self.topic = topic
        signal.signal(signal.SIGINT, self.signal_handler)
        signal.signal(signal.SIGTERM, self.signal_handler)

    @abstractmethod
    def extract(self):
        consumer = KafkaConsumer(self.topic)
        try:
            consumer.subscribe([self.topic])
            print(f"Consommation du topic {self.topic}")
            while True:
                message = consumer.consume()
                print(f"Message reçu: {message}")
                if message:
                    print(f"Message reçu: {message.value()}")
                    try :
                        json_message = json.loads(message.value().decode('utf-8'))
                        self.load(json_message)
                    except json.decoder.JSONDecodeError:
                        print('Unable to decode message to JSON: %s', message.value())
                    consumer.commit()
                
        except KafkaException as e:
            print(f'Error while consuming {self.topic}: {e}')
        finally:
            consumer.close()
        pass

    @abstractmethod
    def load(self, data):
        pass
    
    def signal_handler(self, signum, frame):
        print(f'Signal d\'arrêt reçu, fermeture du processus pour le topic {self.topic}')  
        sys.exit(0)