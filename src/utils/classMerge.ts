import type { ClassValue } from "clsx";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function classMrrge(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}