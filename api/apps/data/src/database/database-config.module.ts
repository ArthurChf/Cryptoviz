import { Module } from '@nestjs/common';
import { ClickHouseModule } from '@depyronick/nestjs-clickhouse';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(), ClickHouseModule.register([
        {
            name: 'CRYPTOVIZ_CLICKHOUSE_SERVER',
            host: 'clickhouse',
            port: 8123,
            username: 'epitech',
            password: 'admin',
            database: 'cryptoviz'
        }
    ])],
    exports: [ClickHouseModule]
})
export class DatabaseConfigModule {}
