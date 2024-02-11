import { Module } from '@nestjs/common';
import { DatabaseTestService } from '@/apps/data/src/database/database-test.service';
import { DatabaseService } from '@/apps/data/src/database/database.service';
import { DatabaseConfigModule } from '@/apps/data/src/database/database-config.module';

@Module({
    imports: [DatabaseConfigModule],
    providers: [DatabaseTestService, DatabaseService],
    exports: [DatabaseTestService, DatabaseService]
})
export class DatabaseModule {
}
