import { Injectable } from '@nestjs/common';
import { PeriodEnum } from '@/apps/data/src/events/period.enum';
import type { AppPreferences } from '@/apps/data/src/events/app-preferences.interface';
import type { Subscription } from 'rxjs';

@Injectable()
export class MemoryService {
    private readonly clientSettings: Map<string, AppPreferences> = new Map();
    private readonly clientSubscriptions: Map<string, Subscription[]> = new Map();

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
}
