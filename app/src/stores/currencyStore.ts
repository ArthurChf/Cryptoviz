import { defineStore } from 'pinia';
import type { Currency } from '@/interfaces/Currency';
import { getDefaultCurrency } from '@/utils/getDefaultCurrency';
import { useSocketStore } from '@/stores/socketStore';
import { SocketEventEnum } from '@/enums/SocketEventEnum';

export const useCurrencyStore = defineStore('currency', {
    state: () => ({
        selectedCurrency: getDefaultCurrency()
    }),
    actions: {
        async setSelectedCurrency(currency: Currency) {
            Object.assign(this.selectedCurrency, currency);
            localStorage.setItem('selected_currency', JSON.stringify(currency));
            await this.selectCurrencyEvent();
        },
        async selectCurrencyEvent() {
            const socketStore = useSocketStore();
            await socketStore.send({
                eventName: SocketEventEnum.CONFIG_UPDATE_CURRENCY,
                data: this.selectedCurrency.symbol
            });
        }
    }
});
