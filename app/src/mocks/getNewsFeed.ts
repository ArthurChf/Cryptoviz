import type { News } from '@/interfaces/News';

export const getNewsFeed = (callback: (data: unknown, otherParam?: string) => void, reloadInterval: number) => {
    const data: News[] = [
        {
            source: 'Cryptopolitan',
            symbol: 'BTC',
            sentiment: 57,
            title: 'Holders Eye Underpriced Entry',
            date: '2024-02-29 02:10:06',
            content: `Presale Hype Sparks Frenzy On Borroe Finance While #Chainlink And 
            MATIC$MATIC
             Holders Eye Underpriced Entry
            
            #Polygon 
            LINK$LINK`,
            author: 'John Palmer',
            link: 'https://www.cryptopolitan.com/fr/',
            image: 'news_sources/cryptopolitan.webp'
        },
        {
            source: 'Newsbtc',
            symbol: 'MATIC',
            sentiment: 89,
            title: 'SAWorld_io is announcing a major move',
            date: '2024-02-29 02:11:45',
            content: `Today, @SAWorld_io is announcing a major move to migrate their gaming platform from Polygon and BNB Chain to exclusively launch on the Injective ecosystem.


            SA World, one of the largest gaming platforms with over 500,000 users can now leverage Injective’s unmatched tech 🎮
            
            2/ Details 👇`,
            author: 'Aayush Jindal',
            link: 'https://www.newsbtc.com/',
            image: 'news_sources/newsbtc.webp'
        },
        {
            source: 'Cryptopotato',
            symbol: 'ADA',
            sentiment: 43,
            title: 'Is Cardano Dead❓',
            date: '2024-02-29 02:12:09',
            content: `Is Cardano Dead❓ Loyalists Seen Buying Polygon ( 
                MATIC$MATIC
                 ) and This Other Crypto in 2024 Following Disappointing Run With 
                ADA$ADA
                 🔄📉
                
                
                To Know More👇
                
                  thenewscrypto.com/is-cardano-d...
                
                
                #Cardano #Polygon@0xPolygon @Cardano @Cardano_CF`,
            author: 'Scott Matherson',
            link: 'https://cryptopotato.com',
            image: 'news_sources/cryptopotato.webp'
        },
        {
            source: 'Cryptoslate',
            symbol: 'AVAX',
            sentiment: 50,
            title: 'Google unveils cryptocurrency wallet balance search service',
            date: '2024-02-29 02:13:01',
            content: `📰 Just IN: Google unveils cryptocurrency wallet balance search service, displaying token balances for Bitcoin, Arbitrum (ARB), Avalanche (AVAX), Optimism (OP), Polygon (MATIC), and Phantom (FTM) networks; balances show native tokens with timestamps reflecting last transaction. #Bitcoinworld 🖥️💰`,
            author: 'Rubmar Garcia',
            link: 'https://cryptoslate.com',
            image: 'news_sources/cryptoslate.webp'
        },
        {
            source: 'Decrypt',
            symbol: 'ETH',
            sentiment: 38,
            title: 'Why is crypto down today?',
            date: '2024-02-29 02:13:22',
            content: `📰 roundup:

            📈 Why is crypto down today?
            
            → Unstoppable Domains and Pudgy Penguins Bridge Web3 and Web2 Domains via ICANN
            
            → Casa's Self-Custody Inheritance Product for 
            BTC$BTC
            , 
            ETH$ETH
            , 
            USDT$USDT
            , and 
            USDC$USDC
             Live
            
            → Laser Digital Launches Polygon Adoption Fund`,
            author: 'Jake Simmons',
            link: 'https://decrypt.co/',
            image: 'news_sources/decrypt.webp'
        },
        {
            source: 'Alexablockchain',
            symbol: 'MATIC',
            sentiment: 50,
            title: 'Effortless access to comprehensive #NFT data',
            date: '2024-02-29 02:13:57',
            content: `👩‍💻 Attention all Polygon zkEVM @0xPolygon developers!


            We are thrilled to introduce the amazing Polygon zkEVM #NFTScanAPI, specifically offering you effortless access to comprehensive #NFT data on the #Polygon zkEVM network for your #dApp.
            
            
            ✨ Dive into our comprehensive guide now: 👉  t.co/1vtsmLvbKv
            
            
            ⚡️ Unleash the full potential of your Dapp development with the robust NFTScan #API.
            
            
            #NFTs #NFTFam`,
            author: 'Christian Encila',
            link: 'https://alexablockchain.com',
            image: 'news_sources/alexablockchain.webp'
        }
    ];
    callback(data);
};
