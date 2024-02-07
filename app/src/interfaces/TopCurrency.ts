import type { Currency } from '@/interfaces/Currency';

export interface TopCurrency extends Currency {
    data: {
        price: string;
        volume: string;
        changeRate: string;
    };
}
