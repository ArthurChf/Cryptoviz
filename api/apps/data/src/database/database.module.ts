import { Module } from '@nestjs/common';
import { DatabaseTestService } from '@/apps/data/src/database/database-test.service';
import { ClickHouseModule as DatabaseConfigModule } from '@depyronick/nestjs-clickhouse';
import { DatabaseService } from '@/apps/data/src/database/database.service';

@Module({
    imports: [DatabaseConfigModule.register([
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
    providers: [DatabaseTestService, DatabaseService],
    exports: [DatabaseTestService, DatabaseService]
})
export class DatabaseModule {
}
