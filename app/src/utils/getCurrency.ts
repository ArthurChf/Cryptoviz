import type { Currency } from '@/interfaces/Currency';

const currencies = {
    BTC: {
        name: 'Bitcoin',
        image: 'currencies/btc.png'
    },
    ETH: {
        name: 'Ethereum',
        image: 'currencies/eth.png'
    },
    BNB: {
        name: 'BNB',
        image: 'currencies/bnb.png'
    },
    SOL: {
        name: 'Solana',
        image: 'currencies/sol.png'
    },
    XRP: {
        name: 'XRP',
        image: 'currencies/xrp.png'
    },
    ADA: {
        name: 'Cardano',
        image: 'currencies/ada.png'
    },
    AVAX: {
        name: 'Avalanche',
        image: 'currencies/avax.png'
    },
    MATIC: {
        name: 'Polygon',
        image: 'currencies/matic.png'
    },
    UNI: {
        name: 'Uniswap',
        image: 'currencies/uni.png'
    },
    UNKNOWN: {
        name: 'UNKNOWN',
        image: 'currencies/unknown.png'
    }
};

export type CurrencyCode = keyof typeof currencies;

export const getCurrency = (currencyCode: CurrencyCode): Currency => {
    return currencies[currencyCode] ?? currencies['UNKNOWN'];
};
