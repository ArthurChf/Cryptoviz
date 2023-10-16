import type { TableDataEnum } from '@enums/table/TableDataEnum';

export interface TableHeaderInterface {
    label: string;
    name: string;
    type: TableDataEnum;
}
