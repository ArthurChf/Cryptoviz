import { Controller, Get } from '@nestjs/common';
import { DataService } from '@/apps/data/src/data.service';

@Controller()
export class DataController {
    constructor(private readonly dataService: DataService) { }

    @Get('/currency/data')
    getCurrencyData() {
        // appeler service getCurrencyData
    }

    @Get('/currency/transactions')
    getCurrencyTransactions() {
        // param max
    }

    @Get('/currency/price-trend')
    getCurrencyPriceTrend() {
    }

    @Get('/currency/sentiment')
    getCurrencyFearAndGreed() {
    }

    @Get('/currency/news')
    getCurrencyNews() {
        // param max
    }

    @Get('/currencies/data')
    getCurrenciesData() {
    }

    @Get('/currencies/top')
    getTopCurrencies() {
    }

    @Get('/currencies/news')
    getCurrenciesNews() {
        // param max
    }

    @Get('/currencies')
    getPriceTrend() {
        // (optional query search)
    }
}
