<template>
    <AppContainer class="gap-7">
        <h2 class="text-2xl text-title font-bold">Top Currencies</h2>
        <div v-if="selectedCurrency.name && !isUpdatingConfig" class="grid grid-cols-1 md:grid-cols-3 gap-4 xl:gap-7">
            <TopCurrencyCard v-for="(currency, index) in topCurrencies" :key="currency.symbol" :currency="currency" :index="index + 1" />
        </div>
        <AppLoader v-else class="self-center stroke-subtitle" size="35" />
    </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import { useCurrencyStore } from '@/stores/currencyStore';
import { storeToRefs } from 'pinia';
import AppLoader from '@/components/AppLoader.vue';
import TopCurrencyCard from '@/components/market/TopCurrency.vue';
import { onMounted, ref } from 'vue';
import type { TopCurrency } from '@/interfaces/TopCurrency';
import { useFetchData } from '@/composables/useFetchData';
import type { HttpOptions } from '@/interfaces/HttpOptions';
import { HttpRouteEnum } from '@/enums/HttpRouteEnum';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { SocketEventEnum } from '@/enums/SocketEventEnum';
import { useAppStore } from '@/stores/appStore';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const appStore = useAppStore();
const { isUpdatingConfig } = storeToRefs(appStore);

const topCurrencies = ref<TopCurrency[]>([]);

onMounted(() => {
    const httpOptions: HttpOptions = {
        routeName: HttpRouteEnum.CRYPTO_GET_TOP_CURRENCIES
    };
    const socketOptions: SocketOptions = {
        eventName: SocketEventEnum.CRYPTO_GET_TOP_CURRENCIES
    };
    useFetchData(httpOptions, socketOptions, (data: unknown) => {
        topCurrencies.value = data as TopCurrency[];
    });
});
</script>
