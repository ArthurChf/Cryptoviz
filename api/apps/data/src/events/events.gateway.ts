import {
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    ConnectedSocket
} from '@nestjs/websockets';
import { MemoryService } from '@/apps/data/src/memory/memory.sevice';
import { DataService } from '@/apps/data/src/data.service';
import { randomUUID } from 'crypto';
import { Server } from 'ws';
import { Socket } from '@/apps/data/src/events/socket.interface';
import { PeriodEnum } from '@/apps/data/src/events/period.enum';
import { interval } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@WebSocketGateway(8080, {
    cors: {
        origin: '*'
    }
})
export class EventsGateway {
    constructor(
        private readonly dataService: DataService,
        private readonly memoryService: MemoryService
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
    }

    @SubscribeMessage('config:update_period')
    updatePeriod(@MessageBody() period: PeriodEnum, @ConnectedSocket() client: Socket) {
        this.memoryService.updateClientSettings(client.id, null, period);
    }

    @SubscribeMessage('crypto:get_currency_data')
    getCurrencyData(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = this.dataService.getCurrencyData();
            this.sendResponse(client, 'crypto:get_currency_data', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_price_trend')
    getPriceTrend(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = this.dataService.getPriceTrend();
            this.sendResponse(client, 'crypto:get_price_trend', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_transactions')
    getTransactions(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = this.dataService.getTransactions();
            this.sendResponse(client, 'crypto:get_transactions', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_fear_and_greed')
    getFearAndGreed(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = this.dataService.getFearAndGreed();
            this.sendResponse(client, 'crypto:get_fear_and_greed', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_news')
    getNews(@ConnectedSocket() client: Socket) {
        // query only the last one found
        this.loopData(async () => {
            const res = this.dataService.getNews();
            this.sendResponse(client, 'crypto:get_news', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_all_currencies_data')
    getAllCurrenciesData(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = this.dataService.getAllCurrenciesData();
            this.sendResponse(client, 'crypto:get_all_currencies_data', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_top_currencies')
    getTopCurrencies(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = this.dataService.getTopCurrencies();
            this.sendResponse(client, 'crypto:get_top_currencies', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_all_currencies_news')
    getAllCurrenciesNews(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = this.dataService.getAllCurrenciesNews();
            this.sendResponse(client, 'crypto:get_all_currencies_news', res);
        }, client.id);
    }
}
