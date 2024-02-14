import { Controller, Get, Query } from '@nestjs/common';
import { DatabaseService } from '@/apps/data/src/database/database.service';
import { AppPreferences } from '@/apps/data/src/app-preferences.interface';
import { MemoryService } from './memory/memory.sevice';
import { PeriodEnum } from './events/period.enum';

@Controller()
export class DataController {
    constructor(private readonly databaseService: DatabaseService, private readonly memoryService: MemoryService) { }

    sendResponse(data: unknown) {
        return {
            data
        };
    }

    @Get('/currencies')
    async getAllCurrencies(@Query('search') search = '') {
        const res = await this.databaseService.getAllCurrencies(search);
        return this.sendResponse(res);
    }

    @Get('/currency/data')
    async getCurrencyData(@Query() queryParams: AppPreferences) {
        const { currency: symbol } = queryParams;
        const res = await this.databaseService.getCurrencyData(symbol);
        return this.sendResponse(res);
    }

    @Get('/currency/price-trend')
    async getCurrencyPriceTrend(@Query() queryParams: AppPreferences) {
        const res = await this.databaseService.getCurrencyPriceTrend(queryParams.currency, queryParams.period, true);
        return this.sendResponse(res);
    }

    @Get('/currency/transactions')
    async getCurrencyTransactions(@Query() queryParams: AppPreferences) {
        const res = await this.databaseService.getCurrencyTransactions(queryParams.currency, 30);
        const lastTransaction = res[0];
        this.memoryService.setCryptoLastTrade(queryParams.currency, lastTransaction.id);
        return this.sendResponse(res);
    }

    @Get('/currency/fear-and-greed')
    async getCurrencyFearAndGreed(@Query() queryParams: AppPreferences) {
        const { currency: symbol } = queryParams;
        const res = await this.databaseService.getCurrencyFearAndGreed(symbol);
        return this.sendResponse(res);
    }

    @Get('/currency/news')
    async getCurrencyNews(@Query() queryParams: AppPreferences) {
        const res = await this.databaseService.getCurrencyNews(queryParams.currency);
        return this.sendResponse(res);
    }

    @Get('/currencies/top')
    async getTopCurrencies() {
        const res = await this.databaseService.getTopCurrencies();
        return this.sendResponse(res);
    }

    @Get('/currencies/data')
    async getAllCurrenciesData() {
        const res = await this.databaseService.getAllCurrenciesData();
        return this.sendResponse(res);
    }

    @Get('/currencies/news')
    async getAllCurrenciesNews() {
        const res = await this.databaseService.getAllCurrenciesNews();
        return this.sendResponse(res);
    }

    @Get('/currencies/news-trending')
    async getNewsTrendingCurrencies() {
        const res = await this.databaseService.getNewsTrendingCurrencies();
        return this.sendResponse(res);
    }
}
