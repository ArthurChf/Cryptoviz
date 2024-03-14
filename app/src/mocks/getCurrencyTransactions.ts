import type { Transaction } from '@/interfaces/Transaction';
import { ref } from 'vue';

export const getCurrencyTransactions = (callback: (data: unknown, otherParam?: string) => void, reloadInterval: number) => {
    const allData: Transaction[] = [
        {
            currencySymbol: 'SOL',
            currencyName: 'Solana',
            currencyImage: 'currencies/sol.webp',
            amount: '$25',
            id: '#4',
            date: '2024-02-29 02:10:06'
        },
        {
            currencySymbol: 'ETH',
            currencyName: 'Ethereum',
            currencyImage: 'currencies/eth.webp',
            amount: '$790',
            id: '#3',
            date: '2024-02-29 02:10:04'
        },
        {
            currencySymbol: 'MATIC',
            currencyName: 'Polygon',
            currencyImage: 'currencies/matic.webp',
            amount: '$32',
            id: '#2',
            date: '2024-02-29 02:10:02'
        },
        {
            currencySymbol: 'BTC',
            currencyName: 'Bitcoin',
            currencyImage: 'currencies/btc.webp',
            amount: '$237',
            id: '#1',
            date: '2024-02-29 02:10:00'
        }
    ];
    const data = ref<Transaction[]>([
        {
            currencySymbol: 'BTC',
            currencyName: 'Bitcoin',
            currencyImage: 'currencies/btc.webp',
            amount: '$853',
            id: '',
            date: '2024-02-29 02:10:08'
        },
        {
            currencySymbol: 'UNI',
            currencyName: 'Uniswap',
            currencyImage: 'currencies/uni.webp',
            amount: '$55',
            id: '',
            date: '2024-02-29 02:10:10'
        },
        {
            currencySymbol: 'XRP',
            currencyName: 'Ripple',
            currencyImage: 'currencies/xrp.webp',
            amount: '$21',
            id: '',
            date: '2024-02-29 02:10:12'
        },
        {
            currencySymbol: 'AVAX',
            currencyName: 'Avalanche',
            currencyImage: 'currencies/avax.webp',
            amount: '$16',
            id: '',
            date: '2024-02-29 02:10:14'
        }
    ]);
    const currentDataIndex = ref(0);
    const lastTransactionId = ref(5);

    callback(allData);
    setInterval(() => {
        const currentRow = { ...data.value[currentDataIndex.value]! };
        currentRow.id = `#${lastTransactionId.value++}`;
        callback(currentRow);
        currentDataIndex.value = (currentDataIndex.value + 1) % data.value.length;
    }, reloadInterval);
};
