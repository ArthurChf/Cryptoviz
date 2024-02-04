<template>
    <AppModal v-model="isNewsDetailOpened">
        <template #title>{{ selectedNews.title }}</template>
        <template #content>
            <div class="flex flex-col gap-8">
                <div class="flex flex-col gap-4">
                    <div class="flex items-center justify-between gap-4">
                        <div class="flex items-center gap-4">
                            <AppImage :name="`news_sources/${selectedNews.source}.webp`" size="45" class="rounded-full shadow-lg" />
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
        <div v-if="selectedCurrency.name" class="flex flex-col gap-3 overflow-y-auto overflow-x-hidden scrollbar max-h-[calc(100vh-100px)]" ref="newsFeedPosts">
            <NewsPost v-for="news in newsList" :key="news.id" :sentiment="news.sentiment" :date="news.date" :source="news.source" :title="news.title" @click="selectNews(news)" />
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
import { computed, reactive, ref } from 'vue';
import type { News } from '@/interfaces/News';
import { capitalize } from '@/utils/formatString';
import AppImage from '@/components/AppImage.vue';
import AppIcon from '@/components/AppIcon.vue';
import { IconEnum } from '@/enums/IconEnum';
import { useAutoAnimate } from '@formkit/auto-animate/vue';

const currencyStore = useCurrencyStore();
const { getSelectedCurrency: selectedCurrency } = storeToRefs(currencyStore);

const [newsFeedPosts] = useAutoAnimate();

const newsList = ref<News[]>([
    {
        id: '1',
        source: 'coinjournal',
        sentiment: 56,
        title: `This title is too long but I don't really care because it is well handled by my Vue app`,
        date: 'February 02, 2024 at 09:43 PM',
        content: `MCADE token has good utilities: 1. Staking 2. Tournament entry 3. Platform, governance. Hopefully more to come from the team, CEO promises to marketing. Although most projects don't get three attempts to launch something correctly. Reson for flat price could be lack of Merkl tree and MEV bots. Launch was done wrong but I'm still bullish and hodl 2M MCADE$MCADE. 🚀 New Partnership Announcement 🚀 Calling all #TCG fans!☎️ Metacade welcomes @PlayEldarune , a browser-based trading card game with easy-to-learn mechanics and epic fantasy battles!💥 Prepare to unleash your inner hero! ⚔️ ➡️ Check out the battlefield:   t.co/iYt7CRHGix 📲Explor`,
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


const lastId = ref(1245);
const maxDisplayedNews = 30;

const appendNews = () => {
    newsList.value.unshift({
        id: `${lastId.value++}`,
        source: 'cryptoslate',
        sentiment: 12,
        title: 'Lorem ipsum dolor sit amet',
        date: 'February 04, 2024 at 12:08 AM',
        content: 'Test contenu',
        author: 'Mrs Jones',
        link: 'http://google.fr'
    });
    if (newsList.value.length === maxDisplayedNews + 1) newsList.value.pop();
};

const isNewsDetailOpened = ref(false);
const selectedNews = reactive<News>({
    id: '',
    source: '',
    sentiment: 0,
    title: '',
    date: '',
    content: '',
    author: '',
    link: ''
});

const isBullish = computed(() => selectedNews.sentiment >= 50);

const selectNews = (news: News) => {
    Object.assign(selectedNews, news);
    isNewsDetailOpened.value = true;
};
</script>
