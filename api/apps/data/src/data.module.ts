import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { EventsModule } from '@/apps/data/src/events/events.module';

@Module({
    imports: [EventsModule],
    controllers: [DataController],
    providers: [DataService]
})
export class DataModule {}
