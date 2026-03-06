import type React from "react";
import { classMrrge } from "../utils/classMerge";


const variants = {
    button: {
        base: 'h-12',
        icon: 'h-12 w-12',
        small: 'h-8 w-8'
    }
}

type Props = React.ComponentProps<'button'> & {
    isLoading?: boolean,
    variant?: 'base' | 'icon' | 'small'
}

export function Button({ children, isLoading, type = 'button', variant = 'base', ...rest }: Props) {
    return <button className={classMrrge([
        `flex items-center justify-center bg-green-100 rounded-lg text-white cursor-pointer
        hover:bg-green-200 transition ease-linear disabled:opacity-50
        `, variants.button[variant],
        isLoading && "disabled:cursor-progress"

    ])}
        type={type}
        disabled={isLoading}
        {...rest}>{isLoading ? 'Carregando' : children} </button>
}