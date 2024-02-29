import { ref } from 'vue';

export const getCurrencyData = (callback: (data: unknown, otherParam?: string) => void, reloadInterval: number) => {
    const data = ref([
        {
            price: '$12.51',
            growthRate: 0.15,
            priceHigh: '$15.67',
            priceLow: '$3.21',
            totalTrades: '1268',
            volume: '$12321'
        },
        {
            price: '$12.53',
            growthRate: 0.32,
            priceHigh: '$15.67',
            priceLow: '$3.21',
            totalTrades: '1270',
            volume: '$12347'
        },
        {
            price: '$12.48',
            growthRate: 0.38,
            priceHigh: '$15.67',
            priceLow: '$3.21',
            totalTrades: '1278',
            volume: '$12413'
        }
    ]);
    const currentRowIndex = ref(0);

    callback(data.value[currentRowIndex.value]);
    setInterval(() => {
        currentRowIndex.value = (currentRowIndex.value + 1) % data.value.length;
        callback(data.value[currentRowIndex.value]);
    }, reloadInterval);
};
