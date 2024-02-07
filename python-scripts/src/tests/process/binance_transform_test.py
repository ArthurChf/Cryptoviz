from src.process.binance.etl_binance_transform import transform_binance_data
import unittest

class BinanceTransformTest(unittest.TestCase):
    def test_transform_data(self):
        data =  {
                    "symbol":"SOLUSDT",
                    "eventType":"24hrTicker",
                    "eventTime":1707061718931,
                    "statisticsOpenTime":1706975318930,
                    "statisticsCloseTime":1707061718930,
                    "firstTradeId":455421052,
                    "lastTradeId":455691931,
                    "firstTrade":"98.15000000",
                    "totalTradedBaseAssetVolume":"2613993.83000000",
                    "totalTradedQuoteAssetVolume":"255221054.98070000",
                    "priceChange":"-0.68000000",
                    "priceChangPercent":"-0.693",
                    "weightedAveragePrice":"97.63644124",
                    "lastPrice":"97.47000000",
                    "lastQuantity":"3.54000000",
                    "bestBidPrice":"97.46000000",
                    "bestBidQuantity":"370.38000000",
                    "bestAskPrice":"97.47000000",
                    "bestAskQuantity":"94.77000000",
                    "openPrice":"98.15000000",
                    "highPrice":"98.76000000",
                    "lowPrice":"95.90000000",
                    "totalNumberOfTrades":270880
                }
        crypto = transform_binance_data(data)
        self.assertTrue(crypto.coin == "SOL")
        
    if __name__ == '__main__':
        unittest.main()