import { getCurrencyName } from '@/libs/utils/src';

interface BinanceTickerDto {
  e: string;
  E: number;
  s: string;
  p: string;
  P: string;
  w: string;
  x: string;
  c: string;
  Q: string;
  b: string;
  B: string;
  a: string;
  A: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
  O: number;
  C: number;
  F: number;
  L: number;
  n: number;
}

export interface BinanceTicker {
    eventType: string;
    eventTime: number;
    symbol: string;
    name: string;
    priceChange: string;
    priceChangPercent: string;
    weightedAveragePrice: string;
    lastPrice: string;
    lastQuantity: string;
    bestBidPrice: string;
    bestBidQuantity: string;
    bestAskPrice: string;
    bestAskQuantity: string;
    openPrice: string;
    highPrice: string;
    lowPrice: string;
    totalNumberOfTrades: number;
    totalTradedBaseAssetVolume: string;
    totalTradedQuoteAssetVolume: string;
    statisticsOpenTime: number;
    statisticsCloseTime: number;
    firstTradeId?: number;
    lastTradeId?: number;
    firstTrade: string;
}

export function tickerMapper(data: BinanceTickerDto): BinanceTicker {
    return {
        symbol: data.s,
        name: getCurrencyName(data.s),
        eventType: data.e,
        eventTime: data.E,
        statisticsOpenTime: data.O,
        statisticsCloseTime: data.C,
        firstTradeId: data.F,
        lastTradeId: data.L,
        firstTrade: data.x,
        totalTradedBaseAssetVolume: data.v,
        totalTradedQuoteAssetVolume: data.q,
        priceChange: data.p,
        priceChangPercent: data.P,
        weightedAveragePrice: data.w,
        lastPrice: data.c,
        lastQuantity: data.Q,
        bestBidPrice: data.b,
        bestBidQuantity: data.B,
        bestAskPrice: data.a,
        bestAskQuantity: data.A,
        openPrice: data.o,
        highPrice: data.h,
        lowPrice: data.l,
        totalNumberOfTrades: data.n
    };
}
