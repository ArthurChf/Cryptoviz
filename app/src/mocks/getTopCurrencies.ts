import { ref } from 'vue';
import type { TopCurrency } from '@/interfaces/TopCurrency';

export const getTopCurrencies = (callback: (data: unknown, otherParam?: string) => void, reloadInterval: number) => {
    const data = ref<TopCurrency[][]>([
        [
            {
                symbol: 'BTC',
                name: 'Bitcoin',
                image: 'currencies/btc.webp',
                data: {
                    price: '$61,934',
                    volume: '31.5B',
                    priceChangeRate: '0.37%'
                }
            },
            {
                symbol: 'ETH',
                name: 'Ethereum',
                image: 'currencies/eth.webp',
                data: {
                    price: '$3,025.18',
                    volume: '14.6B',
                    priceChangeRate: '2.74%'
                }
            },
            {
                symbol: 'BNB',
                name: 'BNB',
                image: 'currencies/bnb.webp',
                data: {
                    price: '$532.07',
                    volume: '2.1B',
                    priceChangeRate: '2.53%'
                }
            }
        ],
        [
            {
                symbol: 'BTC',
                name: 'Bitcoin',
                image: 'currencies/btc.webp',
                data: {
                    price: '$61,908',
                    volume: '33.2B',
                    priceChangeRate: '0.46%'
                }
            },
            {
                symbol: 'ETH',
                name: 'Ethereum',
                image: 'currencies/eth.webp',
                data: {
                    price: '$3,023.95',
                    volume: '14.7B',
                    priceChangeRate: '2.77%'
                }
            },
            {
                symbol: 'BNB',
                name: 'BNB',
                image: 'currencies/bnb.webp',
                data: {
                    price: '$533.76',
                    volume: '2B',
                    priceChangeRate: '2.48%'
                }
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
