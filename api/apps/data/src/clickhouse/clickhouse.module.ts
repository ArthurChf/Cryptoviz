import { Module } from '@nestjs/common';
import { ClickHouseTestService } from './clickhouse-test.service';
import { ClickHouseModule as ClickHouseConfigModule } from '@depyronick/nestjs-clickhouse';

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
    providers: [ClickHouseTestService],
    exports: [ClickHouseTestService]
})
export class ClickhouseModule {
}
