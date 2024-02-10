import { Module } from '@nestjs/common';
import { MemoryService } from '@/apps/data/src/memory/memory.sevice';
import { DataService } from '@/apps/data/src/data.service';
import { EventsGateway } from '@/apps/data/src/events/events.gateway';

@Module({
    providers: [DataService, MemoryService, EventsGateway]
})
export class EventsModule {}
