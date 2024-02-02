import uuid

class CryptoNewsData:
    def __init__(self, news_id, symbol):
        assert isinstance(news_id, uuid.UUID), "news_id doit être un UUID valide"
        assert symbol is not None and symbol != "", "Le symbole ne doit pas être null ou vide"

        self.news_id = news_id
        self.symbol = symbol
