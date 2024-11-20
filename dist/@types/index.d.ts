import { CSSProperties } from 'react';
export interface ColorConfig {
    colors: string[];
    angle?: number;
}
export interface Props {
    initialValue?: number;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    loading?: boolean;
    colors?: ColorConfig;
    formatValue?: (value: number) => string;
    onChange?: (value: number) => void;
    className?: string;
    style?: CSSProperties;
}
