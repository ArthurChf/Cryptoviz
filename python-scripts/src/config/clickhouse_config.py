import clickhouse_connect
from enum import Enum
from src.models.crypto_news_data import CryptoNewsData

class ClickHouseTableEnum(Enum):
    CRYPTO_DATA = 'crypto'
    NEWS_DATA = 'news'
    CRYPTO_NEWS = 'crypto_news'

class ClickHouseConfig:
    def __init__(self, host, port, username, password, database):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.database = database
        self.client = clickhouse_connect.get_client(host=self.host, port=self.port, username=self.username, password=self.password, database = self.database)
        self.binanceSchema = """
                                CREATE TABLE crypto (
                                    id UUID DEFAULT generateUUIDv4(),
                                    symbol String,
                                    name String,
                                    coin String,
                                    reference String,
                                    createdAt DateTime,
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
        # Les deux schémas suivant utilisent le moteur de stockage ReplacingMergeTree afin de gérer les doublons
        self.newsSchema = """
                                CREATE TABLE news (
                                    id String,
                                    title String,
                                    author String,
                                    link String,
                                    createdAt DateTime,
                                    content String,
                                    sentiment Int32,
                                    source String
                                ) ENGINE = ReplacingMergeTree
                                  ORDER BY (id)
                         """
        self.cryptoNewsSchema = """
                                CREATE TABLE crypto_news (
                                    id UUID DEFAULT generateUUIDv4(),
                                    news_data_id String,
                                    symbol String
                                ) ENGINE = ReplacingMergeTree
                                ORDER BY (news_data_id, symbol)
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
                INSERT INTO crypto (
                    symbol, name, coin, reference, createdAt, totalTradedBaseAssetVolume, lastTradeId, priceChange, 
                    lastPrice, highPrice, lowPrice, totalNumberOfTrades, lastQuantity
                ) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                """
        return self.client.query(query, data)


    def insert_many(self, data):
        self.ensure_table_exists(ClickHouseTableEnum.NEWS_DATA.value)
        self.ensure_table_exists(ClickHouseTableEnum.CRYPTO_NEWS.value)
        
        news_values = []
        crypto_news_values = []
        
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
                    item[6],
                    item[8]
                )
            )
            for symbol in item[7]:
                crypto_news_value = CryptoNewsData(news_id, symbol)
                crypto_news_values.append(
                    crypto_news_value.getTuple()
                )
        
        # On construit la requête d'insertion pour les news et on envoie dans une seule requête
        news_query = "INSERT INTO news ( id, title, author, link, createdAt, content, sentiment, source ) VALUES "
        
        values_placeholders = []

        for row in news_values:
            placeholders = ["%s"] * len(row)
            values_placeholders.append("({})".format(", ".join(placeholders)))

        news_query += ", ".join(values_placeholders)
        flattened_news_values = [item for sublist in news_values for item in sublist]
        
        # Avant d'insérer, on vérifie que les news existent dans la table news
        crypto_news_values_union = " UNION ALL ".join([
            "SELECT '{}' AS news_data_id, '{}' AS symbol".format(el[0], el[1])
            for el in crypto_news_values
        ])
        crypto_news_query = f"""
        INSERT INTO crypto_news (news_data_id, symbol)
        SELECT news_data_id, symbol
        FROM (
            SELECT * 
            FROM ({crypto_news_values_union}) 
            WHERE news_data_id IN (
                SELECT id FROM news
            )
        ) AS subquery
        """
                
        try:
            if len(news_values) > 0:
                self.client.query(news_query, flattened_news_values)

            if crypto_news_values:
                self.client.query(crypto_news_query)
            
        except Exception as e:
            print(f"Une erreur est survenue: {e}")

        

        