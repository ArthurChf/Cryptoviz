import type { SocketEventEnum } from '@/enums/SocketEventEnum';

export interface SocketOptions {
    eventName: SocketEventEnum;
    data?: unknown;
}
