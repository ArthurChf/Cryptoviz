import { PeriodSelectorEnum } from '@/enums/period-selector/PeriodSelectorEnum';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        selectedPeriod: PeriodSelectorEnum.ONE_DAY,
        displayedImagesCount: 0
    }),
    actions: {
        selectPeriod(period: PeriodSelectorEnum): void {
            this.selectedPeriod = period;
        }
    }
});
