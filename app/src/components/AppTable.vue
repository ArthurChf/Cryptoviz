<template>
    <table>
        <thead class="table table-fixed" style="width: calc(100% - 17px);">
            <tr class="w-full">
                <th v-for="(col, colId) in headers" :key="colId" class="text-left px-3 py-2 last:pr-0 border-b-2 border-b-slate-800 min-w-[500px]">
                    <span class="font-medium text-slate-500 hover:text-slate-400 hover:cursor-pointer">{{ col.label }}</span>
                </th>
            </tr>
        </thead>
        <tbody class="w-full overflow-auto max-h-48 block scrollbar">
            <tr v-for="(row, rowId) in data" :key="rowId" class="w-full border-b-2 border-b-slate-800 table table-fixed">
                <td v-for="(col, colId) in headers" :key="colId" class="text-slate-300 py-1 px-2 first:pl-3" :class="[textColor(row[col.name]!, col.type)]">{{ formatText(row[col.name]!, col.type) }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { TableDataEnum } from '@enums/table/TableDataEnum';
import type { TableDataType } from '@types/table/TableDataType';
import type { TableHeaderType } from '@types/table/TableHeaderType';

defineProps<{
    headers: TableHeaderType[];
    data: TableDataType[];
}>();

const textColor = (value: number | string, type: TableDataEnum): string => {
    let res = '';
    if([TableDataEnum.NUMBER, TableDataEnum.PERCENTAGE].includes(type)) {
        if(value > 0) res = 'text-emerald-400';
        else if(value === 0) res = '';
        else res = 'text-red-500';
    }
    return res;
};

const formatText = (value: number | string, type: TableDataEnum): string => {
    let suffix = '';
    if(type === TableDataEnum.PERCENTAGE) suffix = '%';
    return `${value}${suffix}`;
};
</script>
