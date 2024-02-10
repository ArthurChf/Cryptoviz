<template>
    <AppContainer class="gap-8">
        <h2 class="text-2xl text-title font-bold">Trending Currencies</h2>
        <div v-if="selectedCurrency.name" class="flex flex-col gap-8">
            <div class="flex gap-5 items-center" v-for="currency in trendingCurrencies">
                <div class="w-[57px] h-[50px]">
                    <Transition :name="TransitionEnum.FADE" mode="out-in">
                        <AppImage :name="currency.image" size="50" :key="currency.image" />
                    </Transition>
                </div>
                <div class="flex flex-col gap-3 w-full">
                    <div class="flex flex-wrap items-center justify-between gap-x-6">
                        <div class="flex items-center gap-3 h-[29px]">
                            <Transition :name="TransitionEnum.FADE" mode="out-in">
                                <span class="text-xl text-title font-semibold" :key="currency.name">{{ currency.name }}</span>
                            </Transition>
                            <Transition :name="TransitionEnum.FADE" mode="out-in">
                                <span class="text-sm mt-1 text-subtitle/80 font-semibold" :key="currency.symbol">{{ currency.symbol }}</span>
                            </Transition>
                        </div>
                        <Transition :name="TransitionEnum.FADE" mode="out-in">
                            <span class="text-sm text-title font-semibold" :key="currency.articlesRate">{{ currency.articlesRate }}%</span>
                        </Transition>
                    </div>
                    <div class="relative flex items-stretch h-[5px] bg-subtitle/5 rounded-full overflow-hidden">
                        <div class="bg-active rounded-full" :style="{ 'width': `${currency.articlesRate}%`, 'transition': '0.5s width ease-in-out', 'will-change': 'width' }"></div>
                    </div>
                </div>
            </div>
        </div>
        <AppLoader v-else class="self-center stroke-subtitle" size="35" />
    </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import AppImage from '@/components/AppImage.vue';
import { TransitionEnum } from '@/enums/TransitionEnum';
import { useCurrencyStore } from '@/stores/currencyStore';
import { storeToRefs } from 'pinia';
import type { NewsTrendingCurrency } from '@/interfaces/NewsTrendingCurrency';
import { ref } from 'vue';
import AppLoader from '@/components/AppLoader.vue';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const trendingCurrencies = ref<NewsTrendingCurrency[]>([
    {
        image: 'currencies/btc.webp',
        name: 'Bitcoin',
        symbol: 'BTC',
        articlesRate: 78
    },
    {
        image: 'currencies/eth.webp',
        name: 'Ethereum',
        symbol: 'ETH',
        articlesRate: 43
    },
    {
        image: 'currencies/matic.webp',
        name: 'Polygon',
        symbol: 'MATIC',
        articlesRate: 32
    }
]);

const updateData = () => {
    const newData = [
        {
            image: 'currencies/matic.webp',
            name: 'Polygon',
            symbol: 'MATIC',
            articlesRate: 12
        }
    ];
    newData.forEach((crypto, index) => {
        const obj: NewsTrendingCurrency = {
            image: crypto.image,
            name: crypto.name,
            symbol: crypto.symbol,
            articlesRate: crypto.articlesRate
        };

        if (index > trendingCurrencies.value.length - 1) {
            trendingCurrencies.value.push(obj);
        } else {
            trendingCurrencies.value[index]!.image = obj.image;
            trendingCurrencies.value[index]!.name = obj.name;
            trendingCurrencies.value[index]!.symbol = obj.symbol;
            trendingCurrencies.value[index]!.articlesRate = obj.articlesRate;
        }
    });
};
</script>
