<template>
    <div>
        <AppIcon :name="IconEnum.STATUS_SUCCESS" class="h-7 w-7 fill-teal-500" />
        <AppIcon :name="IconEnum.STATUS_ERROR" class="h-7 w-7 fill-red-500" />
        <AppIcon :name="IconEnum.STATUS_NEUTRAL" class="h-7 w-7 fill-slate-500" />
        <AppIcon :name="IconEnum.ADD" class="h-7 w-7 fill-neutral-500" />
        <AppIcon :name="IconEnum.MORE" class="h-7 w-7 fill-neutral-500" />
        <AppTable :headers="headers" :data="data" />
    </div>
</template>

<script setup lang="ts">
import AppIcon from '@components/AppIcon.vue';
import AppTable from '@components/AppTable.vue';
import { IconEnum } from '@enums/IconEnum';
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
    { symbol: 'TWTR', last: 68.16, chg: 1.33, chgP: 1.99 },
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
