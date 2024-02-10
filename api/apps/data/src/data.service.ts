import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
    public getCurrencyData() {
        return 'getCurrencyData';
    }
    public getCurrencyPriceTrend() {
        return 'getCurrencyPriceTrend';
    }
    public getCurrencyTransactions() {
        return 'getCurrencyTransactions';
    }
    public getFearAndGreed() {
        return 'getFearAndGreed';
    }
    public getCurrencyNews() {
        return 'getCurrencyNews';
    }
    public getAllCurrenciesData() {
        return 'getAllCurrenciesData';
    }
    public getTopCurrencies() {
        return 'getTopCurrencies';
    }
    public getAllCurrenciesNews() {
        return 'getAllCurrenciesNews';
    }
    public getAllCurrencies() {
        return 'getAllCurrencies';
    }
}
