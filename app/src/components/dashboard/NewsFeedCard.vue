<template>
    <AppContainer class="!px-4 !py-5">
        <h2 class="px-3 text-2xl text-title font-bold">News Feed</h2>
        <div v-if="selectedCurrency.name" class="flex flex-col gap-3 overflow-y-auto overflow-x-hidden scrollbar max-h-[calc(100vh-100px)]">
            <NewsPost v-for="news in newsList" :key="news.id" :sentiment="news.sentiment" :date="news.date" :source="news.source" :title="news.title" />
        </div>
        <AppLoader v-else class="self-center stroke-subtitle" size="35" />
    </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import { useCurrencyStore } from '@/stores/currencyStore';
import { storeToRefs } from 'pinia';
import AppLoader from '@/components/AppLoader.vue';
import NewsPost from '@/components/dashboard/NewsPost.vue';
import { ref } from 'vue';
import type { News } from '@/interfaces/News';

const currencyStore = useCurrencyStore();
const { getSelectedCurrency: selectedCurrency } = storeToRefs(currencyStore);

const newsList = ref<News[]>([
    {
        id: '1',
        source: 'coinjournal',
        sentiment: 56,
        title: 'Lorem ipsum dolor sit amet',
        date: 'February 02, 2024 at 09:43 PM',
        content: 'Test contenu',
        author: 'Mrs Jones',
        link: 'http://google.fr'
    },
    {
        id: '2',
        source: 'cryptopotato',
        sentiment: 12,
        title: 'Lorem ipsum dolor sit amet',
        date: 'February 04, 2024 at 12:08 AM',
        content: 'Test contenu',
        author: 'Mrs Jones',
        link: 'http://google.fr'
    },
    {
        id: '3',
        source: 'ethereumworldnews',
        sentiment: 12,
        title: 'Lorem ipsum dolor sit amet',
        date: 'February 04, 2024 at 12:08 AM',
        content: 'Test contenu',
        author: 'Mrs Jones',
        link: 'http://google.fr'
    },
    {
        id: '4',
        source: 'cryptopolitan',
        sentiment: 12,
        title: 'Lorem ipsum dolor sit amet',
        date: 'February 04, 2024 at 12:08 AM',
        content: 'Test contenu',
        author: 'Mrs Jones',
        link: 'http://google.fr'
    },
    {
        id: '5',
        source: 'cryptoslate',
        sentiment: 12,
        title: 'Lorem ipsum dolor sit amet',
        date: 'February 04, 2024 at 12:08 AM',
        content: 'Test contenu',
        author: 'Mrs Jones',
        link: 'http://google.fr'
    }
]);

</script>
