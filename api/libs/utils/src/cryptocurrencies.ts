const pairs = [
    'btc-fdusd',
    'btc-usdt',
    'btc-eur',
    'btc-usdc',
    'btc-busd',
    'eth-fdusd',
    'eth-usdt',
    'eth-eur',
    'eth-usdc',
    'eth-busd',
    'sol-fdusd',
    'sol-usdt',
    'sol-eur',
    'sol-eth',
    'sol-busd',
    'xrp-fdusd',
    'xrp-usdt',
    'xrp-eur',
    'xrp-eth',
    'xrp-busd',
    'link-fdusd',
    'link-usdt',
    'link-eur',
    'link-gbp',
    'link-busd',
    'pepe-try',
    'pepe-usdt',
    'trx-btc',
    'trx-usdt',
    'trx-try',
    'trx-eth',
    'trx-bnb',
    'floki-usdt',
    'floki-try',
    'auction-usdt',
    'auction-busd',
    'auction-btc',
];

const cryptocurrencies = [
    'btc',
    'eth',
    'sol',
    'xrp',
    'link',
    'pepe',
    'trx',
    'floki',
    'auction',
];

export function getCryptocurrencies(): string[] {
    return cryptocurrencies;
}

export function getPairs() : string[] {
    return pairs.map((pair) => {
        return pair.replace('-','');
    });
}