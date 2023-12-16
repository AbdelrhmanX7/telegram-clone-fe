import { twMerge } from "tailwind-merge";
export * from "./dynamicBlurDataUrl";
export * from "./formatDate";
export const classNames = (...classes: any) => twMerge(...classes);
