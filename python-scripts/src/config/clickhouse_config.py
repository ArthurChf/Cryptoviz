import clickhouse_connect
from enum import Enum

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
                                    createdAt DateTime64(3, 'Europe/London'),
                                    totalTradedBaseAssetVolume String,
                                    lastTradeId UInt64,
                                    priceChange String,
                                    lastPrice String,
                                    highPrice String,
                                    lowPrice String,
                                    totalNumberOfTrades UInt64,
                                    lastQuantity String
                                ) ENGINE = MergeTree()
                                ORDER BY (createdAt, symbol)
                                """

        self.newsSchema = """
                                CREATE TABLE news_data (
                                    id UUID,
                                    title String,
                                    author String,
                                    link String,
                                    createdAt DateTime64(3, 'Europe/London'),
                                    content String,
                                    sentiment Int32,
                                    Version UInt64 DEFAULT now()
                                ) ENGINE = ReplacingMergeTree(Version)
                                ORDER BY (link, createdAt, sentiment, title, author, content)
                         """
        self.cryptoNewsSchema = """
                                CREATE TABLE crypto_news (
                                    id UUID DEFAULT generateUUIDv4(),
                                    symbol String,
                                    title String,
                                    Version UInt64 DEFAULT now()
                                ) ENGINE = ReplacingMergeTree(Version)
                                ORDER BY (symbol, title)
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
                VALUES (%s, %s, %s, toDateTime64(%s, 3), %s, %s, %s, %s, %s, %s, %s, %s)
                """
        return self.client.query(query, data)


    def insert_many(self, data):
        self.ensure_table_exists(ClickHouseTableEnum.NEWS_DATA.value)
        self.ensure_table_exists(ClickHouseTableEnum.CRYPTO_NEWS.value)
        
        news_values = []
        crypto_news_values = []
        
        news_query = "INSERT INTO news_data ( id, title, author, link, createdAt, content, sentiment ) VALUES ( %s, %s, %s, %s, toDateTime64(%s, 3), %s, %s )"

        
        for item in data:
            news_id = str(item[0])
            
            news_values.append(
                (
                    news_id, 
                    item[1], 
                    item[2], 
                    item[3], 
                    item[4], 
                    item[5],
                    item[6]
                )
            )
            self.client.query(news_query, (
                    news_id, 
                    item[1], 
                    item[2], 
                    item[3], 
                    item[4], 
                    item[5],
                    item[6]
                ))
            for symbol in item[7]:
                crypto_news_values.append(
                    (
                        symbol,
                        item[1]
                    )
                )
        
        for el in crypto_news_values:
            self.client.query(f"INSERT INTO crypto_news (symbol, title) VALUES ('{el[0]}', '{el[1]}')")

        

        