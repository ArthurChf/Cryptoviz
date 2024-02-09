import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
    public getCurrencyData() {
        return 'getCurrencyData';
    }
    public getPriceTrend() {
        return 'getPriceTrend';
    }
    public getTransactions() {
        return 'getTransactions';
    }
    public getFearAndGreed() {
        return 'getFearAndGreed';
    }
    public getNews() {
        return 'getNews';
    }
    public getAllCurrenciesData() {
        return 'getAllCurrenciesData';
    }
}
