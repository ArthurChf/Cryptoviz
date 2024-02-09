from src.process.etl_process import ETLProcess
from src.process.binance.etl_binance_transform import transform_binance_data
from src.config.clickhouse_config import ClickHouseConfig
from utils.env_utils import get_env

class EtlBinanceProcess(ETLProcess):
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
        transformed_data = transform_binance_data(data)
        self.load(transformed_data.toTuple())
    
    def load(self, data):
        self.clickhouse.insert_one(data)
        pass