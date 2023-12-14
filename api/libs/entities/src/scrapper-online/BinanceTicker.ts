interface BinanceTickerDto {
    s: number;
    p: string;
    P: string;
    w: string;
    c: string;
    Q: string;
    b: string;
    B: string;
    a: string;
    A: string;
    o: string;
    h: string;
    l: string;
    n: number;
}

export interface BinanceTicker {
    symbol: number;
    price_change: string;
    price_change_percent: string;
    weighted_average_price: string;
    last_price: string;
    last_quantity: string;
    best_bid_price: string;
    best_bid_quantity: string;
    best_ask_price: string;
    best_ask_quantity: string;
    open_price: string;
    high_price: string;
    low_price: string;
    total_number_of_trades: number;
}

export function tickerMapper(data: BinanceTickerDto): BinanceTicker {
    return {
        symbol: data.s,
        price_change: data.p,
        price_change_percent: data.P,
        weighted_average_price: data.w,
        last_price: data.c,
        last_quantity: data.Q,
        best_bid_price: data.b,
        best_bid_quantity: data.B,
        best_ask_price: data.a,
        best_ask_quantity: data.A,
        open_price: data.o,
        high_price: data.h,
        low_price: data.l,
        total_number_of_trades: data.n
    };
}
