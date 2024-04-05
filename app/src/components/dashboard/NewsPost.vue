<template>
    <div class="flex flex-col gap-3 bg-background py-4 px-5 rounded-xl cursor-pointer transition duration-200 border-2 border-background hover:bg-background/40 hover:border-subtitle/5">
        <div class="flex flex-col gap-2">
            <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                    <AppImage :name="image" class="w-[28px] rounded-full shadow-lg" />
                    <AppTooltip :text="capitalize(source)" position="bottom" :show="isSourceTruncated">
                        <span class="font-bold text-title text-md">{{ formatSource(source) }}</span>
                    </AppTooltip>
                </div>
                <div class="flex items-center gap-2 rounded-lg border py-1 px-2 text-xs font-semibold" :class="isBullish ? 'border-active text-active' : 'border-inactive text-inactive'">
                    <AppIcon :name="isBullish ? IconEnum.ARROW_RIGHT_UP : IconEnum.ARROW_RIGHT_DOWN" size="8" />
                    <span>{{ isBullish ? 'Bullish' : 'Bearish' }}</span>
                </div>
            </div>
            <span class="text-xs font-light text-subtitle">{{ date }}</span>
        </div>
        <h3 class="text-md text-title">{{ title }}</h3>
    </div>
</template>

<script setup lang="ts">
import AppImage from '@/components/AppImage.vue';
import AppTooltip from '@/components/AppTooltip.vue';
import AppIcon from '@/components/AppIcon.vue';
import { computed } from 'vue';
import { IconEnum } from '@/enums/IconEnum';
import { capitalize, truncate } from '@/utils/formatString';

const props = defineProps<{
    source: string;
    image: string;
    sentiment: number;
    title: string;
    date: string;
}>();

const isBullish = computed(() => props.sentiment >= 50);

const maxSourceLength = 14;
const isSourceTruncated = computed(() => props.source.length > maxSourceLength);
const formatSource = (source: string) => {
    return capitalize(truncate(source, maxSourceLength));
};
</script>
