import pandas as pda

def _analyze_content_sentiment(data):
    pass

def _extract_cryptocurrency_symbols(data):
    pass

def generate_dataframe_from_news(data):
    return pda.DataFrame(data)

def transform_news_data(data):
    news_dataframe = generate_dataframe_from_news(data)
    news_dataframe['sentiment'] = _analyze_content_sentiment(news_dataframe['content'])
    news_dataframe['cryptocurrency_symbols'] = _extract_cryptocurrency_symbols(news_dataframe['content'])
    return news_dataframe.itertuples(index=False, name=None)

