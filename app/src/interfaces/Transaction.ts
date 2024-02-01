import type { CurrencyCode } from '@/utils/getCurrency';

export interface Transaction {
    currencySymbol: CurrencyCode;
    currencyName: string;
    amount: string;
    id: string;
    date: string;
}
