import clickhouse_connect

class ClickHouseConfig:
    def __init__(self, host, port, username, password, database):
        self.host = host
        self.port = port
        self.username = username
        self.database = database
        self.client = clickhouse_connect.get_client(host=self.host, port=self.port, username=self.username, database = self.database)
    
    def execute_query(self, query, params=None):
        return self.client.execute(query, params)

    def insert_many(self, table_name, columns, data):
        query = f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES"
        self.client.execute(query, data)