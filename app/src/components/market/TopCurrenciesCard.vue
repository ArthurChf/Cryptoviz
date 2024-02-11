<template>
    <AppContainer class="gap-7">
        <h2 class="text-2xl text-title font-bold">Top Currencies</h2>
        <div v-if="selectedCurrency.name" class="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-7">
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
import { ref } from 'vue';
import type { TopCurrency } from '@/interfaces/TopCurrency';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const topCurrencies = ref<TopCurrency[]>([
    {
        image: 'currencies/btc.webp',
        name: 'Bitcoin',
        symbol: 'BTC',
        data: {
            priceChangeRate: '1.33%',
            price: '$1500',
            volume: '2M'
        }
    },
    {
        image: 'currencies/eth.webp',
        name: 'Ethereum',
        symbol: 'ETH',
        data: {
            priceChangeRate: '-0.54%',
            price: '$6',
            volume: '1K'
        }
    },
    {
        image: 'currencies/matic.webp',
        name: 'Polygon',
        symbol: 'MATIC',
        data: {
            priceChangeRate: '3.72%',
            price: '$2',
            volume: '5K'
        }
    }
]);
</script>
