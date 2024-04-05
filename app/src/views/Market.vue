<template>
    <div class="flex flex-col gap-[24px] w-full p-[40px] overflow-hidden">
        <TopCurrenciesCard />
        <CryptocurrencyPrices />
    </div>
</template>


<script setup lang="ts">
import TopCurrenciesCard from '@/components/market/TopCurrenciesCard.vue';
import CryptocurrencyPrices from '@/components/market/CryptocurrencyPrices.vue';
</script>
