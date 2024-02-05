import { defineStore } from 'pinia';
import type { Currency } from '@/interfaces/Currency';
import { getDefaultCurrency } from '@/utils/getDefaultCurrency';

export const useCurrencyStore = defineStore('currency', {
    state: () => ({
        selectedCurrency: getDefaultCurrency(),
        currencies: [] as Currency[]
    }),
    actions: {
        setCurrencies(currencies: Currency[]) {
            this.currencies = currencies;
        },
        setSelectedCurrency(currency: Currency) {
            Object.assign(this.selectedCurrency, currency);
            localStorage.setItem('selected_currency', JSON.stringify(currency));
        },
        getCurrency(currencySymbol: string): Currency {
            return this.currencies.find((currency) => currency.symbol === currencySymbol) ?? {
                name: '',
                symbol: '',
                image: ''
            };
        }
    },
    getters: {
        getSelectedCurrency: (state) => {
            return state.selectedCurrency;
        }
    }
});
