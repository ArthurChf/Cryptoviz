<template>
    <AppContainer class="h-auto max-h-[295px] overflow-hidden">
        <h2 class="text-2xl text-title font-bold">Fear & Greed</h2>
        <FearGreedChart v-if="selectedCurrency.name || isUpdatingConfig" />
        <AppLoader v-else class="self-center stroke-subtitle" size="35" />
    </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import { useCurrencyStore } from '@/stores/currencyStore';
import { storeToRefs } from 'pinia';
import AppLoader from '@/components/AppLoader.vue';
import FearGreedChart from '@/components/dashboard/FearGreedChart.vue';
import { useAppStore } from '@/stores/appStore';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const appStore = useAppStore();
const { isUpdatingConfig } = storeToRefs(appStore);
</script>
