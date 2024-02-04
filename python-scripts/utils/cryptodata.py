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

references = ['usdt']

crypto_pairs = {
    crypto + ref: [crypto, ref]
    for crypto in cryptocurrencies
    for ref in references
}