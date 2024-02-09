import { defineStore } from 'pinia';
import type { EventNameEnum } from '@/enums/EventNameEnum';
import { createSocket } from '@/utils/createSocket';

export const useSocketStore = defineStore('socket', {
    state: () => ({
        isSocketInit: false,
        socketConnectionPromise: null as Promise<void> | null,
        socketClient: createSocket(),
        requestedEvents: new Map() as Map<EventNameEnum, <T>(data: T) => void>
    }),
    actions: {
        async waitSocketConnection() {
            if (this.socketConnectionPromise) return this.socketConnectionPromise;

            this.socketConnectionPromise = new Promise((resolve, reject) => {
                const errorListener = () => {
                    reject(new Error('WebSocket encountered an error before it could open'));
                    this.socketConnectionPromise = null;
                    resolve();
                };
                const openListener = () => {
                    this.socketClient.removeEventListener('open', openListener);
                    this.socketClient.removeEventListener('error', errorListener);
                    this.socketConnectionPromise = null;
                    resolve();
                };
                this.socketClient.addEventListener('open', openListener);
                this.socketClient.addEventListener('error', errorListener);
            });

            return this.socketConnectionPromise;
        },
        subscribe(eventName: EventNameEnum) {
            this.socketClient.send(JSON.stringify({
                event: eventName
            }));
        },
        init() {
            if (this.isSocketInit) return;

            this.isSocketInit = true;
            this.socketClient.addEventListener('message', (event) => {
                try {
                    const payload: { event: EventNameEnum; data: unknown } = JSON.parse(event.data);
                    if (this.requestedEvents.has(payload.event)) {
                        const callback = this.requestedEvents.get(payload.event)!;
                        callback(payload.data);
                    }
                } catch (error) {
                    console.error('Error handling message', error);
                }
            });
        },
        addEvent(eventName: EventNameEnum, callback: <T>(data: T) => void) {
            if (!this.requestedEvents.has(eventName)) {
                this.requestedEvents.set(eventName, callback);
                this.subscribe(eventName);
            }
        }
    }
});
