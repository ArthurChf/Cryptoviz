from src.backup.backup import Backup
from src.config.mongodb_config import MongoDBConfig
from src.common.env_utils import get_env

class NewsBackup(Backup):
    def __init__(self, topic):
        super().__init__(topic)
        self.topic = topic
        self.mongodb_config = MongoDBConfig(
            get_env('MONGO_HOST'),
            int(get_env('MONGO_PORT')),
            get_env('MONGO_USER'),
            get_env('MONGO_PASSWORD'),
            get_env('MONGO_DB'),
        )

    def extract(self):
        super().extract()

    def load(self, data):
        self.mongodb_config.upsert_many(self.topic, data)
        pass
    