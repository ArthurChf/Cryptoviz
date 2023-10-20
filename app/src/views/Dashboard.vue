<template>
    <DashboardLayout>
        <template #left>
            <div class="flex flex-col justify-stretch w-auto h-full overflow-x-hidden overflow-y-auto scrollbar">
                <div class="flex flex-col lg:flex-row border-b-2 border-slate-800 h-full">
                    <div
                        class="flex py-4 px-3 items-center justify-center w-full lg:w-1/2 border-2 border-slate-900 border-r-slate-800 hover:border-blue-700 hover:border-2 transition duration-[200ms]">
                        <AppChart id="ttest" />
                    </div>
                    <div
                        class="flex py-4 px-3 items-center justify-center w-full lg:w-1/2 border-2 border-slate-900 hover:border-blue-700 hover:border-2 transition duration-[200ms]">
                        <AppChart id="tteste" />
                    </div>
                </div>

                <div class="flex flex-col lg:flex-row h-full">
                    <div
                        class="flex py-4 px-3 items-center justify-center w-full lg:w-1/2 border-2 border-slate-900 border-r-slate-800 hover:border-blue-700 hover:border-2 transition duration-[200ms]">
                        <AppChart id="ttestee" />
                    </div>
                    <div
                        class="flex py-4 px-3 items-center justify-center w-full lg:w-1/2 border-2 border-slate-900 hover:border-blue-700 hover:border-2 transition duration-[200ms]">
                        <AppChart id="ttesteee" />
                    </div>
                </div>
            </div>
        </template>
        <template #right>
            <div class="border-b-2 border-slate-800">
                <AppTable :headers="headers" :data="data" />
            </div>
            <AppIcon :name="IconEnum.STATUS_SUCCESS" class="h-7 w-7 fill-teal-500" />
            <AppIcon :name="IconEnum.STATUS_ERROR" class="h-7 w-7 fill-red-500" />
            <AppIcon :name="IconEnum.STATUS_NEUTRAL" class="h-7 w-7 fill-slate-500" />
            <AppIcon :name="IconEnum.ADD" class="h-7 w-7 fill-neutral-500" />
            <AppIcon :name="IconEnum.MORE" class="h-7 w-7 fill-neutral-500" />
            <AppLoader size="24" :type="LoaderEnum.CIRCULAR" color="stroke-slate-400" />
        </template>
    </DashboardLayout>
</template>

<script setup lang="ts">
import DashboardLayout from '@layouts/DashboardLayout.vue';
import AppLoader from '@components/AppLoader.vue';
import AppIcon from '@components/AppIcon.vue';
import AppTable from '@components/AppTable.vue';
import { IconEnum } from '@enums/IconEnum';
import { LoaderEnum } from '@enums/loader/LoaderEnum';
import type { TableHeaderInterface } from '@interfaces/table/TableHeaderInterface';
import type { TableDataInterface } from '@interfaces/table/TableDataInterface';
import { TableDataEnum } from '@enums/table/TableDataEnum';
import AppChart from '@components/AppChart.vue';
import { ref } from 'vue';

const headers: TableHeaderInterface[] = [
    { label: 'Symbol', name: 'symbol', type: TableDataEnum.STRING },
    { label: 'Last', name: 'last', type: TableDataEnum.NUMBER },
    { label: 'Chg', name: 'chg', type: TableDataEnum.NUMBER },
    { label: 'Chg%', name: 'chgP', type: TableDataEnum.PERCENTAGE }
];

const data = ref<TableDataInterface['data'][]>([]);

setTimeout(() => {
    data.value = [
        { symbol: 'TWTR qsd qsdioj sd', last: 31.97, chg: 1.35, chgP: 1.99 },
        { symbol: 'TWTR', last: -8.22, chg: 0, chgP: 1.99 },
        { symbol: 'TWTR', last: -7.05, chg: 6.56, chgP: 1.99 },
        { symbol: 'TWTR', last: 76, chg: 1.33, chgP: 12.05 },
        { symbol: 'TWTR', last: 2.87, chg: 31, chgP: 1.99 },
        { symbol: 'TWTR', last: -5.98, chg: 1.33, chgP: 1.99 },
        { symbol: 'TWTR', last: 23.83, chg: 1.33, chgP: 1.99 },
        { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
        { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
        { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
        { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
        { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
        { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 }
    ];
}, 1000);
</script>
