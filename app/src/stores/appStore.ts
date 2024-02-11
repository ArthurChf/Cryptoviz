import type { PeriodEnum } from '@/enums/PeriodEnum';
import { getDefaultPeriod } from '@/utils/getDefaultPeriod';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        selectedPeriod: getDefaultPeriod(),
        displayedImagesCount: 0
    }),
    actions: {
        selectPeriod(period: PeriodEnum) {
            this.selectedPeriod = period;
        }
    }
});
