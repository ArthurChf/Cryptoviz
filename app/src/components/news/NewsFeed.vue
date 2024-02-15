<template>
    <AppContainer class="!p-0 gap-6 overflow-hidden">
        <h2 class="mx-7 mt-6 text-2xl text-title font-bold">News Feed</h2>
        <div v-if="selectedCurrency.name" class="flex flex-col" ref="newsFeedPosts">
            <NewsPost v-for="(news, id) in newsList" :key="id" :news="news" />
        </div>
        <AppLoader v-else class="mx-7 mb-6 self-center stroke-subtitle" size="35" />
    </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import { useCurrencyStore } from '@/stores/currencyStore';
import { storeToRefs } from 'pinia';
import AppLoader from '@/components/AppLoader.vue';
import NewsPost from '@/components/news/NewsPost.vue';
import type { News } from '@/interfaces/News';
import { useAutoAnimate } from '@formkit/auto-animate/vue';
import { onMounted, ref } from 'vue';
import { useFetchData } from '@/composables/useFetchData';
import type { HttpOptions } from '@/interfaces/HttpOptions';
import { HttpRouteEnum } from '@/enums/HttpRouteEnum';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { SocketEventEnum } from '@/enums/SocketEventEnum';

const [newsFeedPosts] = useAutoAnimate();

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);
const newsList = ref<News[]>([]);

onMounted(() => {
    const httpOptions: HttpOptions = {
        routeName: HttpRouteEnum.CRYPTO_GET_ALL_CURRENCIES_NEWS
    };
    const socketOptions: SocketOptions = {
        eventName: SocketEventEnum.CRYPTO_GET_ALL_CURRENCIES_NEWS
    };
    useFetchData(httpOptions, socketOptions, (data: News[]) => {
        if (!data.length) return;
        newsList.value = data;
    });
});
</script>
