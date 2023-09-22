<template>
    <DashboardLayout>
        <template #left>
            <div class="grid sm:grid-cols-1 md:grid-cols-2 h-full w-full">
                <div class="bg-red-200">card 1</div>
                <div class="bg-orange-200">card 2</div>
                <div class="bg-green-200">card 3</div>
                <div class="bg-indigo-200">card 4</div>
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
import type { TableHeaderType } from '@types/table/TableHeaderType';
import type { TableDataType } from '@types/table/TableDataType';
import { TableDataEnum } from '@enums/table/TableDataEnum';

const headers: TableHeaderType[] = [
    { label: 'Symbol', name: 'symbol', type: TableDataEnum.STRING },
    { label: 'Last', name: 'last', type: TableDataEnum.NUMBER },
    { label: 'Chg', name: 'chg', type: TableDataEnum.NUMBER },
    { label: 'Chg%', name: 'chgP', type: TableDataEnum.PERCENTAGE }
];

const data: TableDataType[] = [
    { symbol: 'TWTR qsd qsdioj sd', last: 68.16, chg: 1.33, chgP: 1.99 },
    { symbol: 'TWTR', last: 68.16, chg: 0, chgP: 1.99 },
    { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
    { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: -1 },
    { symbol: 'TWTR', last: 68.16, chg: -0.01, chgP: 1.99 },
    { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
    { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
    { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
    { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
    { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
    { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
    { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
    { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 }
];
</script>
