import { Module } from '@nestjs/common';
import { ClickHouseModule } from '@depyronick/nestjs-clickhouse';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ClickHouseModule.register([
        {
            name: 'CRYPTOVIZ_CLICKHOUSE_SERVER',
            host: '127.0.0.1',
            port: 8123,
            username: 'epitech',
            password: 'admin',
            database: 'cryptoviz'
        }
    ])],
    exports: [ClickHouseModule]
})
export class DatabaseConfigModule {}
