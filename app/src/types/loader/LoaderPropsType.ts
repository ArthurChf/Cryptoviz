import type { LoaderEnum } from '@enums/loader/LoaderEnum';

export type LoaderPropsType = {
    color: string;
    size?: string;
    width?: string;
    type: LoaderEnum;
};
