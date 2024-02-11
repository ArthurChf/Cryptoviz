import { Module } from '@nestjs/common';
import { ClickHouseTestService } from './clickhouse-test.service';
import { ClickHouseModule as ClickHouseConfigModule } from '@depyronick/nestjs-clickhouse';
import { ClickHouseNewsService } from './clickhouse-news.service';

@Module({
    imports: [ClickHouseConfigModule.register([
        {
            name: 'CRYPTOVIZ_CLICKHOUSE_SERVER',
            host: 'localhost',
            port: 8123,
            username: 'epitech',
            password: 'admin',
            database: 'cryptoviz'
        }
    ])],
    controllers: [],
    providers: [ClickHouseTestService, ClickHouseNewsService],
    exports: [ClickHouseTestService, ClickHouseNewsService]
})
export class ClickhouseModule {
}
