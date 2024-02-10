<template>
    <AppModal v-model="isOpened">
        <template #title>Select a Currency</template>
        <template #content>
            <div class="flex flex-col mx-3 gap-12">
                <AppSearchbar v-model="searchValue" placeholder="Search" :autofocus="true" @change="searchCurrency" @enter="searchCurrency" />

                <AppLoader v-if="isSearchLoading" size="45" class="self-center stroke-subtitle" />
                <div v-else class="scrollbar overflow-y-auto overflow-x-hidden min-h-[250px] max-h-[350px] pb-10">
                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        <div class="group relative select-none py-4 px-5 rounded-xl border-2 transition duration-200 cursor-pointer hover:bg-background" :class="isSelectedCurrency(currency) ? 'bg-background border-active' : 'border-container hover:border-subtitle/5'" v-for="currency in currencies" :key="currency.symbol" @click="selectCurrency(currency)">
                            <div class="absolute flex items-center gap-[5px] top-0 left-0 rounded-tl-lg rounded-br-lg px-2 transition duration-200" :class="isSelectedCurrency(currency) ? 'bg-active border-active text-background' : 'opacity-0 text-background bg-subtitle/20 border-subtitle/20 group-hover:opacity-100'">
                                <AppIcon :name="IconEnum.CHECK" size="6" />
                                <span class="text-xs font-semibold">{{ isSelectedCurrency(currency) ? 'Selected' : 'Select' }}</span>
                            </div>
                            <AppTooltip position="bottom" :text="currency.name">
                                <div class="flex items-center gap-4 mt-2">
                                    <AppImage :name="currency.image" size="40" />
                                    <div class="flex flex-col gap-[3px]">
                                        <span class="text-title font-semibold text-lg">{{ formatCurrency(currency.name) }}</span>
                                        <span class="text-subtitle text-sm">{{ currency.symbol }}</span>
                                    </div>
                                </div>
                            </AppTooltip>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </AppModal>
</template>

<script setup lang="ts">
import AppModal from '@/components/AppModal.vue';
import AppIcon from '@/components/AppIcon.vue';
import AppLoader from '@/components/AppLoader.vue';
import AppImage from '@/components/AppImage.vue';
import AppTooltip from '@/components/AppTooltip.vue';
import AppSearchbar from '@/components/AppSearchbar.vue';
import { storeToRefs } from 'pinia';
import { useCurrencyStore } from '@/stores/currencyStore';
import { ref } from 'vue';
import type { Currency } from '@/interfaces/Currency';
import { IconEnum } from '@/enums/IconEnum';
import { truncate } from '@/utils/formatString';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const isOpened = defineModel<boolean>();
const searchValue = ref('');
const isSearchLoading = ref(false);

const searchCurrency = (value: string) => {
    if (isSearchLoading.value) return;
    isSearchLoading.value = true;
    // TODO : request API for currencies list
    setTimeout(() => {
        isSearchLoading.value = false;
    }, 3000);
};

const currencies = ref<Currency[]>([
    {
        image: 'currencies/btc.webp',
        name: 'Bitcoin',
        symbol: 'BTC'
    },
    {
        image: 'currencies/matic.webp',
        name: 'Polygon',
        symbol: 'MATIC'
    }
]);

const isSelectedCurrency = (currency: Currency) => {
    return selectedCurrency.value.image === currency.image && selectedCurrency.value.name === currency.name && selectedCurrency.value.symbol === currency.symbol;
};
const selectCurrency = (currency: Currency) => {
    if (!isSelectedCurrency(currency)) currencyStore.setSelectedCurrency(currency);
};

const maxCurrencyLength = 9;
const formatCurrency = (currency: string) => {
    return truncate(currency, maxCurrencyLength);
};
</script>
