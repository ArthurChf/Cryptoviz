import { Controller, Get } from '@nestjs/common';
import type { DataService } from '@/apps/data/src/data.service';

@Controller()
export class DataController {
    private readonly dataService: DataService;

    @Get()
    public getHello(): string {
        return this.dataService.getHello();
    }
}
