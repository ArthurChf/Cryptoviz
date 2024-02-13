import { Module } from '@nestjs/common';
import { ClickHouseModule } from '@depyronick/nestjs-clickhouse';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ConfigModule.forRoot(), ClickHouseModule.register([
        {
            name: 'CRYPTOVIZ_CLICKHOUSE_SERVER',
            host: process.env.CLICKHOUSE_HOST,
            port: parseInt(process.env.CLICKHOUSE_PORT),
            username: process.env.CLICKHOUSE_USER,
            password: process.env.CLICKHOUSE_PASSWORD,
            database: process.env.CLICKHOUSE_DB
        }
    ])],
    exports: [ClickHouseModule]
})
export class DatabaseConfigModule {}
