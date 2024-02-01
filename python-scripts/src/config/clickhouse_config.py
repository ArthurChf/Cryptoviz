import clickhouse_connect

class ClickHouseConfig:
    def __init__(self, host, port, username, database):
        self.host = host
        self.port = port
        self.username = username
        self.database = database
        self.client = clickhouse_connect.get_client(host=self.host, port=self.port, username=self.username, database = self.database)
        self.binanceSchema = """
                                (
                                    id UUID DEFAULT generateUUIDv4(),
                                    symbol String,
                                    event_time UInt64,
                                    total_traded_base_asset_volume String,
                                    last_trade_id UInt64,
                                    price_change String,
                                    last_price String,
                                    high_price String,
                                    low_price String,
                                    total_number_of_trades UInt64,
                                    last_quantity String
                                ) ENGINE = MergeTree()
                                ORDER BY (event_time, symbol)
                                """

        self.newsSchema = """
                                (
                                    id UUID DEFAULT generateUUIDv4(),
                                    title String,
                                    author String,
                                    publishedAt String,
                                    sentiment Int32,
                                    cryptocurrency String,
                                    Version UInt64 DEFAULT now()
                                ) ENGINE = ReplacingMergeTree(Version)
                                ORDER BY (title, author, publishedAt)
                         """
                                
    
    def ensure_table_exists(self, table_name, table_schema):
        if not self.does_table_exist(table_name):
            create_table_query = f"CREATE TABLE {table_name} {table_schema}"
            self.client.query(create_table_query)

    def does_table_exist(self, table_name):
        check_query = f"EXISTS TABLE {table_name}"
        result = self.client.query(check_query)  # Utilisez execute pour exécuter la requête
        return result.result_rows[0][0] == 1

    
    def insert_one(self, data):
        self.ensure_table_exists('crypto_data', self.binanceSchema)
        # Utilisation de placeholders pour les paramètres
        placeholders = ', '.join(['%s'] * len(data[0]))  # Crée un placeholder pour chaque colonne dans data
        query = f"INSERT INTO crypto_data (symbol, event_time, total_traded_base_asset_volume, last_trade_id, price_change, last_price, high_price, low_price, total_number_of_trades, last_quantity) VALUES ({placeholders})"
        return self.client.query(query, data[0])  # Assurez-vous de passer un tuple ou une liste


    def insert_many(self, data):
        self.ensure_table_exists('news_data', self.newsSchema)

        # Un placeholder pour chaque valeur dans une ligne de données
        single_row_placeholders = '(' + ', '.join(['%s'] * len(data[0])) + ')'

        # Répéter les placeholders pour chaque ligne de données
        all_rows_placeholders = ', '.join([single_row_placeholders] * len(data))

        # Construire la requête avec tous les placeholders
        query = f"INSERT INTO news_data (title, author, publishedAt, sentiment, cryptocurrency) VALUES {all_rows_placeholders}"

        # Aplatir la liste des données pour correspondre aux placeholders
        flat_data = [item for sublist in data for item in sublist]

        # Exécuter la requête avec les données aplaties
        self.client.query(query, flat_data)