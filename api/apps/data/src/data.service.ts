import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
    public getHello(): string {
        return 'Hello World!';
    }
}
