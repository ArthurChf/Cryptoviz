import pandas as pda
import textblob as blob
import html 
from src.common.cryptodata import cryptocurrencies_keys
import hashlib

def __analyze_content_sentiment(data):
    content = html.unescape(data)
    blob_content = blob.TextBlob(content.lower())
    if content is None or content == "":
        return 0
    sentiment_polarity = blob_content.sentiment.polarity
    # Normaliser la valeur de la polarité pour avoir une note entre 0 et 100, 0 étant négatif, 50 neutre et 100 positif
    normalize_sentiment = (sentiment_polarity + 1) * 50
    return normalize_sentiment

def __extract_cryptocurrency_symbols(data):
    content = html.unescape(data)
    if content is None:
        return []
    blob_content = blob.TextBlob(content.lower())
    found_symbols = set()
    # On utilise un set pour éviter les doublons
    for word in blob_content.words:
        if word in cryptocurrencies_keys:
            found_symbols.add(cryptocurrencies_keys[word])
    # On convertir le set en liste pour pouvoir l'utiliser dans le dataframe
    return list(found_symbols)

def __generate_dataframe_from_news(data):
    return pda.DataFrame(data)

def __reorder_dataframe_columns(dataframe):
    columns = ['id', 'title', 'author', 'link', 'createdAt', 'content', 'sentiment', 'cryptocurrencies']
    return dataframe[columns]

def __generate_id(title, link, author):
    # On génère un id unique pour chaque news en utilisant le titre, le lien et l'auteur, afin d'éviter les doublons
    key = f"{title}{link}{author}"
    return hashlib.sha256(key.encode()).hexdigest()

def transform_news_data(data):
    news_dataframe = __generate_dataframe_from_news(data)
    news_dataframe['sentiment'] = news_dataframe['content'].apply(__analyze_content_sentiment)
    news_dataframe['cryptocurrencies'] = news_dataframe['content'].apply(__extract_cryptocurrency_symbols)
    news_dataframe['createdAt'] = pda.to_datetime(news_dataframe['createdAt'])
    news_dataframe['createdAt'] = news_dataframe['createdAt'].apply(lambda x: x.timestamp())
    news_dataframe['id'] = news_dataframe.apply(lambda x: __generate_id(x['title'], x['link'], x['author']), axis=1)
    news_df_filtered = news_dataframe[news_dataframe['cryptocurrencies'].apply(lambda x: len(x) > 0)]
    # Reorgniser les colonnes
    news_df_filtered = __reorder_dataframe_columns(news_df_filtered)
    return news_df_filtered.itertuples(index=False, name=None)

