import { ref } from 'vue';
import type { CurrencyData } from '@/interfaces/CurrencyData';

export const getAllCurrenciesData = (callback: (data: unknown, otherParam?: string) => void, reloadInterval: number) => {
    const data = ref<CurrencyData[][]>([
        [
            {
                image: 'currencies/btc.webp',
                name: 'Bitcoin',
                symbol: 'BTC',
                priceChangeRate: 0.37,
                price: '$61,934',
                volume: '31.5B',
                priceHigh: '$61,750',
                priceLow: '$0.4',
                transactions: '1,214B'
            },
            {
                image: 'currencies/eth.webp',
                name: 'Ethereum',
                symbol: 'ETH',
                priceChangeRate: 2.74,
                price: '$3,025.18',
                volume: '14.6B',
                priceHigh: '$5,768',
                priceLow: '$0.4',
                transactions: '587M'
            },
            {
                image: 'currencies/bnb.webp',
                name: 'BNB',
                symbol: 'BNB',
                priceChangeRate: 2.53,
                price: '$532.07',
                volume: '2.1B',
                priceHigh: '$798.34',
                priceLow: '$1.76',
                transactions: '12M'
            },
            {
                image: 'currencies/sol.webp',
                name: 'Solana',
                symbol: 'SOL',
                priceChangeRate: -1.87,
                price: '$158.7',
                volume: '4.7B',
                priceHigh: '$167.6',
                priceLow: '$3.5',
                transactions: '29M'
            },
            {
                image: 'currencies/xrp.webp',
                name: 'Ripple',
                symbol: 'XRP',
                priceChangeRate: 0.54,
                price: '$0.5324',
                volume: '1.9B',
                priceHigh: '$3.45',
                priceLow: '$0.006',
                transactions: '6.45M'
            },
            {
                image: 'currencies/ada.webp',
                name: 'Cardano',
                symbol: 'ADA',
                priceChangeRate: 2.94,
                price: '$0.5252',
                volume: '450.2M',
                priceHigh: '$4.76',
                priceLow: '$0.003',
                transactions: '5.1M'
            },
            {
                image: 'currencies/avax.webp',
                name: 'Avalanche',
                symbol: 'AVAX',
                priceChangeRate: -5.79,
                price: '$41.14',
                volume: '416M',
                priceHigh: '$156.32',
                priceLow: '$2.21',
                transactions: '8.1M'
            },
            {
                image: 'currencies/matic.webp',
                name: 'Polygon',
                symbol: 'MATIC',
                priceChangeRate: 2.73,
                price: '$0.811',
                volume: '249.11M',
                priceHigh: '$6.75',
                priceLow: '$0.013',
                transactions: '6.8M'
            }
        ],
        [
            {
                image: 'currencies/btc.webp',
                name: 'Bitcoin',
                symbol: 'BTC',
                priceChangeRate: -0.54,
                price: '$61,874',
                volume: '35B',
                priceHigh: '$61,750',
                priceLow: '$0.4',
                transactions: '1,521B'
            },
            {
                image: 'currencies/eth.webp',
                name: 'Ethereum',
                symbol: 'ETH',
                priceChangeRate: 2.49,
                price: '$3,024.95',
                volume: '14.71B',
                priceHigh: '$5,768',
                priceLow: '$0.4',
                transactions: '703M'
            },
            {
                image: 'currencies/bnb.webp',
                name: 'BNB',
                symbol: 'BNB',
                priceChangeRate: 1.89,
                price: '$535.1',
                volume: '2.24B',
                priceHigh: '$798.34',
                priceLow: '$1.76',
                transactions: '13.1M'
            },
            {
                image: 'currencies/sol.webp',
                name: 'Solana',
                symbol: 'SOL',
                priceChangeRate: -7.65,
                price: '$158.96',
                volume: '4.83B',
                priceHigh: '$167.6',
                priceLow: '$3.5',
                transactions: '30.03M'
            },
            {
                image: 'currencies/xrp.webp',
                name: 'Ripple',
                symbol: 'XRP',
                priceChangeRate: -0.27,
                price: '$0.5331',
                volume: '1.96B',
                priceHigh: '$3.45',
                priceLow: '$0.006',
                transactions: '6.88M'
            },
            {
                image: 'currencies/ada.webp',
                name: 'Cardano',
                symbol: 'ADA',
                priceChangeRate: 2.63,
                price: '$0.5261',
                volume: '451.34M',
                priceHigh: '$4.76',
                priceLow: '$0.003',
                transactions: '5.4M'
            },
            {
                image: 'currencies/avax.webp',
                name: 'Avalanche',
                symbol: 'AVAX',
                priceChangeRate: 5.41,
                price: '$41.23',
                volume: '417.34M',
                priceHigh: '$156.32',
                priceLow: '$2.21',
                transactions: '8.23M'
            },
            {
                image: 'currencies/matic.webp',
                name: 'Polygon',
                symbol: 'MATIC',
                priceChangeRate: -2.46,
                price: '$0.8127',
                volume: '249.4M',
                priceHigh: '$6.75',
                priceLow: '$0.013',
                transactions: '7.31M'
            }
        ]
    ]);
    const currentDataIndex = ref(0);

    callback(data.value[currentDataIndex.value]);

    setInterval(() => {
        currentDataIndex.value = (currentDataIndex.value + 1) % data.value.length;
        callback(data.value[currentDataIndex.value]);
    }, reloadInterval);
};
