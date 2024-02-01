import unittest

from src.config.clickhouse_config import ClickHouseConfig

class ClickHouseConfigTest(unittest.TestCase):
    
    def test_insert_one(self):
        clickhouse_config = ClickHouseConfig('localhost', 8123, 'default', 'default')
        data = [('BTCUSDT', 1609459200000, '0.00000000', 0, '0.00000000', '0.00000000', '0.00000000', '0.00000000', 0, '0.00000000')]
        clickhouse_config.insert_one(data)
        self.assertTrue(True)
    
    def test_insert_many(self):
        clickhouse_config = ClickHouseConfig('localhost', 8123, 'default', 'default')
        data = [('Test 1', 'John Doe', '2021-02-01', 80, 'BTC'), ('Test 1', 'John Doe', '2021-02-01', 80, 'BTC'),  ('Test 2', 'John Doe', '2021-02-02', 90, 'BTC')]
        clickhouse_config.insert_many(data)
        self.assertTrue(True)
    
    if __name__ == '__main__':
        unittest.main()