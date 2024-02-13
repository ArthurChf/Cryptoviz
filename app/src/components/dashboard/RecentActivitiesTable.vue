<template>
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
                    <AppImage :name="transaction.currencyImage" size="35" />
                    <span>{{ transaction.currencyName }}</span>
                </td>
                <td class="text-left py-5 font-medium text-title">{{ transaction.amount }}</td>
                <td class="text-left py-5 font-medium text-subtitle">{{ transaction.id }}</td>
                <td class="text-right pr-3 py-5 font-medium text-subtitle">{{ transaction.date }}</td>
            </tr>
        </table>
    </div>
</template>

<script setup lang="ts">
import { useAutoAnimate } from '@formkit/auto-animate/vue';
import AppImage from '@/components/AppImage.vue';
import type { Transaction } from '@/interfaces/Transaction';
import { onMounted, ref } from 'vue';
import { useFetchData } from '@/composables/useFetchData';
import type { HttpOptions } from '@/interfaces/HttpOptions';
import { HttpRouteEnum } from '@/enums/HttpRouteEnum';
import type { SocketOptions } from '@/interfaces/SocketOptions';
import { SocketEventEnum } from '@/enums/SocketEventEnum';

const [recentActivitiesTable] = useAutoAnimate();

const lastTransactions = ref<Transaction[]>([]);

onMounted(() => {
    const httpOptions: HttpOptions = {
        routeName: HttpRouteEnum.CRYPTO_GET_CURRENCY_TRANSACTIONS
    };
    const socketOptions: SocketOptions = {
        eventName: SocketEventEnum.CRYPTO_GET_CURRENCY_TRANSACTIONS
    };
    useFetchData(httpOptions, socketOptions, (data: Transaction[]) => {
        lastTransactions.value = data;
    });
});
</script>
