import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
    public getCurrencyData() {
        return 'currencyData';
    }
}
