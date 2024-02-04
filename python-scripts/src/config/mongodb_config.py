from pymongo import MongoClient, UpdateOne

class MongoDBConfig:
    def __init__(self, host, port, username, password, database):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.client = self.get_client()
        self.database = self.client[database]
        
    
    
    def get_uri(self):
        return f"mongodb://{self.username}:{self.password}@{self.host}"
    
    def get_client(self):
        return MongoClient(self.get_uri(), self.port)
    
    def insert_one(self, collection_name, document):
        collection = self.database[collection_name]
        return collection.insert_one(document)
    
    def upsert_many(self, collection_name, documents):
        collection = self.database[collection_name]
        operations = [
            UpdateOne(
                {'author': doc['author'], 'title': doc['title'], 'createdAt': doc['createdAt'], 'link': doc['link']},
                {'$set': doc},
                upsert=True
            ) for doc in documents
        ]
        return collection.bulk_write(operations)
    