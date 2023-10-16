import type { LoaderEnum } from '@enums/loader/LoaderEnum';

export interface LoaderPropsInterface {
    color: string;
    size?: string;
    width?: string;
    type: LoaderEnum;
}
