import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseService {
    constructor(@Inject('CRYPTOVIZ_CLICKHOUSE_SERVER') private readonly cryptovizClickhouseServer: ClickHouseClient) {}

    async getAllCurrencies() {
        return 'getAllCurrencies';
    }

    async getCurrencyData() {
        return 'getCurrencyData';
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
        return 'getAllCurrenciesData';
    }

    async getAllCurrenciesNews() {
        return 'getAllCurrenciesNews';
    }

    async getNewsTrendingCurrencies() {
        return 'getNewsTrendingCurrencies';
    }
}
