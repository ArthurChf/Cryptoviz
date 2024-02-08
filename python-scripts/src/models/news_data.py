class NewsData:
    def __init__(self, title, author, link, createdAt, content, sentiment, currencies):
        validate(title, author, link, createdAt, content, sentiment, currencies)
       
        self.title = title
        self.author = author
        self.link = link
        self.content = content
        self.createdAt = createdAt
        
        def validate(self):
            assert self.title is not None and self.title != "", "Le titre ne doit pas être null ou vide"
            assert self.author is not None and self.author != "", "L'auteur ne doit pas être null ou vide"
            assert self.link is not None and self.link != "", "Le lien ne doit pas être null ou vide"
            assert self.content is not None and self.content != "", "Le contenu ne doit pas être null ou vide"
            assert self.createdAt is not None, "La date de création ne doit pas être null"
            assert self.sentiment is not None, "Le sentiment ne doit pas être null"
            assert self.currencies is not None, "La liste des crypto-monnaies ne doit pas être null"
        
        def getTuple(self):
            return (self.title, self.author, self.link, self.content, self.createdAt)
        
    