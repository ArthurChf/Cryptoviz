<template>
    <table>
        <thead class="table table-fixed w-full">
            <tr class="w-full">
                <th v-for="(col, colId) in headers" :key="colId" class="text-left px-3 py-2 last:pr-0 border-b-2 border-b-slate-800 min-w-[500px] break-all">
                    <span class="font-medium text-slate-500 hover:text-slate-400 hover:cursor-pointer">{{ col.label }}</span>
                </th>
            </tr>
        </thead>
        <tbody class="w-full overflow-auto max-h-80 block scrollbar">
            <tr v-if="!isTableLoading" v-for="(row, rowId) in data" :key="rowId" class="w-full border-b-2 border-b-slate-800 table table-fixed">
                <TransitionGroup :name="TransitionEnum.FADE" tag="td" v-for="(col, colId) in headers" :key="colId" class="text-slate-300 py-1 px-2 first:pl-3">
                    <span :class="[textColor(row[col.name]!, col.type)]" v-if="!isDataLoading[rowId]![col.name]" :key="row[col.name]!">{{ formatText(row[col.name]!, col.type) }}</span>
                    <AppLoader v-else size="20" :type="LoaderEnum.CIRCULAR" color="stroke-slate-400" />
                </TransitionGroup>
            </tr>
            <tr v-else class="w-full border-b-2 border-b-slate-800 table table-fixed">
                <td class="text-slate-300 py-1 px-2 first:pl-3 text-center">
                    <AppLoader size="9" :type="LoaderEnum.DOTS" color="bg-slate-500" />
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { TransitionEnum } from '@enums/TransitionEnum';
import { TableDataEnum } from '@enums/table/TableDataEnum';
import type { TableDataInterface } from '@interfaces/table/TableDataInterface';
import type { TableHeaderInterface } from '@interfaces/table/TableHeaderInterface';
import type { Ref } from 'vue';
import { computed, ref, watch } from 'vue';
import AppLoader from './AppLoader.vue';
import { LoaderEnum } from '@enums/loader/LoaderEnum';

const props = defineProps<{
    headers: TableHeaderInterface[];
    data: TableDataInterface['data'][];
}>();

const fillDataLoadingArray = (arr: TableDataInterface['data'][]): Record<string, boolean>[] => {
    return arr.map((row) => {
        const loadingStates: Record<string, boolean> = {};
        for(const key in row) {
            loadingStates[key] = false;
        }
        return loadingStates;
    });
};
const cryptoData = computed(() => props.data);
const isTableLoading = ref(true);
const isDataLoading = ref(fillDataLoadingArray(cryptoData.value));

const setTableLoadingState = async (state: Ref<boolean>): Promise<void> => {
    state.value = true;
    let timer: NodeJS.Timeout | number = -1;
    await new Promise((resolve) => {
        timer = setTimeout(() => {
            state.value = false;
            resolve('');
        }, 1000);
    });
    clearTimeout(timer);
};

const setDataLoadingState = async (rowIndex: number, key: string): Promise<void> => {
    isDataLoading.value[rowIndex]![key] = true;
    let timer: NodeJS.Timeout | number = -1;
    await new Promise((resolve) => {
        timer = setTimeout(() => {
            isDataLoading.value[rowIndex]![key] = false;
            resolve('');
        }, 500);
    });
    clearTimeout(timer);
};

watch(cryptoData, (newArray, oldArray) => {
    isDataLoading.value = fillDataLoadingArray(newArray);
    if(newArray.length !== oldArray.length) setTableLoadingState(isTableLoading);
    else {
        newArray.forEach((row, rowIndex) => {
            for(const key in row) {
                if(row[key] !== oldArray[rowIndex]![key]) setDataLoadingState(rowIndex, key);
            }
        });
    }
}, { deep: true });

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
