import { Controller, Get } from '@nestjs/common';
import { DataService } from '@/apps/data/src/data.service';

@Controller()
export class DataController {
    constructor(private readonly dataService: DataService) {}

    @Get()
    public getHello(): string {
        return this.dataService.getHello();
    }
}
