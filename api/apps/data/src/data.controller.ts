import { Controller, Get } from '@nestjs/common';
import { DataService } from '@/apps/data/src/data.service';

@Controller()
export class DataController {
    constructor(private readonly dataService: DataService) { }

    sendResponse(data: unknown) {
        return {
            data
        };
    }

    @Get('/currencies')
    getAllCurrencies() {
        // (optional query search)
        const res = this.dataService.getAllCurrencies();
        return this.sendResponse(res);
    }

    @Get('/currency/data')
    getCurrencyData() {
        const res = this.dataService.getCurrencyData();
        return this.sendResponse(res);
    }

    @Get('/currency/price-trend')
    getCurrencyPriceTrend() {
        const res = this.dataService.getCurrencyPriceTrend();
        return this.sendResponse(res);
    }

    @Get('/currency/transactions')
    getCurrencyTransactions() {
        // param max
        const res = this.dataService.getCurrencyTransactions();
        return this.sendResponse(res);
    }

    @Get('/currency/fear-and-greed')
    getCurrencyFearAndGreed() {
        const res = this.dataService.getCurrencyFearAndGreed();
        return this.sendResponse(res);
    }

    @Get('/currency/news')
    getCurrencyNews() {
        // param max
        const res = this.dataService.getCurrencyNews();
        return this.sendResponse(res);
    }

    @Get('/currencies/top')
    getTopCurrencies() {
        const res = this.dataService.getTopCurrencies();
        return this.sendResponse(res);
    }

    @Get('/currencies/data')
    getAllCurrenciesData() {
        const res = this.dataService.getAllCurrenciesData();
        return this.sendResponse(res);
    }

    @Get('/currencies/news')
    getAllCurrenciesNews() {
        // param max
        const res = this.dataService.getAllCurrenciesNews();
        return this.sendResponse(res);
    }

    @Get('/currencies/news-trending')
    getNewsTrendingCurrencies() {
        const res = this.dataService.getNewsTrendingCurrencies();
        return this.sendResponse(res);
    }
}
