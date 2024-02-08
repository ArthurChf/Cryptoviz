from abc import ABC, abstractmethod
import sys
import signal
import json
from src.config.kafka_consumer import KafkaConsumer
from confluent_kafka import KafkaException


class ETLProcess(ABC):
    def __init__(self, topic):
        self.topic = topic
        signal.signal(signal.SIGINT, self.signal_handler)
        signal.signal(signal.SIGTERM, self.signal_handler)

    @abstractmethod
    def extract(self):
        consumer = KafkaConsumer(self.topic)
        # Tant qu'on a de la donnée à consommer, on continue
        try:
            consumer.subscribe([self.topic])
            while True:
                message = consumer.consume()
                if message:
                    print(f"Message reçu: {message.value()}")
                    try :
                        json_message = json.loads(message.value().decode('utf-8'))
                        self.transform(json_message)
                    except json.decoder.JSONDecodeError:
                        print('Unable to decode message to JSON: %s', message.value())
                
                consumer.commit()
                
        except KafkaException as e:
            print(f'Error while consuming {self.topic}: {e}')
        finally:
            consumer.close()
        pass

    @abstractmethod
    def transform(self, data):
        pass

    @abstractmethod
    def load(self, data):
        pass
    
    def signal_handler(self, signum, frame):
        print(f'Signal d\'arrêt reçu, fermeture du processus pour le topic {self.topic}')  
        sys.exit(0)