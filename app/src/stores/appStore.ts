import type { PeriodEnum } from '@/enums/PeriodEnum';
import { getDefaultPeriod } from '@/utils/getDefaultPeriod';
import { useSocketStore } from '@/stores/socketStore';
import { SocketEventEnum } from '@/enums/SocketEventEnum';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        selectedPeriod: getDefaultPeriod(),
        displayedImagesCount: 0,
        isUpdatingConfig: true,
        dataReloadInterval: 2000
    }),
    actions: {
        async selectPeriod(period: PeriodEnum) {
            this.selectedPeriod = period;
            localStorage.setItem('selected_period', JSON.stringify(period));
            await this.selectPeriodEvent();
        },
        async selectPeriodEvent() {
            const socketStore = useSocketStore();
            await socketStore.send({
                eventName: SocketEventEnum.CONFIG_UPDATE_PERIOD,
                data: this.selectPeriod
            });
        }
    }
});
