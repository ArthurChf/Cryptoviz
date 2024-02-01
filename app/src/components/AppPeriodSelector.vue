<template>
    <div class="bg-background p-2 rounded-xl flex items-center gap-3 text-sm font-bold">
        <span class="text-subtitle select-none transition duration-200 cursor-pointer rounded-lg px-2 py-1" :class="[period === selectedPeriod ? 'text-title bg-active/70' : 'hover:text-title']" v-for="period in PeriodSelectorEnum" @click="selectPeriod(period)">{{ period }}</span>
    </div>
</template>

<script setup lang="ts">
import { PeriodSelectorEnum } from '@/enums/period-selector/PeriodSelectorEnum';
import { ref } from 'vue';
import { useAppStore } from '@/stores/appStore';

const appStore = useAppStore();
const selectedPeriod = ref<PeriodSelectorEnum>(PeriodSelectorEnum.ONE_DAY);

function selectPeriod(period: PeriodSelectorEnum): void {
    appStore.selectPeriod(period);
    selectedPeriod.value = period;
}
</script>
