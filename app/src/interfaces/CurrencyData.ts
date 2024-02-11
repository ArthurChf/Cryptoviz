import type { Currency } from '@/interfaces/Currency';

export interface CurrencyData extends Currency {
    id?: number;
    price: string;
    volume: string;
    priceLow: string;
    priceHigh: string;
    transactions: string;
    priceChangeRate: number;
}
