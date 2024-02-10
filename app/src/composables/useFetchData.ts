import type { HttpOptions } from '@/interfaces/HttpOptions';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { useSocketStore } from '@/stores/socketStore';

export const useFetchData = async <T>(httpOptions: HttpOptions | null, socketOptions: SocketOptions, callback: (data: T) => void): Promise<void> => {
    const socketStore = useSocketStore();
    try {
        await socketStore.waitSocketConnection();
        await socketStore.addEvent<T>(httpOptions, socketOptions, callback);
        socketStore.init();
    } catch (e) {
        console.log(e);
    }
};
