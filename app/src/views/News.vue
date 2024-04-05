<template>
    <div class="flex w-full p-10 gap-6">
        <div class="w-[70%]">
            <NewsFeed />
        </div>
        <div class="sticky top-10 h-fit flex-1">
            <TrendingCurrencies />
        </div>
    </div>
</template>

<script setup lang="ts">
import NewsFeed from '@/components/news/NewsFeed.vue';
import TrendingCurrencies from '@/components/news/TrendingCurrencies.vue';
</script>
