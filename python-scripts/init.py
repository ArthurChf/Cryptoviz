import multiprocessing
import time
from clickhouse_connect import get_client

from enum import Enum
from src.process.binance.etl_binance_process import EtlBinanceProcess
from src.process.news.etl_news_process import EtlNewsProcess

class Topic(Enum):
    BINANCE_DATA_PROCESSING = 'BINANCE_DATA_PROCESSING'
    BINANCE_DATA_BACKUP = 'BINANCE_DATA_BACKUP'
    RSS_FEED_PROCESSING = 'RSS_FEED_PROCESSING'
    RSS_FEED_BACKUP = 'RSS_FEED_BACKUP'


def check_database_connection():
    max_retries = 5
    duration_between_retries = 5
    retries_count = 0
    db_name = 'cryptoviz'

    while retries_count < max_retries:
        client = None
        try:
            client = get_client(host='clickhouse', user='epitech', password='admin', database=db_name)
            if database_exists(client, db_name):
                print("Connexion à la base de données 'cryptoviz' réussie.")
                return 
            else:
                print(f"La base de données {db_name} n'existe pas.")
                retries_count += 1
        except Exception as e:
            print(f"Erreur lors de la tentative de connexion : {e}")
            retries_count += 1
        finally:
            if client:
                client.close()

        time.sleep(duration_between_retries)

    print(f"Impossible de se connecter à la base de données après {max_retries} tentatives. Arrêt du programme.")
    exit(1)



def database_exists(client, db_name):
    try:
        databases = client.command('SHOW DATABASES')
        return db_name in databases
    except Exception as e:
        print(f"La base de données {db_name} n'existe pas : {e}")
        return False
    
def binance_data_process():
    binance_etl = EtlBinanceProcess(Topic.BINANCE_DATA_PROCESSING.value)
    binance_etl.extract()

def news_data_process():
    news_etl = EtlNewsProcess(Topic.RSS_FEED_PROCESSING.value)
    news_etl.extract()
    
if __name__ == "__main__":
    check_database_connection()
    print("Base de données 'cryptoviz' prête. Démarrage des processus.")
    process_binance = multiprocessing.Process(target=binance_data_process)
    process_news = multiprocessing.Process(target=news_data_process)
    process_binance.start()
    process_news.start()
    process_binance.join()
    process_news.join()
