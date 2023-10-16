<template>
    <div class="flex scrollbar flex-nowrap bg-slate-950 text-slate-400 border-b-2 border-slate-800 items-center gap-3">
        <AppSelect :loading="itemsLoading" :items="currencyItems" @update="searchCurrency" class="inline-flex border-r-2 border-slate-800" />
        <AppPeriodSelector />
    </div>
</template>

<script setup lang="ts">
import AppSelect from '@components/AppSelect.vue';
import AppPeriodSelector from '@components/AppPeriodSelector.vue';
import type { CurrencyInterface } from '@interfaces/CurrencyInterface';
import { ref } from 'vue';

const itemsLoading = ref(false);

const currencyItems: CurrencyInterface[] = [
    { name: 'Bitcoin', symbol: 'BTC' },
    { name: 'Ethereum', symbol: 'ETH' },
    { name: 'Ripple', symbol: 'XRP' },
    { name: 'Polygon', symbol: 'MATIC' }
];

const searchCurrency = async (value: string): Promise<void> => {
    itemsLoading.value = true;
    // route get currencies by search value
    // itemsLoading.value = false;
};
</script>
