class CryptoNewsData:
    def __init__(self, news_date_id, symbol):
        assert news_date_id is not None and news_date_id != "", "Le symbole ne doit pas être null ou vide"
        assert symbol is not None and symbol != "", "Le symbole ne doit pas être null ou vide"

        self.news_date_id = news_date_id
        self.symbol = symbol
    
    def getTuple(self):
        return (self.news_date_id, self.symbol)
