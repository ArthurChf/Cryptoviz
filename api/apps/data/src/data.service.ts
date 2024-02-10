import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
    public getAllCurrencies() {
        return 'getAllCurrencies';
    }
    public getCurrencyData() {
        return 'getCurrencyData';
    }
    public getCurrencyPriceTrend() {
        return 'getCurrencyPriceTrend';
    }
    public getCurrencyTransactions() {
        return 'getCurrencyTransactions';
    }
    public getCurrencyFearAndGreed() {
        return 'getCurrencyFearAndGreed';
    }
    public getCurrencyNews() {
        return 'getCurrencyNews';
    }
    public getTopCurrencies() {
        return 'getTopCurrencies';
    }
    public getAllCurrenciesData() {
        return 'getAllCurrenciesData';
    }
    public getAllCurrenciesNews() {
        return 'getAllCurrenciesNews';
    }
    public getNewsTrendingCurrencies() {
        return 'getNewsTrendingCurrencies';
    }
}
