import multiprocessing
import signal
import json
import sys

from enum import Enum
from src.process.binance.etl_binance_process import EtlBinanceProcess
from src.process.news.etl_news_process import EtlNewsProcess

class Topic(Enum):
    BINANCE_DATA_PROCESSING = 'BINANCE_DATA_PROCESSING'
    BINANCE_DATA_BACKUP = 'BINANCE_DATA_BACKUP'
    RSS_FEED_PROCESSING = 'RSS_FEED_PROCESSING'
    RSS_FEED_BACKUP = 'RSS_FEED_BACKUP'
    
def binance_data_process():
    binance_etl = EtlBinanceProcess(Topic.BINANCE_DATA_PROCESSING.value)
    binance_etl.extract()

def news_data_process():
    news_etl = EtlNewsProcess(Topic.RSS_FEED_PROCESSING.value)
    news_etl.extract()
    
if __name__ == "__main__":
    process_binance = multiprocessing.Process(target=binance_data_process)
    process_news = multiprocessing.Process(target=news_data_process)
    process_binance.start()
    process_binance.join()
    process_news.start()
    process_news.join()
