<template>
    <div class="flex flex-col gap-7 bg-background py-8 px-9 rounded-xl">
        <div class="flex gap-4 justify-between">
            <div class="flex gap-5 items-center">
                <AppImage :name="currency.image" size="65" class="rounded-full shadow-[#000] shadow-md" />
                <div class="flex flex-col gap-1">
                    <Transition mode="out-in" :name="TransitionEnum.FADE_SLIDE">
                        <AppTooltip :text="currency.name" position="top" :show="isCurrencyNameTruncated">
                            <h3 class="text-3xl font-bold text-title" :key="currency.name">{{ formatCurrencyName(currency.name) }}</h3>
                        </AppTooltip>
                    </Transition>
                    <Transition mode="out-in" :name="TransitionEnum.FADE_SLIDE">
                        <span class="text-subtitle font-semibold text-xl" :key="currency.symbol">{{ currency.symbol }}</span>
                    </Transition>
                </div>
            </div>
            <span class="text-md font-semibold shadow-md self-start bg-title/5 text-title px-2 py-1 rounded-xl border border-subtitle/5">#{{ index }}</span>
        </div>
        <div class="grid grid-cols-3">
            <div class="flex flex-col gap-2">
                <h4 class="text-title text-md font-semibold">Price</h4>
                <Transition mode="out-in" :name="TransitionEnum.FADE">
                    <span class="text-subtitle font-semibold" :key="currency.data.price">{{ currency.data.price }}</span>
                </Transition>
            </div>
            <div class="flex flex-col gap-2">
                <h4 class="text-title text-md font-semibold">24h Price Change</h4>
                <Transition mode="out-in" :name="TransitionEnum.FADE">
                    <span class="text-subtitle font-semibold" :key="currency.data.priceChangeRate">{{ currency.data.priceChangeRate }}</span>
                </Transition>
            </div>
            <div class="flex flex-col gap-2 items-end">
                <h4 class="text-title text-md font-semibold">Volume</h4>
                <Transition mode="out-in" :name="TransitionEnum.FADE">
                    <span class="text-subtitle font-semibold" :key="currency.data.volume">{{ currency.data.volume }}</span>
                </Transition>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppImage from '@/components/AppImage.vue';
import AppTooltip from '@/components/AppTooltip.vue';
import { TransitionEnum } from '@/enums/TransitionEnum';
import { computed } from 'vue';
import type { TopCurrency } from '@/interfaces/TopCurrency';
import { truncate } from '@/utils/formatString';

const props = defineProps<{
    currency: TopCurrency;
    index: number;
}>();

const maxCurrencyNameLength = 14;
const isCurrencyNameTruncated = computed(() => props.currency.name.length > maxCurrencyNameLength);
const formatCurrencyName = (currency: string) => {
    return truncate(currency, maxCurrencyNameLength);
};
</script>
