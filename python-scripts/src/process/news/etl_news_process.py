from src.process.etl_process import ETLProcess
from src.config.clickhouse_config import ClickHouseConfig
from src.process.news.etl_news_transform import transform_news_data

class EtlNewsProcess(ETLProcess):
    def __init__(self, topic):
        super().__init__(topic)
        self.clickhouse = ClickHouseConfig('clickhouse', 8123, 'default', 'default')
        

    def extract(self):
        super().extract()

    def transform(self, data):
        transformed_data = transform_news_data(data)
        self.load(transformed_data.toTuple())
    
    def load(self, data):
        self.clickhouse.insert_many(data)
        pass