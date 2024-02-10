<template>
    <AppContainer class="!p-0 gap-6 overflow-hidden">
        <h2 class="mx-7 mt-6 text-2xl text-title font-bold">News Feed</h2>
        <div v-if="selectedCurrency.name" class="flex flex-col" ref="newsFeedPosts">
            <NewsPost v-for="news in newsList" :key="news.id" :news="news" />
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
import { ref } from 'vue';
import type { News } from '@/interfaces/News';
import { useAutoAnimate } from '@formkit/auto-animate/vue';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

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
};
</script>
