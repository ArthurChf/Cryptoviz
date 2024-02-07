import unittest
from src.process.news.etl_news_transform import transform_news_data, generate_dataframe_from_news
from src.tests.process.news_sample import getSamples
class NewsTransformTest(unittest.TestCase):

    def test_dataframe_generation(self):
        data = getSamples()
        news_df = generate_dataframe_from_news(data)
        self.assertGreater(len(news_df), 0)
        pass
    
    def test_tuple_generation(self):
        data = getSamples()
        news_tuple = list(transform_news_data(data))
        self.assertGreater(len(news_tuple), 0)
        pass

