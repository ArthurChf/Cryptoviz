import { PeriodSelectorEnum } from '@/enums/period-selector/PeriodSelectorEnum';
import { defineStore } from 'pinia';

interface AppStore {
    selectedPeriod: PeriodSelectorEnum;
}

export const useAppStore = defineStore('app', {
    state: (): AppStore => ({
        selectedPeriod: PeriodSelectorEnum.ONE_DAY
    }),
    actions: {
        selectPeriod(period: PeriodSelectorEnum): void {
            this.selectedPeriod = period;
        }
    },
    getters: {
        getSelectedPeriod: (state) => {
            return state.selectedPeriod;
        }
    }
});
