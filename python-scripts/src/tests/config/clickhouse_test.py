import unittest
from src.config.clickhouse_config import ClickHouseConfig
import uuid
from datetime import datetime


class ClickHouseConfigTest(unittest.TestCase):
        
    def test_insert_one(self):
        clickhouse_config = ClickHouseConfig('clickhouse', 8123, 'epitech', 'admin', 'cryptoviz')
        data = (
            'BTCUSDT',
            'Bitcoin',
            'BTC',
            'USDT',
            1754314812,
            '100000' ,
            1000,
            '30',
            '0.7',
            '0.8',
            '0.1',
            100000,
            '4000'             
        )
        clickhouse_config.insert_one(data)
        self.assertTrue(True)
    
    def test_insert_many(self):
        clickhouse_config = ClickHouseConfig('clickhouse', 8123, 'epitech', 'admin', 'cryptoviz')

        data = [
            (uuid.uuid4(), 'Test 3', 'John Doe', 'https//test.com?4', datetime.strptime('2021-02-02', "%Y-%m-%d").timestamp(), 'btc and eth is great rere', 70, ['BTC', 'ETH']), 
            (uuid.uuid4(), 'Test 3', 'John Doe', 'https//test.com?4', datetime.strptime('2021-02-02', "%Y-%m-%d").timestamp(), 'btc and eth is great rere', 70, ['BTC', 'ETH']), 
        ]
        clickhouse_config.insert_many(data)
        self.assertTrue(True)
    
    if __name__ == '__main__':
        unittest.main()