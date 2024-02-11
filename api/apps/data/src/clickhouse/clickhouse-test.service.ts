import { Inject, Injectable } from '@nestjs/common';
import { ClickHouseClient } from '@depyronick/nestjs-clickhouse';

@Injectable()
export class ClickHouseTestService {
    constructor(@Inject('CRYPTOVIZ_CLICKHOUSE_SERVER') private readonly cryptovizClickHouseServer: ClickHouseClient) {}

    async testConnection() {
        return await this.cryptovizClickHouseServer.ping();
    }

    async createTestTable() {
        return await this.cryptovizClickHouseServer.queryPromise('CREATE TABLE IF NOT EXISTS cryptoviz_test (id Int32, firstname String, lastname String) ENGINE = Memory');
    }

    async insertMultipleTestRows() {
        return await this.cryptovizClickHouseServer.queryPromise(
            `INSERT INTO cryptoviz_test (id, firstname, lastname) VALUES (1, 'John', 'Doe'), (2, 'Jane', 'Doe');`
        );
    }

    async selectTestTable() {
        return await this.cryptovizClickHouseServer.queryPromise('SELECT * FROM cryptoviz_test');
    }

    async dropTestTable() {
        return await this.cryptovizClickHouseServer.queryPromise('DROP TABLE IF EXISTS cryptoviz_test');
    }
}
