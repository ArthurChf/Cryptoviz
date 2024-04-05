import type { Currency } from '@/interfaces/Currency';

export const getAllCurrencies = (callback: (data: unknown, otherParam?: string) => void, reloadInterval: number, searchQuery?: string) => {
    const data: Currency[] = [
        {
            image: 'currencies/ada.webp',
            name: 'Cardano',
            symbol: 'ADA'
        },
        {
            image: 'currencies/auction.webp',
            name: 'Bounce Token',
            symbol: 'AUCTION'
        },
        {
            image: 'currencies/avax.webp',
            name: 'Avalanche',
            symbol: 'AVAX'
        },
        {
            image: 'currencies/bnb.webp',
            name: 'BNB',
            symbol: 'BNB'
        },
        {
            image: 'currencies/btc.webp',
            name: 'Bitcoin',
            symbol: 'BTC'
        },
        {
            image: 'currencies/eth.webp',
            name: 'Ethereum',
            symbol: 'ETH'
        },
        {
            image: 'currencies/floki.webp',
            name: 'Floki',
            symbol: 'FLOKI'
        },
        {
            image: 'currencies/link.webp',
            name: 'Chainlink',
            symbol: 'LINK'
        },
        {
            image: 'currencies/matic.webp',
            name: 'Polygon',
            symbol: 'MATIC'
        },
        {
            image: 'currencies/pepe.webp',
            name: 'Pepe',
            symbol: 'PEPE'
        },
        {
            image: 'currencies/sol.webp',
            name: 'Solana',
            symbol: 'SOL'
        },
        {
            image: 'currencies/trx.webp',
            name: 'Tron',
            symbol: 'TRX'
        },
        {
            image: 'currencies/uni.webp',
            name: 'Uniswap',
            symbol: 'UNI'
        },
        {
            image: 'currencies/xrp.webp',
            name: 'Ripple',
            symbol: 'XRP'
        }
    ];

    if (searchQuery) callback(data.filter((v) => v.name.toLowerCase().includes(searchQuery) || v.symbol.toLowerCase().includes(searchQuery)));
    else callback(data);
};
