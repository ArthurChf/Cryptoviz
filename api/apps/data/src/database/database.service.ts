import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    constructor(@Inject('CRYPTOVIZ_CLICKHOUSE_SERVER') private readonly cryptovizClickhouseServer: ClickHouseClient) {}

    async getAllCurrencies(search: string = '') {
        const query = `SELECT imageUrl(coin) AS image, coin AS symbol, name
                        FROM crypto
                        WHERE symbol ILIKE '%${search}%'
                        OR name ILIKE '%${search}%'
                        GROUP BY symbol, coin, name
                        ORDER BY name`;
        try {
            const res = await this.cryptovizClickhouseServer.queryPromise(query);
            return res;
        } catch (error) {
            console.error('Error executing query: ');
        }
    }

    async getCurrencyData(symbol: string) {
        const query = `SELECT dollar(formatNumber(lastPrice))         as price,
                            toFloat32(formatNumber(priceChange))       as growthRate,
                            dollar(formatNumber(highPrice)) as priceHigh,
                            dollar(formatNumber(lowPrice)) as priceLow,
                            totalNumberOfTrades as totalTrades,
                            dollar(formatNumber(totalTradedBaseAssetVolume)) as volume
                        FROM crypto
                        WHERE reference = 'USDT'
                        AND coin = '${symbol}'
                        ORDER BY createdAt DESC
                        LIMIT 1`;

        try {
            const [res] = await this.cryptovizClickhouseServer.queryPromise(query);
            return res;
        } catch (error) {
            console.error('Error executing query: ', error);
        }
    }

    async getCurrencyPriceTrend() {
        return 'getCurrencyPriceTrend';
    }

    async getCurrencyTransactions() {
        return 'getCurrencyTransactions';
    }

    async getCurrencyFearAndGreed(symbol: string) {
        const query = `SELECT AVG(sentiment) AS sentiment
                    FROM news nd FINAL
                    INNER JOIN (
                        SELECT * FROM crypto_news FINAL
                    ) cn ON nd.id = cn.news_data_id
                    WHERE cn.symbol = '${symbol.toLowerCase()}'
                    AND nd.sentiment IS NOT NULL
                    AND toDate(nd.createdAt) = today()        
                    `;

        try {
            const res = await this.cryptovizClickhouseServer.queryPromise(query);
            const sentiment = JSON.parse(JSON.stringify(res))[0].sentiment;
            return sentiment;
        } catch (error) {
            console.error('Error executing query: ', error);
        }
    }

    async getCurrencyNews() {
        return 'getCurrencyNews';
    }

    async getTopCurrencies() {
        return 'getTopCurrencies';
    }

    async getAllCurrenciesData() {
        const query = `SELECT imageUrl(c.coin) AS image,
                            c.name AS name,
                            c.coin AS symbol,
                            toFloat64(formatNumber(c.priceChange)) AS priceChangeRate,
                            dollar(formatNumber(c.lastPrice)) AS price,
                            dollar(formatNumber(c.totalTradedBaseAssetVolume)) AS volume,
                            dollar(formatNumber(c.highPrice)) AS priceHigh,
                            dollar(formatNumber(c.lowPrice)) AS priceLow,
                            c.totalNumberOfTrades AS transactions
                        FROM crypto c
                        INNER JOIN (SELECT coin, max(createdAt) AS lastCreatedAt FROM crypto GROUP BY symbol, coin) lastDates
                        ON c.createdAt = lastDates.lastCreatedAt AND c.coin = lastDates.coin
                        ORDER BY toFloat64(c.lastPrice) DESC`;
        try {
            const res = await this.cryptovizClickhouseServer.queryPromise(query);
            return res;
        } catch (error) {
            console.error('Error executing query: ', error);
        }
    }

    async getAllCurrenciesNews() {
        return 'getAllCurrenciesNews';
    }

    async getNewsTrendingCurrencies() {
        return 'getNewsTrendingCurrencies';
    }
}
