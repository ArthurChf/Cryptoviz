import unittest

from src.config.mongodb_config import MongoDBConfig

class MongoDBConfigTest(unittest.TestCase):
    
    def test_get_uri(self):
        mongo_config = MongoDBConfig('localhost', 27017, 'epitech', 'cryptoviz', 'test')
        self.assertEqual(mongo_config.get_uri(), 'mongodb://epitech:cryptoviz@localhost')
    
    def test_get_client(self):
        mongo_config = MongoDBConfig('localhost', 27017, 'epitech', 'cryptoviz', 'test')
        self.assertIsNotNone(mongo_config.get_client())
    
    def test_insert_one(self):
        mongo_config = MongoDBConfig('localhost', 27017, 'epitech', 'cryptoviz', 'test')
        self.assertIsNotNone(mongo_config.insert_one('binance-test', {'crypto': 'BTC', 'symbol': 'USDT', 'price': 10}))
    
    def test_upsert_many(self):
        mongo_config = MongoDBConfig('localhost', 27017, 'epitech', 'cryptoviz', 'test')
        documents = [{'author': 'john doe', 'title': 'terre', 'publishedAt': '2024-01-01'}, {'author': 'john doe', 'title': 'feu', 'publishedAt': '2024-01-01'}, {'author': 'john doe', 'title': 'terre', 'publishedAt': '2024-01-01'}]
        self.assertIsNotNone(mongo_config.upsert_many('news-test', documents))
    
    if __name__ == '__main__':
        unittest.main()