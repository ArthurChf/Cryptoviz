import clickhouse_connect
from enum import Enum
import uuid

class ClickHouseTableEnum(Enum):
    CRYPTO_DATA = 'crypto_data'
    NEWS_DATA = 'news_data'
    CRYPTO_NEWS = 'crypto_news'

class ClickHouseConfig:
    def __init__(self, host, port, username, database):
        self.host = host
        self.port = port
        self.username = username
        self.database = database
        self.client = clickhouse_connect.get_client(host=self.host, port=self.port, username=self.username, database = self.database)
        self.binanceSchema = """
                                CREATE TABLE crypto_data (
                                    id UUID DEFAULT generateUUIDv4(),
                                    symbol String,
                                    coin String,
                                    reference String,
                                    createdAt UInt64,
                                    totalTradedBaseAssetVolume String,
                                    lastTradeId UInt64,
                                    priceChange String,
                                    lastPrice String,
                                    highPrice String,
                                    lowPrice String,
                                    totalNumberOfTrades UInt64,
                                    lastQuantity String
                                ) ENGINE = MergeTree()
                                ORDER BY (event_time, symbol)
                                """

        self.newsSchema = """
                                CREATE TABLE news_data (
                                    id UUID DEFAULT generateUUIDv4(),
                                    title String,
                                    author String,
                                    link String,
                                    createdAt String,
                                    content String,
                                    sentiment Int32,
                                    Version UInt64 DEFAULT now()
                                ) ENGINE = ReplacingMergeTree(Version)
                                ORDER BY (title, author, publishedAt)
                         """
        self.cryptoNewsSchema = """
                                CREATE TABLE crypto_news (
                                    id UUID DEFAULT generateUUIDv4(),
                                    symbol String,
                                    news_data_id UUID,
                                    Version UInt64 DEFAULT now()
                                ) ENGINE = ReplacingMergeTree(Version)
                                ORDER BY (title, author, publishedAt)
                         """
                                
    
    def ensure_table_exists(self, table_name):
        if not self.does_table_exist(table_name):
            if table_name == ClickHouseTableEnum.CRYPTO_DATA.value:
                create_table_query = f"{self.binanceSchema}"
            if table_name == ClickHouseTableEnum.NEWS_DATA.value:
                create_table_query = f"{self.newsSchema}"
            if table_name == ClickHouseTableEnum.CRYPTO_NEWS.value:
                create_table_query = f"{self.cryptoNewsSchema}"
            self.client.query(create_table_query)

    def does_table_exist(self, table_name):
        check_query = f"EXISTS TABLE {table_name}"
        result = self.client.query(check_query)
        return result.result_rows[0][0] == 1

    
    def insert_one(self, data):
        self.ensure_table_exists(ClickHouseTableEnum.CRYPTO_DATA.value)
        query = """
                INSERT INTO crypto_data (
                    symbol, coin, reference, createdAt, totalTradedBaseAssetVolume, lastTradeId, priceChange, 
                    lastPrice, highPrice, lowPrice, totalNumberOfTrades, lastQuantity
                ) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
        # values = (
        #             data["symbol"],
        #             data["coin"],
        #             data["reference"],
        #             data["createdAt"],
        #             data["total_traded_base_asset_volume"],
        #             data["last_trade_id"],
        #             data["price_change"],
        #             data["last_price"],
        #             data["high_price"],
        #             data["low_price"],
        #             data["total_number_of_trades"]
        #             data["last_quantity"]
        #         )

        return self.client.query(query, data)


    def insert_many(self, data):
        self.ensure_table_exists(ClickHouseTableEnum.NEWS_DATA.value)
        self.ensure_table_exists(ClickHouseTableEnum.CRYPTO_NEWS.value)
        
        news_query = "INSERT INTO news_data ( id, title, author, link, createdAt, content, sentiment ) VALUES (%s, %s, %s, %s, %s, %s, %s) "
        crypto_news_query = "INSERT INTO crypto_news ( symbol, news_data ) VALUE (%s, %s)"
        
        news_values = []
        crypto_news_values = []
        
        for item in data:
            news_id = uuid.uuid4()
            news_values.append(
                (
                    news_id, 
                    item['title'], 
                    item['author'], 
                    item['link'], 
                    item['createdAt'], 
                    item['content'], 
                    item['sentiment']
                )
            )
            for symbol in item['currencies']:
                crypto_news_values.append(
                    (
                        symbol,
                        news_id
                    )
                )
        
        try:
            if len(news_values) > 0:
                self.client.query(news_query, news_values)

            if crypto_news_values:
                self.client.query(crypto_news_query, crypto_news_values)
            
        except Exception as e:
            print(f"Une erreur est survenue: {e}")

        

        