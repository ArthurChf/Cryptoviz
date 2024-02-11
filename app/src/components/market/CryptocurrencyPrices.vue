<template>
    <AppContainer class="gap-9">
        <h2 class="text-2xl text-title font-bold">Live Prices</h2>
        <CryptocurrencyPricesTable v-if="selectedCurrency.name" />
        <AppLoader v-else class="self-center stroke-subtitle" size="35" />
    </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import { useCurrencyStore } from '@/stores/currencyStore';
import { storeToRefs } from 'pinia';
import AppLoader from '@/components/AppLoader.vue';
import CryptocurrencyPricesTable from '@/components/market/CryptocurrencyPricesTable.vue';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);
</script>
