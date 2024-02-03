<template>
    <AppContainer>
        <div class="flex gap-8 justify-between flex-wrap">
            <div class="flex flex-col gap-3">
                <div class="group cursor-pointer inline-flex w-fit items-center">
                    <AppTooltip text="Select a currency" position="right">
                        <div class="flex items-center gap-3">
                            <AppImage size="30" :name="selectedCurrency.image" />
                            <h1 class="font-bold text-2xl transition duration-200" :class="selectedCurrency.name ? 'text-title group-hover:text-title/80' : 'text-subtitle/80 group-hover:text-subtitle/60'">{{ selectedCurrency.name ? selectedCurrency.name : 'Select currency' }}</h1>
                            <span v-if="selectedCurrency.symbol" class="text-sm font-medium mt-1 transition duration-200 text-subtitle group-hover:text-subtitle/80">{{ selectedCurrency.symbol }}</span>
                            <AppIcon :name="IconEnum.ARROW_DOWN" size="20" class="transition duration-200" :class="selectedCurrency.name ? 'text-title/90 group-hover:text-title/70' : 'text-subtitle/70 group-hover:text-subtitle/50'" />
                        </div>
                    </AppTooltip>
                </div>
                <div class="flex items-center gap-4">
                    <Transition :name="TransitionEnum.FADE_SLIDE" mode="out-in">
                        <span v-if="selectedCurrency.name" class="text-subtitle text-4xl font-bold" :key="currencyValue">{{ currencyValue }}</span>
                    </Transition>
                    <Transition :name="TransitionEnum.FADE" mode="out-in">
                        <span v-if="selectedCurrency.name" class="flex items-center gap-1 border border-1 rounded-2xl font-bold text-sm px-2 py-1 mt-1" :class="[currencyGrowthRate >= 0 ? 'border-active text-active' : 'border-inactive text-inactive']" :key="currencyGrowthRate"><AppIcon size="17" :name="currencyGrowthRate >= 0 ? IconEnum.ARROW_RIGHT_UP : IconEnum.ARROW_RIGHT_DOWN" /> {{ currencyGrowthRate }} %</span>
                    </Transition>
                </div>
            </div>
            <div class="flex items-center gap-16">
                <div class="flex flex-col gap-2" v-for="item in statItems">
                    <h3 class="text-sm text-title font-semibold">{{ item.title }}</h3>
                    <Transition :name="TransitionEnum.FADE_SLIDE" mode="out-in">
                        <span class="text-xl font-semibold text-subtitle" :key="item.value">{{ item.value }}</span>
                    </Transition>
                </div>
            </div>
        </div>
    </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import AppIcon from '@/components/AppIcon.vue';
import AppTooltip from '@/components/AppTooltip.vue';
import { IconEnum } from '@/enums/IconEnum';
import { TransitionEnum } from '@/enums/TransitionEnum';
import { ref } from 'vue';
import AppImage from '@/components/AppImage.vue';
import { storeToRefs } from 'pinia';
import { useCurrencyStore } from '@/stores/currencyStore';

const currencyStore = useCurrencyStore();
const { getSelectedCurrency: selectedCurrency } = storeToRefs(currencyStore);

const currencyValue = ref('1,077.83 €');
const currencyGrowthRate = ref(1.47);

const statItems = ref([
    {
        title: 'All-Time High (ATH)',
        value: '-'
    },
    {
        title: 'Total trades',
        value: '-'
    },
    {
        title: 'All-Time Low (ATL)',
        value: '-'
    },
    {
        title: 'Volume',
        value: '-'
    }
]);
</script>
