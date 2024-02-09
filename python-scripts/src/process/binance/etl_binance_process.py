from src.process.etl_process import ETLProcess
from src.process.binance.etl_binance_transform import transform_binance_data
from src.config.clickhouse_config import ClickHouseConfig

class EtlBinanceProcess(ETLProcess):
    def __init__(self, topic):
        super().__init__(topic)
        self.clickhouse = ClickHouseConfig('clickhouse', 8123, 'epitech', 'admin', 'cryptoviz')
        

    def extract(self):
        super().extract()

    def transform(self, data):
        transformed_data = transform_binance_data(data)
        self.load(transformed_data.toTuple())
    
    def load(self, data):
        self.clickhouse.insert_one(data)
        pass