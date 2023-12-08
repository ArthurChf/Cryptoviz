import {Injectable, OnModuleInit} from '@nestjs/common';
import { WebSocket } from "ws";
import { getPairs } from "@app/utils";
import { tickerMapper } from "@libs/entities/src/scrapper-online/BinanceTicker";

@Injectable()
export class BinanceApiService implements OnModuleInit {
    private ws: WebSocket;
    private results: any[] = [];
    private messageCount: number = 0;
    private cryptoStats: Map<string, any> = new Map<string, any>();
    onModuleInit(): any {
        this.ws = new WebSocket('wss://stream.binance.com:9443/ws');
        this.ws.on('open', () => {
            console.log('Connecté à Binance WebSocket API');
            const pairs = getPairs();
            this.subscribeToTicker(this.ws, pairs);
            this.listenToTicker(this.ws);
            this.logError(this.ws);
            this.closeConnection(this.ws);
        });
    }

    subscribeToTicker(ws: WebSocket, symbols: string[]) {
        const formattedPairs: string[] = symbols.map(pair => `${pair}@ticker`);
         const subscribeMessage: string = JSON.stringify({
            method: "SUBSCRIBE",
            params: formattedPairs,
            id: 1
        });
        ws.send(subscribeMessage);
    }

    listenToTicker(ws: WebSocket) {
        ws.on('message', (data: string) => {
            const response: any = JSON.parse(data);
            if (response?.e !== '24hrTicker') return;
            const ticker = tickerMapper(response);
            this.cryptoStats.set(response.s, ticker);
            console.log(this.cryptoStats);
        });
    }

    logError(ws: WebSocket) {
        ws.on('error', (error: Error) => {
            console.error('WebSocket error:', error.message);
        });
    }

    closeConnection(ws: WebSocket) {
        ws.on('close', (code: number, reason: string) => {
            console.log('WebSocket connection closed:', code, reason);
        });
    }

}
