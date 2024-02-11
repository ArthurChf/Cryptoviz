import { Module } from '@nestjs/common';
import { MemoryService } from '@/apps/data/src/memory/memory.sevice';
import { EventsGateway } from '@/apps/data/src/events/events.gateway';
import { DatabaseModule } from '@/apps/data/src/database/database.module';
import { DatabaseService } from '@/apps/data/src/database/database.service';
import { DatabaseConfigModule } from '@/apps/data/src/database/database-config.module';

@Module({
    imports: [DatabaseConfigModule, DatabaseModule],
    providers: [MemoryService, DatabaseService, EventsGateway]
})
export class EventsModule {}
