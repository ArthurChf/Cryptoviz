<template>
    <CurrencySelectionModal v-model="isCurrencySelectionModalOpened" />
    <AppContainer>
        <div class="flex gap-8 justify-between flex-wrap pr-4">
            <div class="flex flex-col gap-3">
                <div class="group cursor-pointer inline-flex w-fit items-center" @click="selectCurrency">
                    <AppTooltip text="Select a currency" position="right">
                        <div class="flex items-center gap-3">
                            <AppImage size="30" :name="selectedCurrency.image!" :key="selectedCurrency.image" />
                            <h1 class="font-bold text-2xl transition duration-200" :class="selectedCurrency.name ? 'text-title group-hover:text-title/80' : 'text-subtitle/80 group-hover:text-subtitle/60'">{{ selectedCurrency.name ? selectedCurrency.name : 'Select currency' }}</h1>
                            <span v-if="selectedCurrency.symbol" class="text-sm font-medium mt-1 transition duration-200 text-subtitle group-hover:text-subtitle/80">({{ selectedCurrency.symbol }})</span>
                            <AppIcon :name="IconEnum.ARROW_DOWN" size="16" class="transition duration-200" :class="selectedCurrency.name ? 'text-title/90 group-hover:text-title/70' : 'text-subtitle/70 group-hover:text-subtitle/50'" />
                        </div>
                    </AppTooltip>
                </div>
                <div class="flex items-center gap-4">
                    <Transition :name="TransitionEnum.FADE_SLIDE" mode="out-in">
                        <span v-if="selectedCurrency.name" class="text-subtitle text-4xl font-bold" :key="currencyData.price">{{ currencyData.price }}</span>
                    </Transition>
                    <Transition :name="TransitionEnum.FADE" mode="out-in">
                        <span v-if="selectedCurrency.name" class="flex items-center gap-2 border rounded-2xl font-bold text-sm px-2 py-1 mt-1" :class="[currencyData.priceChangeRate >= 0 ? 'border-active text-active' : 'border-inactive text-inactive']" :key="currencyData.priceChangeRate"><AppIcon size="8" :name="currencyData.priceChangeRate >= 0 ? IconEnum.ARROW_RIGHT_UP : IconEnum.ARROW_RIGHT_DOWN" /> {{ currencyData.priceChangeRate }} %</span>
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
import CurrencySelectionModal from '@/components/dashboard/CurrencySelectionModal.vue';
import AppTooltip from '@/components/AppTooltip.vue';
import { IconEnum } from '@/enums/IconEnum';
import { TransitionEnum } from '@/enums/TransitionEnum';
import { computed, reactive, ref } from 'vue';
import AppImage from '@/components/AppImage.vue';
import { storeToRefs } from 'pinia';
import { useCurrencyStore } from '@/stores/currencyStore';
import { useFetchData } from '@/composables/useFetchData';
import type { HttpOptions } from '@/interfaces/HttpOptions';
import { HttpRouteEnum } from '@/enums/HttpRouteEnum';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { SocketEventEnum } from '@/enums/SocketEventEnum';
import type { CurrencyData } from '@/interfaces/CurrencyData';
import { useSocketStore } from '@/stores/socketStore';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const isCurrencySelectionModalOpened = ref(false);
const selectCurrency = () => {
    isCurrencySelectionModalOpened.value = true;
};

const currencyData = reactive<CurrencyData>({
    price: '-',
    volume: '-',
    priceLow: '-',
    priceHigh: '-',
    priceChangeRate: 0,
    transactions: '-',
    image: '',
    name: '',
    symbol: ''
});

const statItems = computed(() => [
    {
        title: 'All-Time High (ATH)',
        value: currencyData.priceHigh
    },
    {
        title: 'All-Time Low (ATL)',
        value: currencyData.priceLow
    },
    {
        title: 'Total trades',
        value: currencyData.transactions
    },
    {
        title: 'Volume',
        value: currencyData.volume
    }
]);

const httpOptions: HttpOptions = {
    routeName: HttpRouteEnum.CRYPTO_GET_CURRENCY_DATA
};
const socketOptions: SocketOptions = {
    eventName: SocketEventEnum.CRYPTO_GET_CURRENCY_DATA
};
useFetchData(httpOptions, socketOptions, (data) => {
    const { price, growthRate, priceHigh, priceLow, totalTrades, volume } = data;
    currencyData.price = price;
    currencyData.priceChangeRate = growthRate;
    currencyData.priceHigh = priceHigh;
    currencyData.priceLow = priceLow;
    currencyData.transactions = totalTrades;
    currencyData.volume = volume;
});

const socketStore = useSocketStore();
const updateDataCallback = () => {
    currencyData.price = '';
    currencyData.priceChangeRate = 0;
    currencyData.priceHigh = '';
    currencyData.priceLow = '';
    currencyData.transactions = '';
    currencyData.volume = '';
};

socketStore.onCurrencyUpdate(updateDataCallback, httpOptions, socketOptions);
socketStore.onPeriodUpdate(updateDataCallback, httpOptions, socketOptions);
</script>
