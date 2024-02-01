<template>
    <AppContainer class="gap-9">
        <h2 class="text-2xl text-title font-bold">Recent Activities</h2>
        <div class="overflow-y-auto overflow-x-hidden h-[295px] scrollbar">
            <table ref="recentActivitiesTable" class="table-fixed w-full select-none">
                <tr class="border-b-2 border-subtitle/5 text-subtitle text-md">
                    <th class="text-left pl-3 pb-3 font-semibold w-3/12">Currency</th>
                    <th class="text-left pb-3 font-semibold w-3/12">Transaction</th>
                    <th class="text-left pb-3 font-semibold w-3/12">ID</th>
                    <th class="text-right pr-3 pb-3 font-semibold w-2/12">Date</th>
                </tr>
                <tr v-for="transaction in lastTransactions" :key="transaction.id" class="transition duration-200 hover:bg-background">
                    <td class="flex items-center gap-4 py-5 pl-3 font-medium text-subtitle">
                        <AppImage :name="getCurrency(transaction.currencySymbol).image" size="35" />
                        <span>{{ transaction.currencyName }}</span>
                    </td>
                    <td class="text-left py-5 font-medium text-title">{{ transaction.amount }}</td>
                    <td class="text-left py-5 font-medium text-subtitle">#{{ transaction.id }}</td>
                    <td class="text-right pr-3 py-5 font-medium text-subtitle">{{ transaction.date }}</td>
                </tr>
            </table>
        </div>
    </AppContainer>
</template>

<script setup lang="ts">
import AppContainer from '@/components/AppContainer.vue';
import { ref } from 'vue';
import { useAutoAnimate } from '@formkit/auto-animate/vue';
import type { Transaction } from '@/interfaces/Transaction';
import { getCurrency } from '@/utils/getCurrency';
import AppImage from '@/components/AppImage.vue';

const [recentActivitiesTable] = useAutoAnimate();

const lastTransactions = ref<Transaction[]>([
    {
        currencySymbol: 'BTC',
        currencyName: 'Bitcoin',
        amount: '$659.10',
        id: '1241',
        date: '2024-02-01 19:18:00'
    },
    {
        currencySymbol: 'ADA',
        currencyName: 'Cardano',
        amount: '$37.56',
        id: '1242',
        date: '2024-02-01 19:19:00'
    },
    {
        currencySymbol: 'UNI',
        currencyName: 'Uniswap',
        amount: '$438.03',
        id: '1243',
        date: '2024-02-01 19:20:00'
    },
    {
        currencySymbol: 'ETH',
        currencyName: 'Ethereum',
        amount: '$67.44',
        id: '1244',
        date: '2024-02-01 19:21:00'
    }
]);

const lastId = ref(1245);
const maxDisplayedTransactions = 30;

const newTransaction = () => {
    lastTransactions.value.unshift({
        currencySymbol: 'ETH',
        currencyName: 'Ethereum',
        amount: '$67.44',
        id: `${lastId.value++}`,
        date: '2024-02-01 19:21:00'
    });
    if (lastTransactions.value.length === maxDisplayedTransactions + 1) lastTransactions.value.pop();
};

</script>
