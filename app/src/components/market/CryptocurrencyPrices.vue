<template>
    <AppContainer>
        <h2 class="text-2xl text-title font-bold">Live Prices</h2>
        <div class="self-end w-full md:w-8/12 lg:w-6/12 xl:w-4/12 2xl:w-3/12 mb-7">
            <AppSearchbar v-model="searchCurrency" placeholder="Search Cryptocurrency" tooltip-position="top" />
        </div>
        <CryptocurrencyPricesTable v-if="selectedCurrency.name" :search="searchCurrency" />
        <AppLoader v-else class="self-center stroke-subtitle" size="35" />
    </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import { useCurrencyStore } from '@/stores/currencyStore';
import { storeToRefs } from 'pinia';
import AppLoader from '@/components/AppLoader.vue';
import CryptocurrencyPricesTable from '@/components/market/CryptocurrencyPricesTable.vue';
import { ref } from 'vue';
import AppSearchbar from '@/components/AppSearchbar.vue';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const searchCurrency = ref('');
</script>
