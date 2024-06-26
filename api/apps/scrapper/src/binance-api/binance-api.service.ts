import type { OnModuleInit } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { WebSocket } from 'ws';
import { getPairs } from '@/libs/utils/src';
import { tickerMapper } from '@/libs/entities/src/scrapper-online/BinanceTicker';
import { KafkaService } from '@/libs/kafka/src/kafka.service';

@Injectable()
export class BinanceApiService implements OnModuleInit {
    private ws: WebSocket;

    public constructor(private readonly kafkaService: KafkaService) { }

    public onModuleInit() {
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

    public subscribeToTicker(ws: WebSocket, symbols: string[]) {
        const formattedPairs: string[] = symbols.map((pair) => `${pair}@ticker`);
        const subscribeMessage: string = JSON.stringify({
            method: 'SUBSCRIBE',
            params: formattedPairs,
            id: 1
        });
        ws.send(subscribeMessage);
    }

    public listenToTicker(ws: WebSocket) {
        let ticker = '';
        let response = null;

        ws.on('message', (data: string) => {
            response = JSON.parse(data);
            if (response?.e !== '24hrTicker') return;
            ticker = JSON.stringify(tickerMapper(response));
            this.sendBinanceData(ticker);
        });
    }

    public async sendBinanceData(data: string) {
        this.kafkaService.sendBinanceData(data);
    }

    public logError(ws: WebSocket) {
        ws.on('error', (error: Error) => {
            console.error('WebSocket error:', error.message);
        });
    }

    public closeConnection(ws: WebSocket) {
        ws.on('close', (code: number, reason: string) => {
            console.log('WebSocket connection closed:', code, reason);
        });
    }
}
