import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { BlockExplorerService } from "./block-explorer.service";

@Module({
    imports: [ScheduleModule.forRoot()],
    providers: [BlockExplorerService],
})
export class BlockExplorerModule {}