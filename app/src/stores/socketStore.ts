import { defineStore } from 'pinia';
import type { HttpOptions } from '@/interfaces/HttpOptions';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { SocketEventEnum } from '@/enums/SocketEventEnum';
import { createSocket } from '@/utils/createSocket';
import { useRequest } from '@/composables/useRequest';
import { useAppStore } from '@/stores/appStore';
import { useCurrencyStore } from '@/stores/currencyStore';

export const useSocketStore = defineStore('socket', {
    state: () => ({
        isSocketInit: false,
        socketConnectionPromise: null as Promise<void> | null,
        socketClient: createSocket(),
        requestedEvents: new Map() as Map<SocketEventEnum, (data: unknown) => void>
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
        async subscribe(socketOptions: SocketOptions) {
            const payload = {
                event: socketOptions.eventName,
                data: socketOptions.data ?? ''
            };
            this.socketClient.send(JSON.stringify(payload));
        },
        init() {
            if (this.isSocketInit) return;

            this.isSocketInit = true;
            this.socketClient.addEventListener('message', (event) => {
                try {
                    const payload: { event: SocketEventEnum; data: unknown } = JSON.parse(event.data);
                    if (this.requestedEvents.has(payload.event)) {
                        const callback = this.requestedEvents.get(payload.event)!;
                        callback(payload.data);
                    }
                } catch (error) {
                    console.error('Error handling message', error);
                }
            });

            const currencyStore = useCurrencyStore();
            const appStore = useAppStore();
            this.addEvent(null, {
                eventName: SocketEventEnum.CONFIG_UPDATE_CURRENCY,
                data: currencyStore.selectedCurrency.symbol
            }, (response: string) => {
                if (response === 'UPDATE_CURRENCY_OK') console.log('Selected currency init');
            });
            this.addEvent(null, {
                eventName: SocketEventEnum.CONFIG_UPDATE_PERIOD,
                data: appStore.selectedPeriod
            }, (response: string) => {
                if (response === 'UPDATE_PERIOD_OK') console.log('Selected period init');
            });
        },
        async addEvent<T>(httpOptions: HttpOptions | null, socketOptions: SocketOptions, callback: (data: T) => void) {
            if (!this.requestedEvents.has(socketOptions.eventName)) {
                this.requestedEvents.set(socketOptions.eventName, callback as (data: unknown) => void);

                if (httpOptions) {
                    const { routeName } = httpOptions;
                    const currencyStore = useCurrencyStore();
                    const appStore = useAppStore();

                    let query = {
                        currency: currencyStore.selectedCurrency.symbol,
                        period: appStore.selectedPeriod
                    };
                    if (httpOptions?.queryParams) query = { ...query, ...httpOptions.queryParams };

                    const response = await useRequest<T>(routeName, { query, method: 'GET' });
                    const action = this.requestedEvents.get(socketOptions.eventName)!;
                    action(response);
                }
                this.subscribe(socketOptions);
            }
        }
    }
});
