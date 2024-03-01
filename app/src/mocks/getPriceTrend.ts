import { ref } from 'vue';
import type { PriceTrendDataArray } from '@/interfaces/PriceTrendDataArray';
import type { PriceTrendData } from '@/interfaces/PriceTrendData';

export const getPriceTrend = (callback: (data: unknown, otherParam?: string) => void, reloadInterval: number) => {
    const allData: PriceTrendDataArray = {
        prices: [12, 12.70, 12.30, 12.50, 12.80, 12.50, 12.75, 12.43, 12.56, 12.89, 13.20, 13.70, 13.90, 14, 13.76],
        days: ['2024-02-29', '2024-02-29', '2024-02-29', '2024-02-29', '2024-02-29', '2024-02-29', '2024-02-29', '2024-02-29', '2024-02-29', '2024-02-29', '2024-02-29', '2024-02-29', '2024-02-29', '2024-02-29', '2024-02-29'],
        hours: ['01:00:00', '01:05:00', '01:10:00', '01:15:00', '01:20:00', '01:25:00', '01:30:00', '01:35:00', '01:40:00', '01:45:00', '01:50:00', '01:55:00', '02:00:00', '02:05:00', '02:10:00']
    };
    const data = ref<PriceTrendData[]>([
        {
            price: 13.12,
            day: '2024-02-29',
            hour: '02:10:00'
        },
        {
            price: 13.02,
            day: '2024-02-29',
            hour: '02:15:00'
        },
        {
            price: 13.27,
            day: '2024-02-29',
            hour: '02:20:00'
        },
        {
            price: 13.70,
            day: '2024-02-29',
            hour: '02:25:00'
        }
    ]);

    const currentDataIndex = ref(0);

    callback(allData, 'all');
    setInterval(() => {
        callback(data.value[currentDataIndex.value], 'one');
        if (currentDataIndex.value === data.value.length - 1) {
            callback(null, 'mockReset');
            callback(allData, 'all');
        }
        currentDataIndex.value = (currentDataIndex.value + 1) % data.value.length;
    }, reloadInterval);
};
