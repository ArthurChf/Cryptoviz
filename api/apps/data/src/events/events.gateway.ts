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

@WebSocketGateway(8080, {
    cors: {
        origin: '*'
    }
})
export class EventsGateway {
    constructor(private readonly memoryService: MemoryService) { }

    @WebSocketServer()
        server: Server;

    handleConnection(client: Socket) {
        client.id = randomUUID();
        this.memoryService.updateClientSettings(client.id);
    }

    handleDisconnect(client: Socket) {
        this.memoryService.removeClientSettings(client.id);
    }

    @SubscribeMessage('config:update_currency')
    updateCurrency(@MessageBody() currency: string, @ConnectedSocket() client: Socket) {
        this.memoryService.updateClientSettings(client.id, currency);
    }

    @SubscribeMessage('config:update_period')
    updatePeriod(@MessageBody() period: PeriodEnum, @ConnectedSocket() client: Socket) {
        this.memoryService.updateClientSettings(client.id, null, period);
    }

    @SubscribeMessage('crypto:test')
    test(@MessageBody() data: unknown, @ConnectedSocket() client: Socket) {
        return {
            clientId: client.id,
            settings: this.memoryService.getClientSettings(client.id)
        };
    }
}
