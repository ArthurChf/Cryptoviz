<template>
    <AppContainer>
        <div class="flex items-center justify-between gap-4 flex-wrap">
            <h2 class="text-2xl text-title font-bold">Price Trend</h2>
            <AppPeriodSelector v-if="selectedCurrency.name" />
        </div>
        <PriceTrendChart v-if="selectedCurrency.name && !isUpdatingConfig" />
        <AppLoader v-else class="self-center stroke-subtitle" size="35" />
    </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import AppPeriodSelector from '@/components/AppPeriodSelector.vue';
import { useCurrencyStore } from '@/stores/currencyStore';
import { storeToRefs } from 'pinia';
import AppLoader from '@/components/AppLoader.vue';
import PriceTrendChart from '@/components/dashboard/PriceTrendChart.vue';
import { useAppStore } from '@/stores/appStore';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const appStore = useAppStore();
const { isUpdatingConfig } = storeToRefs(appStore);
</script>
