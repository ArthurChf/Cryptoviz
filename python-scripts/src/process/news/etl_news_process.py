from src.process.etl_process import ETLProcess
from src.config.clickhouse_config import ClickHouseConfig
from src.process.news.etl_news_transform import transform_news_data
from utils.env_utils import get_env

class EtlNewsProcess(ETLProcess):
    def __init__(self, topic):
        super().__init__(topic)
        self.clickhouse = ClickHouseConfig(
            get_env('CLICKHOUSE_HOST'), 
            get_env('CLICKHOUSE_PORT'), 
            get_env('CLICKHOUSE_USER'), 
            get_env('CLICKHOUSE_PASSWORD'), 
            get_env('CLICKHOUSE_DB')
        )
        

    def extract(self):
        super().extract()

    def transform(self, data):
        transformed_data = transform_news_data(data)
        self.load(transformed_data)
    
    def load(self, data):
        self.clickhouse.insert_many(data)
        pass