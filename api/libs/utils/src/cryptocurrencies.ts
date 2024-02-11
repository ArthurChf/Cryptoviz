const cryptocurrencies = [
    'ada',
    'avax',
    'bnb',
    'matic',
    'uni',
    'btc',
    'eth',
    'sol',
    'xrp',
    'link',
    'pepe',
    'trx',
    'floki',
    'auction'
];

const currenciesNames = {
    'ADA': 'Cardano',
    'AVAX': 'Avalanche',
    'BNB': 'Binance Coin',
    'MATIC': 'Polygon',
    'UNI': 'Uniswap',
    'BTC': 'Bitcoin',
    'ETH': 'Ethereum',
    'SOL': 'Solana',
    'XRP': 'Ripple',
    'LINK': 'Chainlink',
    'PEPE': 'Pepe Coin',
    'TRX': 'TRON',
    'FLOKI': 'FLOKI',
    'AUCTION': 'Bounce Token'
};

export function getPairs() : string[] {
    return cryptocurrencies.map((crypto) => `${crypto}usdt`);
}

export function getCurrencyName(symbol: string): string {
    return currenciesNames[symbol.toUpperCase()] ?? '';
}
