import type { PeriodEnum } from '@/apps/data/src/events/period.enum';

export interface AppPreferences {
    currency: string;
    period: PeriodEnum;
    lastDate: string;
}
