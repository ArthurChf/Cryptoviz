from src.process.etl_process import ETLProcess
from src.process.binance.binance_transform import transform_binance_data

class BinanceProcess(ETLProcess):
    def __init__(self, process, topic):
        super().__init__(process, topic)

    def extract(self):
        super().extract()

    def transform(self, data):
        transformed_data = transform_binance_data(data)
        self.load(transformed_data)