import uuid

class NewsData:
    def __init__(self, title, author, link, createdAt, content, sentiment, currencies):
        
        assert title is not None and title != "", "Le titre ne doit pas être null ou vide"
        assert author is not None and author != "", "L'auteur ne doit pas être null ou vide"
        assert link is not None and link != "", "Le lien ne doit pas être null ou vide"
        assert isinstance(createdAt, int), "createdAt doit être un entier représentant un timestamp"
        assert content is not None and content != "", "Le contenu ne doit pas être null ou vide"
        assert isinstance(sentiment, int), "Le sentiment doit être un entier"
        assert currencies is not None and isinstance(currencies, list) and len(currencies) > 0, "currencies ne doit pas être null, doit être une liste et non vide"
        assert all(isinstance(currency, str) for currency in currencies), "Tous les éléments de currencies doivent être des chaînes de caractères"
       
        self.id = uuid.uuid4()
        self.title = title
        self.author = author
        self.link = link
        self.content = content
        self.sentiment = sentiment
        self.createdAt = createdAt
        self.currencies = currencies
        
    