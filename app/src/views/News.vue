<template>
    <div class="flex flex-col-reverse 2xl:flex-row w-full p-10 gap-6">
        <div class="w-full 2xl:w-[70%]">
            <NewsFeed />
        </div>
        <div class="2xl:sticky 2xl:top-10 h-fit flex-1">
            <TrendingCurrencies />
        </div>
    </div>
</template>

<script setup lang="ts">
import NewsFeed from '@/components/news/NewsFeed.vue';
import TrendingCurrencies from '@/components/news/TrendingCurrencies.vue';
</script>
