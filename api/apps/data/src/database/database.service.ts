import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';
import { Inject, Injectable } from '@nestjs/common';
import type { PeriodEnum } from '../events/period.enum';

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

    async getCurrencyPriceTrend(currency: string, period: PeriodEnum, orderBy: string, limit: string = '', start_date: string = null) {
        const query = `SELECT
                            toDate(createdAt) as day,
                            formatDateTime(max(createdAt), '%T') as hour,
                            toFloat64(formatNumber(max(lastPrice))) as price
                        FROM crypto
                        WHERE
                            coin = '${currency}' AND (
                            createdAt  ${start_date ? `= parseDateTimeBestEffort('${start_date}')` : `>= now() -
                                                                    CASE
                                                                        WHEN '${period}' = '1D' THEN 86400
                                                                        WHEN '${period}' = '7D' THEN 604800
                                                                        WHEN '${period}' = '1M' THEN 2592000
                                                                        WHEN '${period}' = '1Y' THEN 31536000
                                                                    END`}
                            ${start_date ? `OR createdAt = parseDateTimeBestEffort('${start_date}') + 1` : ''} )
                        GROUP BY
                            day,
                            CASE
                                WHEN '${period}' = '1D' THEN toStartOfFiveMinute(createdAt)
                                WHEN '${period}' = '7D' THEN toStartOfFifteenMinutes(createdAt)
                                WHEN '${period}' = '1M' THEN toStartOfHour(createdAt)
                                WHEN '${period}' = '1Y' THEN toStartOfDay(createdAt) + toHour(createdAt) / 10 * 10 * 3600
                            END
                        ORDER BY
                            ${orderBy}
                        ${limit}
                        `;
        try {
            const res = await this.cryptovizClickhouseServer.queryPromise(query);
            return res;
        } catch (error) {
            console.error('Error executing query: ', error);
        }
    }

    async getCurrencyTransactions(symbol: string, limit: number = 1) {
        const query = `SELECT
                            imageUrl(coin) AS currencyImage,
                            coin AS currencySymbol,
                            name AS currencyName,
                            dollar(formatNumber(lastQuantity)) AS amount,
                            concat('#', toString(lastTradeId)) AS id,
                            createdAt AS date
                        FROM
                            crypto
                        WHERE
                            reference = 'USDT'
                            AND coin = '${symbol}'
                        GROUP BY
                            coin, name, lastQuantity, lastTradeId, createdAt
                        ORDER BY
                            createdAt DESC
                        LIMIT ${limit}`;
        try {
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
                const topCurrencies = result.map((currency) => {
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
        const query = `SELECT
                        imageUrl(c.coin) AS image,
                        c.name AS name,
                        c.coin AS symbol,
                        toFloat64(formatNumber(c.priceChange)) AS priceChangeRate,
                        dollar(formatNumber(c.lastPrice)) AS price,
                        dollar(formatNumber(c.totalTradedBaseAssetVolume)) AS volume,
                        dollar(formatNumber(c.highPrice)) AS priceHigh,
                        dollar(formatNumber(c.lowPrice)) AS priceLow,
                        c.totalNumberOfTrades AS transactions
                    FROM
                        crypto c
                    INNER JOIN
                        (SELECT coin, max(createdAt) AS lastCreatedAt, argMax(id, createdAt) as lastId
                        FROM crypto
                        GROUP BY coin) lastDates
                    ON
                        c.id = lastDates.lastId
                    ORDER BY
                        toFloat64(c.lastPrice) DESC   
        `;
        try {
            const res = await this.cryptovizClickhouseServer.queryPromise(query);
            return res;
        } catch (error) {
            console.error('Error executing query: ', error);
        }
    }

    async getAllCurrenciesNews(lastFetchDate: string | null = null) {
        const whereDate = lastFetchDate ? `AND nd.createdAt > '${lastFetchDate}'` : '';
        const query = `SELECT imageUrlNews(nd.source) AS image, cn.symbol, nd.source AS source, nd.sentiment AS sentiment, nd.title AS title, formatDate(nd.createdAt) AS date, nd.createdAt AS originalDate, nd.content AS content, nd.author AS author, nd.link AS link
                        FROM news nd FINAL
                        INNER JOIN (SELECT symbol, news_data_id FROM crypto_news FINAL) cn ON nd.id = cn.news_data_id
                        ${whereDate}
                        GROUP BY image, cn.symbol, source, sentiment, title, date, originalDate, content, author, link
                        ORDER BY originalDate DESC
                        LIMIT 30`;
        try {
            const res = await this.cryptovizClickhouseServer.queryPromise(query);
            return res;
        } catch (error) {
            console.error('Error executing query: ', error);
        }
    }

    async getNewsTrendingCurrencies() {
        const query = `WITH cryptoOccurences AS (
                            SELECT COUNT(id) AS nb, upper(symbol) AS symbol
                            FROM crypto_news FINAL
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
