<template>
    <div class="flex flex-col gap-3 py-6 px-7 border-b border-subtitle/5 last:border-[transparent] transition duration-200 hover:bg-background/50">
        <div class="flex items-center justify-between gap-4">
            <div class="flex gap-4">
                <AppImage :name="news.image" size="40" class="rounded-full shadow-lg" />
                <div class="flex flex-col">
                    <div class="flex items-center gap-3">
                        <span class="bg-subtitle/10 text-title/70 border border-subtitle/20 px-1 text-xs rounded-full">{{ news.symbol?.toUpperCase() }}</span>
                        <AppTooltip :text="capitalize(news.source)" position="bottom" :show="isSourceTruncated">
                            <span class="font-bold text-title text-lg">{{ formatSource(news.source) }}</span>
                        </AppTooltip>
                    </div>
                    <span class="text-xs font-light text-subtitle">{{ news.date }}</span>
                </div>
            </div>
            <div class="flex items-center gap-2 rounded-lg border py-1 px-2 text-xs font-semibold" :class="isBullish ? 'border-active text-active' : 'border-inactive text-inactive'">
                <AppIcon :name="isBullish ? IconEnum.ARROW_RIGHT_UP : IconEnum.ARROW_RIGHT_DOWN" size="8" />
                <span>{{ isBullish ? 'Bullish' : 'Bearish' }}</span>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <h3 class="text-lg text-title font-semibold">{{ news.title }}</h3>
            <p class="text-md text-subtitle">
                {{ formatContent(news.content) }}
                <span class="text-title font-medium text-md cursor-pointer transition duration-200 hover:text-active" @click="revealAllContent" v-if="!isContentRevealed && isContentTruncated">View more</span>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppImage from '@/components/AppImage.vue';
import AppTooltip from '@/components/AppTooltip.vue';
import AppIcon from '@/components/AppIcon.vue';
import { computed, ref } from 'vue';
import { IconEnum } from '@/enums/IconEnum';
import { capitalize, truncate } from '@/utils/formatString';
import type { News } from '@/interfaces/News';

const props = defineProps<{
    news: News;
}>();

const isBullish = computed(() => props.news.sentiment >= 50);

const maxSourceLength = 50;
const isSourceTruncated = computed(() => props.news.source.length > maxSourceLength);
const formatSource = (source: string) => {
    return capitalize(truncate(source, maxSourceLength));
};

const isContentRevealed = ref(false);
const revealAllContent = () => {
    isContentRevealed.value = true;
};

const maxContentLength = 400;
const isContentTruncated = computed(() => props.news.content.length > maxContentLength);
const formatContent = (content: string) => {
    if (isContentRevealed.value) return content;
    return truncate(content, maxContentLength);
};
</script>
