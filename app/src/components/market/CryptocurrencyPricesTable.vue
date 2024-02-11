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
        <tr v-for="currency in currencyData" :key="currency.id" class="transition duration-200 hover:bg-background">
            <td class="py-5 pl-3 font-medium text-title">{{ currency.id }}</td>
            <td class="py-5 flex items-center gap-4">
                <Transition :name="TransitionEnum.FADE" mode="out-in">
                    <AppImage :name="currency.image" :key="currency.image" size="40" />
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
                    <span v-if="selectedCurrency.name" class="flex items-center gap-2 w-fit border rounded-2xl font-bold text-sm px-2 py-1 mt-1" :class="[currency.priceChangeRate >= 0 ? 'border-active text-active' : 'border-inactive text-inactive']">{{ currency.priceChangeRate > 0 ? '+' : currency.priceChangeRate < 0 ? '-' : '' }}{{ currency.priceChangeRate }} %</span>
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
import { ref } from 'vue';
import { useCurrencyStore } from '@/stores/currencyStore';
import { storeToRefs } from 'pinia';
import AppIcon from '@/components/AppIcon.vue';
import { IconEnum } from '@/enums/IconEnum';
import { TransitionEnum } from '@/enums/TransitionEnum';

const currencyStore = useCurrencyStore();
const { selectedCurrency } = storeToRefs(currencyStore);

const currencyData = ref<CurrencyData[]>([
    {
        id: 1,
        image: 'currencies/btc.webp',
        name: 'Bitcoin',
        symbol: 'BTC',
        priceChangeRate: 1.33,
        price: '$1500',
        volume: '2M',
        priceHigh: '$12',
        priceLow: '3$',
        transactions: '1M'
    },
    {
        id: 2,
        image: 'currencies/eth.webp',
        name: 'Ethereum',
        symbol: 'ETH',
        priceChangeRate: 1.33,
        price: '$1500',
        volume: '2M',
        priceHigh: '$12',
        priceLow: '3$',
        transactions: '1M'
    },
    {
        id: 3,
        image: 'currencies/matic.webp',
        name: 'Polygon',
        symbol: 'MATIC',
        priceChangeRate: 1.33,
        price: '$1500',
        volume: '2M',
        priceHigh: '$12',
        priceLow: '3$',
        transactions: '1M'
    }
]);

const isSelectedCurrency = (currency: CurrencyData) => {
    return selectedCurrency.value.image === currency.image && selectedCurrency.value.name === currency.name && selectedCurrency.value.symbol === currency.symbol;
};
const selectCurrency = (currency: CurrencyData) => {
    if (!isSelectedCurrency(currency)) currencyStore.setSelectedCurrency(currency);
};

const updateData = () => {
    const newData = [
        {
            id: 3,
            image: 'currencies/matic.webp',
            name: 'Polygon',
            symbol: 'MATIC',
            priceChangeRate: -1.44,
            price: '$376',
            volume: '1M',
            priceHigh: '$12',
            priceLow: '3$',
            transactions: '1M'
        }
    ];
    newData.forEach((crypto, index) => {
        const obj = {
            id: crypto.id,
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

        if (index > currencyData.value.length - 1) {
            currencyData.value.push(obj);
        } else {
            currencyData.value[index]!.id = obj.id;
            currencyData.value[index]!.image = obj.image;
            currencyData.value[index]!.name = obj.name;
            currencyData.value[index]!.symbol = obj.symbol;
            currencyData.value[index]!.priceChangeRate = obj.priceChangeRate;
            currencyData.value[index]!.price = obj.price;
            currencyData.value[index]!.volume = obj.volume;
            currencyData.value[index]!.priceHigh = obj.priceHigh;
            currencyData.value[index]!.priceLow = obj.priceLow;
            currencyData.value[index]!.transactions = obj.transactions;
        }
    });
};
</script>
