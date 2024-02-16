import type { HttpOptions } from '@/interfaces/HttpOptions';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { useSocketStore } from '@/stores/socketStore';

export const useFetchData = async <T>(httpOptions: HttpOptions | null, socketOptions: SocketOptions | null, callback: (data: T, otherParam?: string) => void): Promise<void> => {
    const socketStore = useSocketStore();
    try {
        await socketStore.init();
        await socketStore.addEvent<T>(httpOptions, socketOptions, callback);
    } catch (e) {
        console.log(e);
    }
};
