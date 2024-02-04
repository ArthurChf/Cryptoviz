const cryptocurrencies = [
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

export function getCryptocurrencies(): string[] {
    return cryptocurrencies;
}

export function getPairs() : string[] {
    return cryptocurrencies.map((crypto) => `${crypto}usdt`);
}
