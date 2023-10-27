const pairs = [
    'btc-fdusd',
    'btc-usdt',
    'eth-usdt',
    'usdc-usdt',
    'sol-usdt',
    'xpr-usdt',
    'fdusd-usdt',
    'doge-usdt',
    'bnb-usdt',
    'link-usdt',
    'eth-btc',
    'pepe-usdt',
    'gala-usdt',
    'cyber-usdt',
    'usdt-try',
    'arb-usdt',
    'shib-usdt',
    'busd-usdt',
    'trb-usdt',
    'avax-usdt',
    'matic-usdt',
    'mina-usdt',
    'apt-usdt',
    'floki-usdt',
    'lqty-usdt',
    'loom-usdt',
    'powr-usdt',
    'cfx-usdt',
    'ltc-usdt',
    'agld-usdt',
    'op-usdt',
];

export function getCryptocurrencies(): string[] {
    return pairs.map((pair) => {
        return pair.split('-')[0];
    });
}

export function getPairs() : string[] {
    return pairs.map((pair) => {
        return pair.replace('-','');
    });
}