class CryptoData:
    def __init__(self, symbol, coin, reference, createdAt, totalTradedBaseAssetVolume, lastTradeId, priceChange, lastPrice, highPrice, lowPrice, totalNumberOfTrades, lastQuantity):
        assert symbol is not None and symbol != "", "Le symbole ne doit pas être null ou vide"
        assert coin is not None and coin != "", "La pièce ne doit pas être null ou vide"
        assert reference is not None and reference != "", "La référence ne doit pas être null ou vide"
        assert createdAt is not None and isinstance(createdAt, float), "createdAt doit être un float représentant un timestamp et non null"
        assert totalTradedBaseAssetVolume is not None and totalTradedBaseAssetVolume != "", "totalTradedBaseAssetVolume ne doit pas être null ou vide"
        assert lastTradeId is not None and isinstance(lastTradeId, int), "lastTradeId doit être un entier et non null"
        assert priceChange is not None and priceChange != "", "priceChange ne doit pas être null ou vide"
        assert lastPrice is not None and lastPrice != "", "lastPrice ne doit pas être null ou vide"
        assert highPrice is not None and highPrice != "", "highPrice ne doit pas être null ou vide"
        assert lowPrice is not None and lowPrice != "", "lowPrice ne doit pas être null ou vide"
        assert totalNumberOfTrades is not None and isinstance(totalNumberOfTrades, int), "totalNumberOfTrades doit être un entier et non null"
        assert lastQuantity is not None and lastQuantity != "", "lastQuantity ne doit pas être null ou vide"

        self.symbol = symbol
        self.coin = coin
        self.reference = reference
        self.createdAt = createdAt
        self.totalTradedBaseAssetVolume = totalTradedBaseAssetVolume
        self.lastTradeId = lastTradeId
        self.priceChange = priceChange
        self.lastPrice = lastPrice
        self.highPrice = highPrice
        self.lowPrice = lowPrice
        self.totalNumberOfTrades = totalNumberOfTrades
        self.lastQuantity = lastQuantity
    
    def toTuple(self):
        return (
            self.symbol,
            self.coin,
            self.reference,
            self.createdAt,
            self.totalTradedBaseAssetVolume,
            self.lastTradeId,
            self.priceChange,
            self.lastPrice,
            self.highPrice,
            self.lowPrice,
            self.totalNumberOfTrades,
            self.lastQuantity
        )