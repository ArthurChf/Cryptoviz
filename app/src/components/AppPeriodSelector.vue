<template>
    <div class="flex items-center gap-2 text-sm font-medium">
        <span class="select-none transition duration-[200ms] hover:bg-slate-800 cursor-pointer rounded-md px-2 py-1" :class="[{ 'bg-slate-800': period === selectedPeriod }]" v-for="period in PeriodSelectorEnum" @click="selectPeriod(period)">{{ period }}</span>
    </div>
</template>

<script setup lang="ts">
import { PeriodSelectorEnum } from '@enums/period-selector/PeriodSelectorEnum';
import { ref } from 'vue';
import { useAppStore } from '@stores/appStore';
// import dayjs from 'dayjs';

const appStore = useAppStore();
const selectedPeriod = ref<PeriodSelectorEnum>(PeriodSelectorEnum.ONE_DAY);

function selectPeriod(period: PeriodSelectorEnum): void {
    /* if(period === PeriodSelectorEnum.ONE_DAY) console.log(dayjs().subtract(1, 'day').startOf('day').format('DD/MM/YYYY HH:mm:ss'));
    else if(period === PeriodSelectorEnum.SEVEN_DAYS) console.log(dayjs().subtract(7, 'days').startOf('day').format('DD/MM/YYYY HH:mm:ss'));
    else if(period === PeriodSelectorEnum.ONE_MONTH) console.log(dayjs().subtract(1, 'month').startOf('day').format('DD/MM/YYYY HH:mm:ss'));
    else console.log(dayjs().subtract(1, 'year').startOf('day').format('DD/MM/YYYY HH:mm:ss')); */
    appStore.selectPeriod(period);
    selectedPeriod.value = period;
}
</script>
