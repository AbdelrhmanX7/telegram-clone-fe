import { twMerge } from 'tailwind-merge';
export * from './formatDate';
export const classNames = (...classes: any) => twMerge(...classes);
