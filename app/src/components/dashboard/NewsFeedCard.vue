<template>
    <AppModal v-model="isNewsDetailOpened">
        <template #title>{{ selectedNews.title }}</template>
        <template #content>
            <div class="flex flex-col gap-8">
                <div class="flex flex-col gap-4">
                    <div class="flex items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <AppImage :name="selectedNews.image" :key="selectedNews.source" size="45" class="rounded-full shadow-lg" />
                            <span class="font-bold text-title text-xl">{{ capitalize(selectedNews.source) }}</span>
                        </div>
                        <div class="flex items-center gap-3 rounded-lg border py-2 px-3 text-sm font-semibold" :class="isBullish ? 'border-active text-active' : 'border-inactive text-inactive'">
                            <AppIcon :name="isBullish ? IconEnum.ARROW_RIGHT_UP : IconEnum.ARROW_RIGHT_DOWN" size="10" />
                            <span>{{ isBullish ? 'Bullish' : 'Bearish' }}</span>
                        </div>
                    </div>
                    <div class="flex flex-col text-title/80 text-sm">
                        <span>Date : {{ selectedNews.date }}</span>
                        <span>Author : {{ selectedNews.author }}</span>
                        <span>Website : <a :href="selectedNews.link" class="hover:underline" target="_blank">{{ selectedNews.link }}</a></span>
                    </div>
                </div>
                <p class="text-lg text-title scrollbar overflow-y-auto overflow-x-hidden max-h-[250px]">{{ selectedNews.content }}</p>
            </div>
        </template>
    </AppModal>
    <AppContainer class="!px-4 !py-5">
        <h2 class="px-3 text-2xl text-title font-bold">News Feed</h2>
        <div v-if="selectedCurrency.name && !isUpdatingConfig" class="flex flex-col gap-3 overflow-y-auto overflow-x-hidden scrollbar max-h-[calc(100vh-100px)]" ref="newsFeedPosts">
            <NewsPost v-for="(news, newsId) in newsList" :key="newsId" :sentiment="news.sentiment" :date="news.date" :source="news.source" :image="news.image" :title="news.title" @click="selectNews(news)" />
        </div>
        <AppLoader v-else class="self-center stroke-subtitle" size="35" />
    </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import AppModal from '@/components/AppModal.vue';
import { useCurrencyStore } from '@/stores/currencyStore';
import { storeToRefs } from 'pinia';
import AppLoader from '@/components/AppLoader.vue';
import NewsPost from '@/components/dashboard/NewsPost.vue';
import { computed, onMounted, reactive, ref } from 'vue';
import type { News } from '@/interfaces/News';
import { capitalize } from '@/utils/formatString';
import AppImage from '@/components/AppImage.vue';
import AppIcon from '@/components/AppIcon.vue';
import { IconEnum } from '@/enums/IconEnum';
import { useAutoAnimate } from '@formkit/auto-animate/vue';
import type { HttpOptions } from '@/interfaces/HttpOptions';
import { HttpRouteEnum } from '@/enums/HttpRouteEnum';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { SocketEventEnum } from '@/enums/SocketEventEnum';
import { useFetchData } from '@/composables/useFetchData';
import { useAppStore } from '@/stores/appStore';
import { useSocketStore } from '@/stores/socketStore';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const appStore = useAppStore();
const { isUpdatingConfig } = storeToRefs(appStore);

const [newsFeedPosts] = useAutoAnimate();

const newsList = ref<News[]>([]);

const updateNews = (data: News[]) => {
    if (!data.length) return;
    newsList.value = data;
};

const isNewsDetailOpened = ref(false);
const selectedNews = reactive<News>({
    source: '',
    sentiment: 0,
    title: '',
    date: '',
    content: '',
    author: '',
    link: '',
    image: ''
});

const isBullish = computed(() => selectedNews.sentiment >= 50);

const selectNews = (news: News) => {
    Object.assign(selectedNews, news);
    isNewsDetailOpened.value = true;
};

onMounted(() => {
    const httpOptions: HttpOptions = {
        routeName: HttpRouteEnum.CRYPTO_GET_CURRENCY_NEWS
    };
    const socketOptions: SocketOptions = {
        eventName: SocketEventEnum.CRYPTO_GET_CURRENCY_NEWS
    };
    useFetchData(httpOptions, socketOptions, (data: unknown) => {
        updateNews(data as News[]);
    });

    const socketStore = useSocketStore();
    const updateDataCallback = () => {
        newsList.value = [];
    };

    socketStore.onCurrencyUpdate(updateDataCallback, httpOptions, socketOptions);
    socketStore.onPeriodUpdate(updateDataCallback, httpOptions, socketOptions);
});
</script>
