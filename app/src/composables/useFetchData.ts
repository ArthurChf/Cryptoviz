import type { EventNameEnum } from '@/enums/EventNameEnum';
import { useSocketStore } from '@/stores/socketStore';

export const useFetchData = async (eventName: EventNameEnum, callback: <T>(data: T) => void): Promise<void> => {
    const socketStore = useSocketStore();
    try {
        await socketStore.waitSocketConnection();
        socketStore.addEvent(eventName, callback);
        socketStore.init();
    } catch (e) {
        console.log(e);
    }
};
