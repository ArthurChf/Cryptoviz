export const useEnv = () => {
    return {
        API_URL: import.meta.env.VITE_API_URL as string,
        API_WS_URL: import.meta.env.VITE_API_WS_URL as string
    };
};
