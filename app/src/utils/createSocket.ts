export const createSocket = () => {
    const ws = new WebSocket('ws://localhost:8083');
    return ws;
};
