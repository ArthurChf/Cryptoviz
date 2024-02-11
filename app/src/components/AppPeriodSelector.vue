<template>
    <div class="bg-background p-2 rounded-xl flex items-center gap-3 text-sm font-bold">
        <span class="text-subtitle select-none transition duration-200 cursor-pointer rounded-lg px-2 py-1" :class="[period === selectedPeriod ? 'text-title bg-active/70' : 'hover:text-title']" v-for="period in PeriodEnum" @click="selectPeriod(period)">{{ period }}</span>
    </div>
</template>

<script setup lang="ts">
import { PeriodEnum } from '@/enums/PeriodEnum';
import { useAppStore } from '@/stores/appStore';
import { storeToRefs } from 'pinia';

const appStore = useAppStore();
const { selectedPeriod } = storeToRefs(appStore);

function selectPeriod(period: PeriodEnum): void {
    appStore.selectPeriod(period);
}
</script>
