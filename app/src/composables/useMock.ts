import { HttpRouteEnum } from '@/enums/HttpRouteEnum';
import type { HttpOptions } from '@/interfaces/HttpOptions';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { getCurrencyData } from '@/mocks/getCurrencyData';
import { getPriceTrend } from '@/mocks/getPriceTrend';
import { getCurrencyTransactions } from '@/mocks/getCurrencyTransactions';
import { useAppStore } from '@/stores/appStore';
import { getCurrencyFearAndGreed } from '@/mocks/getCurrencyFearAndGreed';
import { getNewsFeed } from '@/mocks/getNewsFeed';

export const useMock = (httpOptions: HttpOptions | null, socketOptions: SocketOptions | null, callback: (data: unknown, otherParam?: string) => void) => {
    const appStore = useAppStore();
    if (appStore.isUpdatingConfig) appStore.isUpdatingConfig = false;

    if (httpOptions?.routeName === HttpRouteEnum.CRYPTO_GET_CURRENCY_DATA) {
        getCurrencyData(callback, appStore.dataReloadInterval);
    } else if (httpOptions?.routeName === HttpRouteEnum.CRYPTO_GET_CURRENCY_PRICE_TREND) {
        getPriceTrend(callback, appStore.dataReloadInterval);
    } else if (httpOptions?.routeName === HttpRouteEnum.CRYPTO_GET_CURRENCY_TRANSACTIONS) {
        getCurrencyTransactions(callback, appStore.dataReloadInterval);
    } else if (httpOptions?.routeName === HttpRouteEnum.CRYPTO_GET_CURRENCY_FEAR_AND_GREED) {
        getCurrencyFearAndGreed(callback, appStore.dataReloadInterval);
    } else if (httpOptions?.routeName === HttpRouteEnum.CRYPTO_GET_ALL_CURRENCIES_NEWS || httpOptions?.routeName === HttpRouteEnum.CRYPTO_GET_CURRENCY_NEWS) {
        getNewsFeed(callback, appStore.dataReloadInterval);
    }
};
