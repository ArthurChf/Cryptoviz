import pandas as pda
import textblob as blob
import html 
from utils.cryptodata import cryptocurrencies_keys

def _analyze_content_sentiment(data):
    content = html.unescape(data)
    blob_content = blob.TextBlob(content.lower())
    if content is None or content == "":
        return 0
    sentiment_polarity = blob_content.sentiment.polarity
    normalize_sentiment = (sentiment_polarity + 1) * 50
    return normalize_sentiment

def _extract_cryptocurrency_symbols(data):
    content = html.unescape(data)
    if content is None:
        return []
    blob_content = blob.TextBlob(content.lower())
    found_symbols = set()
    for word in blob_content.words:
        if word in cryptocurrencies_keys:
            found_symbols.add(cryptocurrencies_keys[word])
    return list(found_symbols)

def generate_dataframe_from_news(data):
    return pda.DataFrame(data)

def transform_news_data(data):
    news_dataframe = generate_dataframe_from_news(data)
    news_dataframe['sentiment'] = news_dataframe['content'].apply(_analyze_content_sentiment)
    news_dataframe['cryptocurrencies'] = news_dataframe['content'].apply(_extract_cryptocurrency_symbols)
    news_df_filtered = news_dataframe[news_dataframe['cryptocurrencies'].apply(lambda x: len(x) > 0)]
    return news_df_filtered.itertuples(index=False, name=None)

