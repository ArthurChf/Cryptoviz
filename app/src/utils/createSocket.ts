import { useEnv, isDemoEnv } from '@/composables/useEnv';

export const createSocket = () => {
    if (isDemoEnv) return;
    const env = useEnv();
    const ws = new WebSocket(env.API_WS_URL);
    return ws;
};
