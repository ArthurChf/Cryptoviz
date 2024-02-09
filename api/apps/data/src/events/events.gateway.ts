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
import { ObservableInput, interval } from 'rxjs';
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
            client.send(res);
        }, client.id);
    }
}
