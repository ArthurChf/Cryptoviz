import type { Currency } from '@/interfaces/Currency';

const currencies = {
    BTC: {
        name: 'Bitcoin',
        image: ''
    },
    ETH: {
        name: 'Ethereum',
        image: ''
    },
    BNB: {
        name: 'BNB',
        image: ''
    },
    SOL: {
        name: 'Solana',
        image: ''
    },
    XRP: {
        name: 'XRP',
        image: ''
    },
    ADA: {
        name: 'Cardano',
        image: ''
    },
    AVAX: {
        name: 'Avalanche',
        image: ''
    },
    MATIC: {
        name: 'Polygon',
        image: ''
    },
    UNI: {
        name: 'Uniswap',
        image: ''
    },
    UNKNOWN: {
        name: 'UNKNOWN',
        image: ''
    }
};
type CurrencyCode = keyof typeof currencies;

export const getCurrency = (currency: CurrencyCode): Currency => {
    return currencies[currency] ?? currencies['UNKNOWN'];
};
