import { PeriodEnum } from '@/enums/PeriodEnum';

export const getDefaultPeriod = () => {
    let defaultPeriod = PeriodEnum.ONE_DAY;

    const storedPeriod = localStorage.getItem('selected_period');
    if (storedPeriod) {
        try {
            if (([PeriodEnum.ONE_DAY, PeriodEnum.ONE_MONTH, PeriodEnum.ONE_YEAR, PeriodEnum.SEVEN_DAYS] as string[]).includes(storedPeriod)) defaultPeriod = storedPeriod as PeriodEnum;
        } catch (_) {}
    }

    return defaultPeriod;
};
