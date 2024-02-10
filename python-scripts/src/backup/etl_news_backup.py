from src.backup.etl_backup import ETLBackup
from src.config.mongodb_config import MongoDBConfig
from src.common.env_utils import get_env

class ETLNewsBackup(ETLBackup):
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
    