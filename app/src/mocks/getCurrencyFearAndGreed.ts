import { ref } from 'vue';

export const getCurrencyFearAndGreed = (callback: (data: unknown, otherParam?: string) => void, reloadInterval: number) => {
    const data = ref([50, 49, 48, 51, 52, 54, 54, 51, 48, 52]);
    const currentRowIndex = ref(0);

    callback(data.value[currentRowIndex.value]);
    setInterval(() => {
        currentRowIndex.value = (currentRowIndex.value + 1) % data.value.length;
        callback(data.value[currentRowIndex.value]);
    }, reloadInterval);
};
