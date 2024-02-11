import { Module } from '@nestjs/common';
import { ClickHouseModule } from '@depyronick/nestjs-clickhouse';

@Module({
    imports: [ClickHouseModule.register([
        {
            name: 'CRYPTOVIZ_CLICKHOUSE_SERVER',
            host: 'localhost',
            port: 8123,
            username: 'epitech',
            password: 'admin',
            database: 'cryptoviz'
        }
    ])],
    exports: [ClickHouseModule]
})
export class DatabaseConfigModule {}
