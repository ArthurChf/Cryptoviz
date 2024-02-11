import { Controller, Get, Query } from '@nestjs/common';
import { DatabaseService } from '@/apps/data/src/database/database.service';
import { AppPreferences } from '@/apps/data/src/app-preferences.interface';

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
        const res = this.databaseService.getAllCurrencies();
        return this.sendResponse(res);
    }

    @Get('/currency/data')
    getCurrencyData(@Query() queryParams: AppPreferences) {
        const { currency: symbol } = queryParams;
        const res = this.databaseService.getCurrencyData(symbol);
        return this.sendResponse(res);
    }

    @Get('/currency/price-trend')
    getCurrencyPriceTrend(@Query() queryParams: AppPreferences) {
        const res = this.databaseService.getCurrencyPriceTrend();
        return this.sendResponse(res);
    }

    @Get('/currency/transactions')
    getCurrencyTransactions(@Query() queryParams: AppPreferences) {
        const res = this.databaseService.getCurrencyTransactions();
        return this.sendResponse(res);
    }

    @Get('/currency/fear-and-greed')
    async getCurrencyFearAndGreed(@Query() queryParams: AppPreferences) {
        const { currency: symbol } = queryParams;
        const res = await this.databaseService.getCurrencyFearAndGreed(symbol);
        return this.sendResponse(res);
    }

    @Get('/currency/news')
    getCurrencyNews(@Query() queryParams: AppPreferences) {
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
        const res = this.databaseService.getAllCurrenciesNews();
        return this.sendResponse(res);
    }

    @Get('/currencies/news-trending')
    getNewsTrendingCurrencies() {
        const res = this.databaseService.getNewsTrendingCurrencies();
        return this.sendResponse(res);
    }
}
