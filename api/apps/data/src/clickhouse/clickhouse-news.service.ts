import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ClickHouseNewsService {
    constructor(@Inject('CRYPTOVIZ_CLICKHOUSE_SERVER') private readonly cryptovizClickhouseServer: ClickHouseClient) {}

    async getCurrencyFearAndGreed(symbol: string) {
        const query = '';
        const res = this.cryptovizClickhouseServer.queryPromise(query);
        console.log(res);
        return res;
    }
}
