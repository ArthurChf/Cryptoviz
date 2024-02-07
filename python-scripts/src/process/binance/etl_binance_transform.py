from src.models.binance_data import CryptoData
from utils.cryptodata import crypto_pairs

def transform_binance_data(data):
    symbol = str(data['symbol']).lower()
    pair = crypto_pairs[symbol]
    eventTime = data['eventTime'] / 1000.0
    if(pair is None):
        print(f"Pair not found for {data['symbol']}")
        return
    coin = str(pair[0]).upper()
    reference = str(pair[1]).upper()
    crypto = CryptoData(
        data['symbol'],
        coin,
        reference,
        eventTime,
        data['totalTradedBaseAssetVolume'],
        data['lastTradeId'],
        data['priceChange'],
        data['lastPrice'],
        data['highPrice'],
        data['lowPrice'],
        data['totalNumberOfTrades'],
        data['lastQuantity']
    )
    return crypto