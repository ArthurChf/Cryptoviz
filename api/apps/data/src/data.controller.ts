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

    @Get('/currency/data')
    getCurrencyData() {
        const res = this.dataService.getCurrencyData();
        return this.sendResponse(res);
    }

    @Get('/currency/transactions')
    getCurrencyTransactions() {
        // param max
        const res = this.dataService.getCurrencyTransactions();
        return this.sendResponse(res);
    }

    @Get('/currency/price-trend')
    getCurrencyPriceTrend() {
        const res = this.dataService.getCurrencyPriceTrend();
        return this.sendResponse(res);
    }

    @Get('/currency/sentiment')
    getCurrencyFearAndGreed() {
        const res = this.dataService.getFearAndGreed();
        return this.sendResponse(res);
    }

    @Get('/currency/news')
    getCurrencyNews() {
        // param max
        const res = this.dataService.getCurrencyNews();
        return this.sendResponse(res);
    }

    @Get('/currencies/data')
    getCurrenciesData() {
        const res = this.dataService.getAllCurrenciesData();
        return this.sendResponse(res);
    }

    @Get('/currencies/top')
    getTopCurrencies() {
        const res = this.dataService.getTopCurrencies();
        return this.sendResponse(res);
    }

    @Get('/currencies/news')
    getCurrenciesNews() {
        // param max
        const res = this.dataService.getAllCurrenciesNews();
        return this.sendResponse(res);
    }

    @Get('/currencies')
    getAllCurrencies() {
        // (optional query search)
        const res = this.dataService.getAllCurrencies();
        return this.sendResponse(res);
    }
}
