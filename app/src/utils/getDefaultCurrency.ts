import type { Currency } from '@/interfaces/Currency';

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
    }

    return defaultCurrency;
};
