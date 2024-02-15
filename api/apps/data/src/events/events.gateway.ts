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

@WebSocketGateway(8083, { cors: { origin: 'http://localhost:5173', credentials: true } })
export class EventsGateway {
    constructor(
        private readonly memoryService: MemoryService,
        private readonly databaseService: DatabaseService
    ) {
    }

    @WebSocketServer()
        server: Server;

    loopData(action: () => Promise<void>, clientId: string, msInterval: number = 2000) {
        const sub = interval(msInterval).pipe(concatMap(action)).subscribe();
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
            const res = await this.databaseService.getCurrencyData(selectedCurrency);
            this.sendResponse(client, 'crypto:get_currency_data', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_currency_price_trend')
    getCurrencyPriceTrend(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const clientParams = this.memoryService.getClientSettings(client.id);
            const payload_date = {
                day: clientParams.lastDate.split(' ')[0],
                hour: clientParams.lastDate.split(' ')[1]
            };
            let cachePriceTrendDate = this.memoryService.getCryptoTrendDate(client.id);
            if (!cachePriceTrendDate) {
                this.memoryService.setCryptoTrendDate(client.id, { day: payload_date.day, hour: payload_date.hour });
                cachePriceTrendDate = this.memoryService.getCryptoTrendDate(client.id);
            }
            const start_date = new Date(`${cachePriceTrendDate.day} ${cachePriceTrendDate.hour}`);
            const [res] = await this.databaseService.getCurrencyPriceTrend(clientParams.currency, clientParams.period, 'day, hour', 'LIMIT 1', start_date);
            if (res) {
                const incrementedDate: Date = new Date(start_date);
                // Mettre la date à la bonne heure
                incrementedDate.setHours(incrementedDate.getHours() + 1);

                if (clientParams.period === PeriodEnum.ONE_DAY) {
                    incrementedDate.setMinutes(incrementedDate.getMinutes() + 5);
                }
                if (clientParams.period === PeriodEnum.SEVEN_DAYS) {
                    incrementedDate.setMinutes(incrementedDate.getMinutes() + 15);
                }
                if (clientParams.period === PeriodEnum.ONE_MONTH) {
                    incrementedDate.setMinutes(incrementedDate.getHours() + 1);
                }
                if (clientParams.period === PeriodEnum.ONE_YEAR) {
                    incrementedDate.setMinutes(incrementedDate.getHours() + 10);
                }
                const day = incrementedDate.toISOString().split('T')[0];
                const hour = incrementedDate.toISOString().split('T')[1].split('.')[0];
                this.sendResponse(client, 'crypto:get_currency_price_trend', res);
                this.memoryService.setCryptoTrendDate(client.id, { day, hour });
            }
        }, client.id);
    }

    @SubscribeMessage('crypto:get_currency_transactions')
    getCurrencyTransactions(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const clientCurrency = this.memoryService.getClientSettings(client.id).currency;
            const [lastTransaction] = await this.databaseService.getCurrencyTransactions(clientCurrency);
            if (this.memoryService.getCryptoLastTrade(clientCurrency) !== lastTransaction.id) {
                this.memoryService.setCryptoLastTrade(clientCurrency, lastTransaction.id);
                this.sendResponse(client, 'crypto:get_currency_transactions', lastTransaction);
            }
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
        const fifteenMinutes = 900000;
        this.loopData(async () => {
            const selectedCurrency = this.memoryService.getClientSettings(client.id).currency;
            const lastFetchDate = this.memoryService.getLastFetchNewsDate(client.id);
            let res = await this.databaseService.getCurrencyNews(selectedCurrency, lastFetchDate);
            if (res.length) {
                if (res[0].originalDate === lastFetchDate) res = [];
                else this.memoryService.updateLastFetchNewsDate(client.id, res[0].originalDate);
            }
            this.sendResponse(client, 'crypto:get_currency_news', res);
        }, client.id, fifteenMinutes);
    }

    @SubscribeMessage('crypto:get_top_currencies')
    getTopCurrencies(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = await this.databaseService.getTopCurrencies();
            this.sendResponse(client, 'crypto:get_top_currencies', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_all_currencies_data')
    getAllCurrenciesData(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = await this.databaseService.getAllCurrenciesData();
            this.sendResponse(client, 'crypto:get_all_currencies_data', res);
        }, client.id);
    }

    @SubscribeMessage('crypto:get_all_currencies_news')
    getAllCurrenciesNews(@ConnectedSocket() client: Socket) {
        const fifteenMinutes = 900000;
        this.loopData(async () => {
            const lastFetchDate = this.memoryService.getLastFetchAllNewsDate(client.id);
            let res = await this.databaseService.getAllCurrenciesNews(lastFetchDate);
            if (res.length) {
                if (res[0].originalDate === lastFetchDate) res = [];
                else this.memoryService.updateLastFetchAllNewsDate(client.id, res[0].originalDate);
            }
            this.sendResponse(client, 'crypto:get_all_currencies_news', res);
        }, client.id, fifteenMinutes);
    }

    @SubscribeMessage('crypto:get_news_trending_currencies')
    getNewsTrendingCurrencies(@ConnectedSocket() client: Socket) {
        this.loopData(async () => {
            const res = await this.databaseService.getNewsTrendingCurrencies();
            this.sendResponse(client, 'crypto:get_news_trending_currencies', res);
        }, client.id);
    }
}
