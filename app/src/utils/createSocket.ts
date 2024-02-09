export const createSocket = () => {
    const ws = new WebSocket('ws://localhost:8080');
    return ws;
};
