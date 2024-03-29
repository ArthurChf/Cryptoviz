import type { Currency } from '@/interfaces/Currency';
import { isDemoEnv } from '@/composables/useEnv';

export const getDefaultCurrency = () => {
    let defaultCurrency: Currency = {
        name: '',
        symbol: '',
        image: ''
    };

    const storedCurrency = localStorage.getItem('selected_currency');
    if (storedCurrency) {
        try {
            const tmp = JSON.parse(storedCurrency);
            if (Object.hasOwn(tmp, 'name') && Object.hasOwn(tmp, 'symbol') && Object.hasOwn(tmp, 'image')) defaultCurrency = tmp;
        } catch (_) {}
    } else if (isDemoEnv) {
        defaultCurrency = {
            image: 'currencies/matic.webp',
            name: 'Polygon',
            symbol: 'MATIC'
        };
    }

    return defaultCurrency;
};
