cryptocurrencies = [
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
    'bitcoin': 'btc',
    'ethereum': 'eth',
    'solana': 'sol',
    'ripple': 'xrp',
    'chainlink': 'link',
    'pepe': 'pepe',
    'tron': 'trx',
    'floki': 'floki',
    'auction': 'auction',
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

