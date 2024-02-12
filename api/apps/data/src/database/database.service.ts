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

    async getCurrencyTransactions(symbol: string, isHttp: boolean) {
        const limit = isHttp ? 30 : 1;
        const query = `SELECT
                        createdAt as date,
                        imageUrl(coin) AS image,
                        coin as symbol,
                        name,
                        formatNumber(lastQuantity) AS lastTradeAmount,
                        concat('#', toString(lastTradeId)) AS lastTradeId
                    FROM
                        crypto
                    WHERE
                        reference = 'USDT'
                        AND coin = '${symbol}'
                    ORDER BY
                        createdAt DESC
                    LIMIT ${limit}`;
        try {
            console.log(symbol, limit);
            const res = await this.cryptovizClickhouseServer.queryPromise(query);
            return res;
        } catch (error) {
            console.error('Error executing query: ', error);
        }
    }

    async getCurrencyFearAndGreed(symbol: string) {
        const query = `SELECT toInt64(ifNull(avgOrNull(sentiment), 50)) AS sentiment
                        FROM news nd FINAL
                                INNER JOIN (
                            SELECT * FROM crypto_news FINAL
                            ) cn ON nd.id = cn.news_data_id
                        WHERE cn.symbol = '${symbol.toLowerCase()}'
                        AND nd.sentiment IS NOT NULL
                        AND toDate(nd.createdAt) = today()`;
        try {
            const [res] = await this.cryptovizClickhouseServer.queryPromise(query);
            return res.sentiment;
        } catch (error) {
            console.error('Error executing query: ', error);
        }
    }

    async getCurrencyNews(symbol: string, lastFetchDate: string | null = null) {
        const whereDate = lastFetchDate ? `AND nd.createdAt > '${lastFetchDate}'` : '';
        const query = `SELECT imageUrlNews(nd.source) AS image, nd.source AS source, nd.sentiment AS sentiment, nd.title AS title, formatDate(nd.createdAt) AS date, nd.createdAt AS originalDate, nd.content AS content, nd.author AS author, nd.link AS link
                        FROM news nd FINAL
                        INNER JOIN (SELECT symbol, news_data_id FROM crypto_news FINAL) cn ON nd.id = cn.news_data_id
                        WHERE cn.symbol = '${symbol.toLowerCase()}'
                        ${whereDate}
                        ORDER BY nd.createdAt DESC
                        LIMIT 30`;
        try {
            const res = await this.cryptovizClickhouseServer.queryPromise(query);
            return res;
        } catch (error) {
            console.error('Error executing query: ', error);
        }
    }

    async getTopCurrencies() {
        const query = `SELECT
                        imageUrl(coin) AS image,
                        name,
                        upper(coin) AS symbol,
                        concat(formatNumber(toString(avgPriceChange * 100)), '%') AS priceChangeRate,
                        dollar(formatNumber(toString(avgLastPrice))) AS price,
                        dollar(
                            if(totalVolume > 1e16,
                            toString(round(totalVolume, 2)),
                            formatNumber(toString(round(totalVolume, 2)))
                            )
                        ) AS volume
                    FROM
                        (
                            SELECT
                                coin,
                                name,
                                avg(toFloat64(lastPrice)) AS avgLastPrice,
                                avg(toFloat64(priceChange)) AS avgPriceChange,
                                sum(toFloat64(totalTradedBaseAssetVolume)) AS totalVolume
                            FROM
                                cryptoviz.crypto
                            WHERE
                                reference = 'USDT'
                                AND createdAt >= now() - INTERVAL 1 DAY
                            GROUP BY
                                coin, name
                        ) AS top_cryptos
                    ORDER BY
                        avgLastPrice DESC
                    LIMIT 3
                    `;
        try {
            const result = await this.cryptovizClickhouseServer.queryPromise(query);
            if (Array.isArray(result) && result.length > 0) {
                const topCurrencies = result.map((currency: {
                    image: string;
                    name: string;
                    symbol: string;
                    priceChangeRate: string;
                    price: string;
                    volume: string;
                }) => {
                    return {
                        image: currency.image,
                        name: currency.name,
                        symbol: currency.symbol,
                        data: {
                            priceChangeRate: currency.priceChangeRate,
                            price: currency.price,
                            volume: currency.volume
                        }
                    };
                });
                return topCurrencies;
            }
        } catch (error) {
            console.error('Error executing query: ', error);
        }
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
        const query = `WITH cryptoOccurences AS (
                            SELECT COUNT(id) AS nb, upper(symbol) AS symbol
                            FROM crypto_news
                            GROUP BY symbol
                        ), nbNews AS (
                            SELECT COUNT(id) AS count FROM news FINAL
                        )
                        SELECT imageUrl(cryptoOccurences.symbol) AS image, c.name AS name, cryptoOccurences.symbol AS symbol, toFloat32(formatNumber(toString((cryptoOccurences.nb / nbNews.count) * 100))) AS articlesRate
                        FROM cryptoOccurences, nbNews
                        INNER JOIN crypto c ON c.coin = cryptoOccurences.symbol
                        GROUP BY c.name, cryptoOccurences.symbol, cryptoOccurences.nb, nbNews.count
                        ORDER BY cryptoOccurences.nb DESC
                        LIMIT 5`;
        try {
            const res = await this.cryptovizClickhouseServer.queryPromise(query);
            return res;
        } catch (error) {
            console.error('Error executing query: ', error);
        }
    }
}
