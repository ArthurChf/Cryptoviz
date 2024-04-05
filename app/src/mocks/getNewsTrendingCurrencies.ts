import type { NewsTrendingCurrency } from '@/interfaces/NewsTrendingCurrency';

export const getNewsTrendingCurrencies = (callback: (data: unknown, otherParam?: string) => void, reloadInterval: number) => {
    const data: NewsTrendingCurrency[] = [
        {
            image: 'currencies/btc.webp',
            name: 'Bitcoin',
            symbol: 'BTC',
            articlesRate: 68
        },
        {
            image: 'currencies/eth.webp',
            name: 'Ethereum',
            symbol: 'ETH',
            articlesRate: 49
        },
        {
            image: 'currencies/bnb.webp',
            name: 'BNB',
            symbol: 'BNB',
            articlesRate: 38
        },
        {
            image: 'currencies/sol.webp',
            name: 'Solana',
            symbol: 'SOL',
            articlesRate: 16
        }
    ];
    callback(data);
};
