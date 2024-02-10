from pymongo import MongoClient, UpdateOne
from pymongo.errors import BulkWriteError

class MongoDBConfig:
    def __init__(self, host, port, username, password, database):
        self.host = host
        self.port = port
        self.username = username
        self.password = password
        self.database = database
        self.client = self.get_client()
        self.database = self.client[database]
        
        
    
    
    def get_uri(self):
        return f"mongodb://{self.username}:{self.password}@{self.host}:{self.port}"
    
    def get_client(self):
        try:
            client = MongoClient(self.get_uri())
            print(f'Connexion à la base de données {self.database} mongo réussie.')
            return client
        except Exception as e:
            print(f'Erreur lors de la connexion à la base de données: {e}')
            raise e
    
    def insert_one(self, collection_name, document):
        collection = self.database[collection_name]
        return collection.insert_one(document)
    
    def upsert_many(self, collection_name, documents):
        try:
            collection = self.database[collection_name]
            operations = [
                UpdateOne(
                    {
                        'author': doc.get('author', 'Inconnu'), 
                        'title': doc.get('title', 'Sans titre'), 
                        'createdAt': doc.get('createdAt', None), 
                        'link': doc.get('link', 'Sans lien')
                    },
                    {'$set': doc},
                    upsert=True
                ) for doc in documents
            ]
            return collection.bulk_write(operations)
        
        except BulkWriteError as e:
            print(f'Erreur d\'insertion des données {collection_name}: {e}')
            return None
    