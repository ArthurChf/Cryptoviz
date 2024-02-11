import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    ConnectedSocket
} from '@nestjs/websockets';
import { MemoryService } from '@/apps/data/src/memory/memory.sevice';
import { randomUUID } from 'crypto';
import { Server } from 'ws';
import { Socket } from '@/apps/data/src/events/socket.interface';
import { PeriodEnum } from '@/apps/data/src/events/period.enum';
import { interval } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { DatabaseService } from '@/apps/data/src/database/database.service';

@WebSocketGateway(8080, {
    cors: {
        origin: 'http://localhost:5173'
    }
})
export class EventsGateway {
    constructor(
        private readonly memoryService: MemoryService,
        private readonly databaseService: DatabaseService
    ) { }

    @WebSocketServer()
        server: Server;

    loopData(action: () => Promise<void>, clientId: string) {
        const sub = interval(2000).pipe(concatMap(action)).subscribe();
        this.memoryService.addClientSubscription(clientId, sub);
    }

    sendResponse(client: Socket, eventName: string, data: unknown) {
        client.send(JSON.stringify({
            event: eventName,
            data
        }));
    }

    handleConnection(client: Socket) {
        client.id = randomUUID();
        this.memoryService.updateClientSettings(client.id);
    }

    handleDisconnect(client: Socket) {
        this.memoryService.removeClientSettings(client.id);
        this.memoryService.removeClientSubscriptions(client.id);
    }

    @SubscribeMessage('config:update_currency')
    updateCurrency(@MessageBody() currency: string, @ConnectedSocket() client: Socket) {
        this.memoryService.updateClientSettings(client.id, currency);
        this.sendResponse(client, 'config:update_currency', 'UPDATE_CURRENCY_OK');
    }

    @SubscribeMessage('config:update_period')
    updatePeriod(@MessageBody() period: PeriodEnum, @ConnectedSocket() client: Socket) {
        this.memoryService.updateClientSettings(client.id, null, period);
        this.sendResponse(client, 'config:update_period', 'UPDATE_PERIOD_OK');
    }

    @SubscribeMessage('crypto:get_currency_data')
    getCurrencyData(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const selectedCurrency = this.memoryService.getClientSettings(client.id).currency;
            const res = this.databaseService.getCurrencyData(selectedCurrency);
            this.sendResponse(client, 'crypto:get_currency_data', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_currency_price_trend')
    getCurrencyPriceTrend(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = this.databaseService.getCurrencyPriceTrend();
            this.sendResponse(client, 'crypto:get_currency_price_trend', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_currency_transactions')
    getCurrencyTransactions(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = this.databaseService.getCurrencyTransactions();
            this.sendResponse(client, 'crypto:get_currency_transactions', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_currency_fear_and_greed')
    getCurrencyFearAndGreed(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const clientCurrency = this.memoryService.getClientSettings(client.id).currency;
            const res = await this.databaseService.getCurrencyFearAndGreed(clientCurrency);
            this.sendResponse(client, 'crypto:get_currency_fear_and_greed', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_currency_news')
    getCurrencyNews(@ConnectedSocket() client: Socket) {
        // query only the last one found
        this.loopData(async () => {
            const res = this.databaseService.getCurrencyNews();
            this.sendResponse(client, 'crypto:get_currency_news', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_top_currencies')
    getTopCurrencies(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = this.databaseService.getTopCurrencies();
            this.sendResponse(client, 'crypto:get_top_currencies', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_all_currencies_data')
    getAllCurrenciesData(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = this.databaseService.getAllCurrenciesData();
            this.sendResponse(client, 'crypto:get_all_currencies_data', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_all_currencies_news')
    getAllCurrenciesNews(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = this.databaseService.getAllCurrenciesNews();
            this.sendResponse(client, 'crypto:get_all_currencies_news', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_news_trending_currencies')
    getNewsTrendingCurrencies(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = this.databaseService.getNewsTrendingCurrencies();
            this.sendResponse(client, 'crypto:get_news_trending_currencies', res);
        }, client.id);
    }
}
