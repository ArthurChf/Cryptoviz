import { Module } from '@nestjs/common';
import { MemoryService } from '@/apps/data/src/memory/memory.sevice';
import { EventsGateway } from '@/apps/data/src/events/events.gateway';

@Module({
    providers: [MemoryService, EventsGateway]
})
export class EventsModule {}
