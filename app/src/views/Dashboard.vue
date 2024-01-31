<template>
    <div class="flex gap-6 w-full p-10">
        <div class="w-9/12 flex flex-col gap-6">
            <AppContainer>
                <div class="flex gap-8 justify-between flex-wrap">
                    <div class="flex flex-col gap-2">
                        <div class="group cursor-pointer inline-flex w-fit items-center">
                            <div class="flex items-center gap-3">
                                <h1 class="text-title font-bold text-2xl group-hover:text-title/80 transition duration-200">Bitcoin</h1>
                                <span class="text-subtitle text-sm font-medium mt-1 group-hover:text-subtitle/80 transition duration-200">BTC</span>
                            </div>
                            <AppIcon :name="IconEnum.ARROW_DOWN" size="32" color="text-title/90 group-hover:text-title/70 transition duration-200" />
                        </div>
                        <div class="flex items-center gap-4">
                            <Transition :name="TransitionEnum.FADE_SLIDE" mode="out-in">
                                <span class="text-subtitle text-4xl font-bold" :key="currencyValue">{{ currencyValue }}</span>
                            </Transition>
                            <Transition :name="TransitionEnum.FADE" mode="out-in">
                                <span class="flex items-center gap-1 border border-1 rounded-2xl font-bold text-sm px-2 py-1 mt-1" :class="[currencyGrowthRate >= 0 ? 'border-active text-active' : 'border-inactive text-inactive']" :key="currencyGrowthRate"><AppIcon size="17" :name="currencyGrowthRate >= 0 ? IconEnum.ARROW_RIGHT_UP : IconEnum.ARROW_RIGHT_DOWN" /> {{ currencyGrowthRate }} %</span>
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
            <AppContainer>2</AppContainer>
            <AppContainer>3</AppContainer>
        </div>
        <div class="flex flex-col gap-6 flex-1">
            <AppContainer>1</AppContainer>
            <AppContainer>2</AppContainer>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import AppIcon from '@/components/AppIcon.vue';
import { IconEnum } from '@/enums/IconEnum';
import { TransitionEnum } from '@/enums/TransitionEnum';
import { ref } from 'vue';

const currencyValue = ref('1,077.83 €');
const currencyGrowthRate = ref(1.47);

const statItems = ref([
    {
        title: 'All-Time High (ATH)',
        value: '1,232.13 €'
    },
    {
        title: 'Total trades',
        value: '1,239'
    },
    {
        title: 'All-Time Low (ATL)',
        value: '734.38 €'
    },
    {
        title: 'Volume',
        value: '4,532,289.44'
    }
]);
</script>