import { Injectable } from '@nestjs/common';
import { PeriodEnum } from '@/apps/data/src/events/period.enum';
import type { AppPreferences } from '@/apps/data/src/app-preferences.interface';
import type { Subscription } from 'rxjs';

@Injectable()
export class MemoryService {
    private readonly clientSettings: Map<string, AppPreferences> = new Map();
    private readonly clientSubscriptions: Map<string, Subscription[]> = new Map();
    private readonly lastFetchNewsDate: Map<string, string> = new Map();
    private readonly cryptoLastTrade: Map<string, string> = new Map();
    private readonly cryptoTrendDate: Map<string, { day: string; hour: string}> = new Map();

    updateClientSettings(id: string, currency?: string, period?: PeriodEnum) {
        const clientExists = this.clientSettings.has(id);
        let selectedCurrency = 'BTC';
        if (currency) selectedCurrency = currency;
        else if (clientExists) selectedCurrency = this.clientSettings.get(id).currency;

        let selectedPeriod = PeriodEnum.ONE_DAY;
        if (period) selectedPeriod = period;
        else if (clientExists) selectedPeriod = this.clientSettings.get(id).period;

        this.clientSettings.set(id, {
            currency: selectedCurrency,
            period: selectedPeriod
        });
    }

    removeClientSettings(id: string) {
        this.clientSettings.delete(id);
    }

    getClientSettings(id: string) {
        return this.clientSettings.get(id);
    }

    getCryptoLastTrade(symbol: string) {
        return this.cryptoLastTrade.get(symbol);
    }

    getCryptoTrendPrices(symbol: string) {
        return this.cryptoTrendDate.get(symbol);
    }

    setCryptoTrendDate(symbol: string, data: { day: string; hour: string}) {
        this.cryptoTrendDate.set(symbol, data);
    }

    setCryptoLastTrade(symbol: string, lastTradeId: string) {
        this.cryptoLastTrade.set(symbol, lastTradeId);
    }

    addClientSubscription(id: string, subscription: Subscription) {
        let subscriptions = this.clientSubscriptions.get(id);
        if (!subscriptions) subscriptions = [];
        subscriptions.push(subscription);
        this.clientSubscriptions.set(id, subscriptions);
    }

    removeClientSubscriptions(id: string) {
        if (!this.clientSubscriptions.has(id)) return;
        this.clientSubscriptions.get(id).forEach((s) => {
            s.unsubscribe();
        });
        this.clientSubscriptions.delete(id);
    }

    getLastFetchNewsDate(clientId: string) {
        return this.lastFetchNewsDate.get(clientId) ?? null;
    }

    updateLastFetchNewsDate(clientId: string, newDate: string) {
        this.lastFetchNewsDate.set(clientId, newDate);
    }

    getLastFetchAllNewsDate(clientId: string) {
        return this.lastFetchAllNewsDate.get(clientId) ?? null;
    }

    updateLastFetchAllNewsDate(clientId: string, newDate: string) {
        this.lastFetchAllNewsDate.set(clientId, newDate);
    }
}
