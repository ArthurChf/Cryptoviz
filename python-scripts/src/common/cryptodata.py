cryptocurrencies = [
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
]

cryptocurrencies_keys = {
    'cardano': 'ada',
    'avalanche': 'avax',
    'binance': 'bnb',
    'polygon': 'matic',
    'uniswap': 'uni',
    'bitcoin': 'btc',
    'ethereum': 'eth',
    'solana': 'sol',
    'ripple': 'xrp',
    'chainlink': 'link',
    'pepe': 'pepe',
    'tron': 'trx',
    'floki': 'floki',
    'auction': 'auction',
    'ada': 'ada',
    'avax': 'avax',
    'bnb': 'bnb',
    'matic': 'matic',
    'uni': 'uni',
    'btc': 'btc',
    'eth': 'eth',
    'sol': 'sol',
    'xrp': 'xrp',
    'link': 'link',
    'pepe': 'pepe',
    'trx': 'trx',
    'floki': 'floki',
    'auction': 'auction'
}

references = ['usdt']

crypto_pairs = {
    crypto + ref: [crypto, ref]
    for crypto in cryptocurrencies
    for ref in references
}

