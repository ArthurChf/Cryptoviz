import type { HttpOptions } from '@/interfaces/HttpOptions';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { useSocketStore } from '@/stores/socketStore';
import { isDemoEnv } from '@/composables/useEnv';
import { useMock } from '@/composables/useMock';

export const useFetchData = async (httpOptions: HttpOptions | null, socketOptions: SocketOptions | null, callback: (data: unknown, otherParam?: string) => void): Promise<void> => {
    if (isDemoEnv) {
        useMock(httpOptions, socketOptions, callback);
    } else {
        const socketStore = useSocketStore();
        try {
            await socketStore.init();
            await socketStore.addEvent(httpOptions, socketOptions, callback);
        } catch (e) {
            console.log(e);
        }
    }
};
