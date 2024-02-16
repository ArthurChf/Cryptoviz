<template>
    <table class="table-fixed w-full select-none">
        <tr class="border-b-2 border-subtitle/5 text-subtitle text-md">
            <th class="text-left font-semibold pl-3 pb-4 w-[4%]">#</th>
            <th class="text-left font-semibold pb-4 w-[15%]">Currency</th>
            <th class="text-left font-semibold pb-4 w-[10%]">Price</th>
            <th class="text-left font-semibold pb-4 w-[11%]">24h %</th>
            <th class="text-left font-semibold pb-4 w-[12%]">All-Time High</th>
            <th class="text-left font-semibold pb-4 w-[12%]">All-Time Low</th>
            <th class="text-left font-semibold pb-4 w-[13%]">Volume (24h)</th>
            <th class="text-left font-semibold pb-4 w-[10%]">Transactions</th>
            <th class="text-left font-semibold pb-4 w-[10%]">Action</th>
        </tr>
        <tr v-for="(currency, currencyId) in currencies" :key="currencyId + 1" class="transition duration-200 hover:bg-background">
            <td class="py-5 pl-3 font-medium text-subtitle">{{ currencyId + 1 }}</td>
            <td class="py-5 flex items-center gap-4">
                <Transition :name="TransitionEnum.FADE" mode="out-in">
                    <AppImage :name="currency.image" :key="currency.image" size="40" class="rounded-full shadow-md" />
                </Transition>
                <div class="flex flex-col">
                    <Transition :name="TransitionEnum.FADE" mode="out-in">
                        <span class="text-title font-bold" :key="currency.name">{{ currency.name }}</span>
                    </Transition>
                    <Transition :name="TransitionEnum.FADE" mode="out-in">
                        <span class="text-subtitle font-semibold" :key="currency.symbol">{{ currency.symbol }}</span>
                    </Transition>
                </div>
            </td>
            <Transition :name="TransitionEnum.FADE" mode="out-in">
                <td class="py-5 font-medium text-subtitle" :key="currency.price">{{ currency.price }}</td>
            </Transition>
            <Transition :name="TransitionEnum.FADE" mode="out-in">
                <td class="py-5 font-medium text-subtitle" :key="currency.priceChangeRate">
                    <AppTooltip :text="`${currency.priceChangeRate.toString()} %`" position="bottom" :show="isPriceChangeRateTruncated(currency.priceChangeRate)">
                        <span v-if="selectedCurrency.name" class="flex items-center gap-2 w-fit border rounded-2xl font-bold text-sm px-2 py-1 mt-1" :class="[currency.priceChangeRate >= 0 ? 'border-active text-active' : 'border-inactive text-inactive']">{{ currency.priceChangeRate > 0 ? '+' : '' }}{{ formatPriceChangeRate(currency.priceChangeRate) }} %</span>
                    </AppTooltip>
                </td>
            </Transition>
            <Transition :name="TransitionEnum.FADE" mode="out-in">
                <td class="py-5 font-medium text-subtitle" :key="currency.priceHigh">{{ currency.priceHigh }}</td>
            </Transition>
            <Transition :name="TransitionEnum.FADE" mode="out-in">
                <td class="py-5 font-medium text-subtitle" :key="currency.priceLow">{{ currency.priceLow }}</td>
            </Transition>
            <Transition :name="TransitionEnum.FADE" mode="out-in">
                <td class="py-5 font-medium text-subtitle" :key="currency.volume">{{ currency.volume }}</td>
            </Transition>
            <Transition :name="TransitionEnum.FADE" mode="out-in">
                <td class="py-5 font-medium text-subtitle" :key="currency.transactions">{{ currency.transactions }}</td>
            </Transition>
            <td class="py-5 font-medium text-subtitle">
                <div role="button" class="inline-flex items-center gap-3 border-2 transition duration-200 rounded-lg w-fit px-3 py-1" :key="currency.symbol" :class="isSelectedCurrency(currency) ? 'text-active border-active/20 hover:border-active/30' : 'text-subtitle border-subtitle/20 hover:border-subtitle/30'" @click="selectCurrency(currency)">
                    <AppIcon v-if="isSelectedCurrency(currency)" :name="IconEnum.CHECK" size="7" class="text-active" />
                    <span>{{ isSelectedCurrency(currency) ? 'Selected' : 'Select' }}</span>
                </div>
            </td>
        </tr>
    </table>
</template>

<script setup lang="ts">
import AppImage from '@/components/AppImage.vue';
import type { CurrencyData } from '@/interfaces/CurrencyData';
import { onMounted, ref } from 'vue';
import AppTooltip from '@/components/AppTooltip.vue';
import { useCurrencyStore } from '@/stores/currencyStore';
import { storeToRefs } from 'pinia';
import AppIcon from '@/components/AppIcon.vue';
import { IconEnum } from '@/enums/IconEnum';
import { TransitionEnum } from '@/enums/TransitionEnum';
import { useFetchData } from '@/composables/useFetchData';
import type { HttpOptions } from '@/interfaces/HttpOptions';
import { HttpRouteEnum } from '@/enums/HttpRouteEnum';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { SocketEventEnum } from '@/enums/SocketEventEnum';
import { truncate } from '@/utils/formatString';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const currencies = ref<CurrencyData[]>([]);

const isSelectedCurrency = (currency: CurrencyData) => {
    return selectedCurrency.value.image === currency.image && selectedCurrency.value.name === currency.name && selectedCurrency.value.symbol === currency.symbol;
};
const selectCurrency = (currency: CurrencyData) => {
    if (!isSelectedCurrency(currency)) currencyStore.setSelectedCurrency(currency);
};

const updateData = (data: CurrencyData[]) => {
    data.forEach((crypto, index) => {
        const obj = {
            image: crypto.image,
            name: crypto.name,
            symbol: crypto.symbol,
            priceChangeRate: crypto.priceChangeRate,
            price: crypto.price,
            volume: crypto.volume,
            priceHigh: crypto.priceHigh,
            priceLow: crypto.priceLow,
            transactions: crypto.transactions
        };

        if (index > currencies.value.length - 1) {
            currencies.value.push(obj);
        } else {
            currencies.value[index]!.image = obj.image;
            currencies.value[index]!.name = obj.name;
            currencies.value[index]!.symbol = obj.symbol;
            currencies.value[index]!.priceChangeRate = obj.priceChangeRate;
            currencies.value[index]!.price = obj.price;
            currencies.value[index]!.volume = obj.volume;
            currencies.value[index]!.priceHigh = obj.priceHigh;
            currencies.value[index]!.priceLow = obj.priceLow;
            currencies.value[index]!.transactions = obj.transactions;
        }
    });
};

onMounted(() => {
    const httpOptions: HttpOptions = {
        routeName: HttpRouteEnum.CRYPTO_GET_ALL_CURRENCIES_DATA
    };
    const socketOptions: SocketOptions = {
        eventName: SocketEventEnum.CRYPTO_GET_ALL_CURRENCIES_DATA
    };
    useFetchData(httpOptions, socketOptions, (data: CurrencyData[]) => {
        updateData(data);
    });
});

const maxPriceChangeRateLength = 6;

const isPriceChangeRateTruncated = (changeRate: number) => {
    return changeRate.toString().length > maxPriceChangeRateLength;
};
const formatPriceChangeRate = (changeRate: number) => {
    return truncate(changeRate.toString(), maxPriceChangeRateLength);
};
</script>
