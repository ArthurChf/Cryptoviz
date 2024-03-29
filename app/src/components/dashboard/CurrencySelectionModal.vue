<template>
    <AppModal v-model="isOpened">
        <template #title>Select a Currency</template>
        <template #content>
            <div class="flex flex-col mx-3 gap-12">
                <AppSearchbar v-model="searchValue" placeholder="Search" :autofocus="true" @change="searchCurrency" @enter="searchCurrency" />

                <div class="flex h-[250px] pb-10">
                    <div class="flex items-center justify-center w-full text-subtitle text-xl font-semibold" v-if="!currencies.length">No results</div>
                    <div class="w-full" v-else>
                        <AppLoader v-if="isSearchLoading" size="45" class="stroke-subtitle" />
                        <div v-else class="scrollbar overflow-y-auto overflow-x-hidden h-[250px] pb-10 w-full">
                            <div class="grid items-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">
                                <div class="group relative select-none py-4 px-5 rounded-xl border-2 transition duration-200 cursor-pointer hover:bg-background" :class="isSelectedCurrency(currency) ? 'bg-background border-active' : 'border-container hover:border-subtitle/5'" v-for="currency in currencies" :key="currency.symbol" @click="selectCurrency(currency)">
                                    <div class="absolute flex items-center gap-[5px] top-0 left-0 rounded-tl-lg rounded-br-lg px-2 transition duration-200" :class="isSelectedCurrency(currency) ? 'bg-active border-active text-background' : 'opacity-0 text-background bg-subtitle/20 border-subtitle/20 group-hover:opacity-100'">
                                        <AppIcon :name="IconEnum.CHECK" size="6" />
                                        <span class="text-xs font-semibold">{{ isSelectedCurrency(currency) ? 'Selected' : 'Select' }}</span>
                                    </div>
                                    <AppTooltip position="bottom" :text="currency.name">
                                        <div class="flex items-start gap-4 mt-2">
                                            <AppImage :name="currency.image" size="40" class="rounded-full shadow-md" />
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
import { onMounted, ref } from 'vue';
import type { Currency } from '@/interfaces/Currency';
import { IconEnum } from '@/enums/IconEnum';
import { truncate } from '@/utils/formatString';
import { useFetchData } from '@/composables/useFetchData';
import type { HttpOptions } from '@/interfaces/HttpOptions';
import { HttpRouteEnum } from '@/enums/HttpRouteEnum';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const currencies = ref<Currency[]>([]);

const isOpened = defineModel<boolean>();
const searchValue = ref('');
const isSearchLoading = ref(false);

const fetchCurrencies = async (search: string = '') => {
    if (isSearchLoading.value) return;
    isSearchLoading.value = true;
    const httpOptions: HttpOptions = {
        routeName: HttpRouteEnum.CRYPTO_GET_ALL_CURRENCIES,
        queryParams: {
            search
        }
    };
    await useFetchData(httpOptions, null, (data: unknown) => {
        currencies.value = data as Currency[];
    });
    isSearchLoading.value = false;
};

const searchCurrency = async (value: string) => {
    await fetchCurrencies(value);
};

const isSelectedCurrency = (currency: Currency) => {
    return selectedCurrency.value.image === currency.image && selectedCurrency.value.name === currency.name && selectedCurrency.value.symbol === currency.symbol;
};
const selectCurrency = async (currency: Currency) => {
    if (!isSelectedCurrency(currency)) currencyStore.setSelectedCurrency(currency);
};

const maxCurrencyNameLength = 10;
const formatCurrency = (currency: string) => {
    return truncate(currency, maxCurrencyNameLength);
};

onMounted(() => {
    fetchCurrencies();
});
</script>
