import { useEnv } from '@/composables/useEnv';

export const createSocket = () => {
    const env = useEnv();
    const ws = new WebSocket(env.API_WS_URL);
    return ws;
};
