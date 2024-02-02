import { defineStore } from 'pinia';
import type { Currency } from '@/interfaces/Currency';

const defaultCurrency: Currency = {
    name: '',
    symbol: '',
    image: ''
};

export const useCurrencyStore = defineStore('currency', {
    state: () => ({
        selectedCurrency: defaultCurrency,
        currencies: [] as Currency[]
    }),
    actions: {
        setCurrencies(currencies: Currency[]) {
            this.currencies = currencies;
        },
        setSelectedCurrency(currency: Currency) {
            this.selectedCurrency = currency;
        },
        getCurrency(currencySymbol: string): Currency {
            return this.currencies.find((currency) => currency.symbol === currencySymbol) ?? defaultCurrency;
        }
    },
    getters: {
        getSelectedCurrency: (state) => {
            return state.selectedCurrency;
        }
    }
});
