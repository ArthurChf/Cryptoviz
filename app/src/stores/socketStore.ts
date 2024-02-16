import { defineStore, storeToRefs } from 'pinia';
import type { HttpOptions } from '@/interfaces/HttpOptions';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { SocketEventEnum } from '@/enums/SocketEventEnum';
import { createSocket } from '@/utils/createSocket';
import { useRequest } from '@/composables/useRequest';
import { useAppStore } from '@/stores/appStore';
import { useCurrencyStore } from '@/stores/currencyStore';
import { HttpRouteEnum } from '@/enums/HttpRouteEnum';
import type { PriceTrendDataArray } from '@/interfaces/PriceTrendDataArray';

interface ConfigUpdateOptions {
    callback(): void;
    httpOptions: HttpOptions | null;
    socketOptions: SocketOptions | null;
}

export const useSocketStore = defineStore('socket', {
    state: () => ({
        isSocketInit: false,
        socketConnectionPromise: null as Promise<void> | null,
        socketClient: createSocket(),
        requestedEvents: new Map() as Map<SocketEventEnum, (data: unknown, otherParam?: string) => void>,
        currencyUpdateCallbacks: [] as ConfigUpdateOptions[],
        periodUpdateCallbacks: [] as ConfigUpdateOptions[]
    }),
    actions: {
        async waitSocketConnection() {
            if (this.socketConnectionPromise) return this.socketConnectionPromise;
            if (this.socketClient.readyState === this.socketClient.OPEN) return null;

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
        async send(socketOptions: SocketOptions) {
            await this.init();
            const payload = {
                event: socketOptions.eventName,
                data: socketOptions.data ?? ''
            };
            this.socketClient.send(JSON.stringify(payload));
        },
        onCurrencyUpdate(callback: () => void, httpOptions: HttpOptions | null, socketOptions: SocketOptions | null) {
            this.currencyUpdateCallbacks.push({ callback, httpOptions, socketOptions });
        },
        onPeriodUpdate(callback: () => void, httpOptions: HttpOptions | null, socketOptions: SocketOptions | null) {
            this.periodUpdateCallbacks.push({ callback, httpOptions, socketOptions });
        },
        async handleHttpRequest(httpOptions: HttpOptions | null, socketOptions: SocketOptions | null) {
            if (httpOptions && socketOptions) {
                const response = await this.request(httpOptions);
                const action = this.requestedEvents.get(socketOptions.eventName)!;

                if (httpOptions.routeName === HttpRouteEnum.CRYPTO_GET_CURRENCY_PRICE_TREND) {
                    const data = response as PriceTrendDataArray;
                    if (data.days.length && data.hours.length) {
                        socketOptions.data = `${data.days[data.days.length - 1]!} ${data.hours[data.hours.length - 1]!}`;
                    }
                    action(response, 'all');
                } else {
                    action(response);
                }
            }
        },
        async init() {
            if (this.isSocketInit) return;
            this.isSocketInit = true;

            await this.waitSocketConnection();
            const appStore = useAppStore();
            const currencyStore = useCurrencyStore();

            currencyStore.selectCurrencyEvent();
            appStore.selectPeriodEvent();

            const { isUpdatingConfig } = storeToRefs(appStore);

            this.socketClient.addEventListener('message', (event) => {
                try {
                    const payload: { event: SocketEventEnum; data: unknown } = JSON.parse(event.data);
                    if (payload.event === SocketEventEnum.CONFIG_UPDATE_CURRENCY && payload.data === 'UPDATE_CURRENCY_OK') {
                        isUpdatingConfig.value = false;
                        this.currencyUpdateCallbacks.forEach((config) => {
                            config.callback();
                            this.handleHttpRequest(config.httpOptions, config.socketOptions);
                        });
                    } else if (payload.event === SocketEventEnum.CONFIG_UPDATE_PERIOD && payload.data === 'UPDATE_PERIOD_OK') {
                        isUpdatingConfig.value = false;
                        this.periodUpdateCallbacks.forEach((config) => {
                            config.callback();
                            this.handleHttpRequest(config.httpOptions, config.socketOptions);
                        });
                    } else if (this.requestedEvents.has(payload.event)) {
                        const callback = this.requestedEvents.get(payload.event)!;
                        if (!isUpdatingConfig.value) callback(payload.data);
                    }
                } catch (error) {
                    console.error('Error handling message', error);
                }
            });
        },
        async request<T>(httpOptions: HttpOptions) {
            const { routeName } = httpOptions;
            const currencyStore = useCurrencyStore();
            const appStore = useAppStore();

            let query = {
                currency: currencyStore.selectedCurrency.symbol!,
                period: appStore.selectedPeriod.valueOf()
            };
            if (httpOptions?.queryParams) query = { ...query, ...httpOptions.queryParams };

            const response = await useRequest<T>(routeName, { query, method: 'GET' });
            return response;
        },
        async addEvent<T>(httpOptions: HttpOptions | null, socketOptions: SocketOptions | null, callback: (data: T, otherParam?: string) => void) {
            if (!socketOptions) {
                if (httpOptions) {
                    const response = await useRequest<T>(httpOptions.routeName, { query: httpOptions.queryParams, method: 'GET' });
                    callback(response);
                }
            } else {
                if (!this.requestedEvents.has(socketOptions.eventName)) {
                    this.requestedEvents.set(socketOptions.eventName, callback as (data: unknown, otherParam?: string) => void);

                    await this.handleHttpRequest(httpOptions, socketOptions);
                    this.send(socketOptions);
                }
            }
        }
    }
});
