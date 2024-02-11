import { Controller, Get, Query } from '@nestjs/common';
import { DatabaseService } from '@/apps/data/src/database/database.service';

@Controller()
export class DataController {
    constructor(private readonly databaseService: DatabaseService) { }

    sendResponse(data: unknown) {
        return {
            data
        };
    }

    @Get('/currencies')
    getAllCurrencies() {
        // (optional query search)
        const res = this.databaseService.getAllCurrencies();
        return this.sendResponse(res);
    }

    @Get('/currency/data')
    getCurrencyData() {
        const res = this.databaseService.getCurrencyData();
        return this.sendResponse(res);
    }

    @Get('/currency/price-trend')
    getCurrencyPriceTrend() {
        const res = this.databaseService.getCurrencyPriceTrend();
        return this.sendResponse(res);
    }

    @Get('/currency/transactions')
    getCurrencyTransactions() {
        // param max
        const res = this.databaseService.getCurrencyTransactions();
        return this.sendResponse(res);
    }

    @Get('/currency/fear-and-greed')
    async getCurrencyFearAndGreed(@Query('symbol') symbol: string) {
        const res = await this.databaseService.getCurrencyFearAndGreed(symbol);
        return this.sendResponse(res);
    }

    @Get('/currency/news')
    getCurrencyNews() {
        // param max
        const res = this.databaseService.getCurrencyNews();
        return this.sendResponse(res);
    }

    @Get('/currencies/top')
    getTopCurrencies() {
        const res = this.databaseService.getTopCurrencies();
        return this.sendResponse(res);
    }

    @Get('/currencies/data')
    getAllCurrenciesData() {
        const res = this.databaseService.getAllCurrenciesData();
        return this.sendResponse(res);
    }

    @Get('/currencies/news')
    getAllCurrenciesNews() {
        // param max
        const res = this.databaseService.getAllCurrenciesNews();
        return this.sendResponse(res);
    }

    @Get('/currencies/news-trending')
    getNewsTrendingCurrencies() {
        const res = this.databaseService.getNewsTrendingCurrencies();
        return this.sendResponse(res);
    }
}
