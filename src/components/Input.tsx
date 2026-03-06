import type React from "react";

type Props = React.ComponentProps<"input"> & {
    legend?: string
}

export function Input({ legend, type = 'text', ...rest }: Props) {
    return (
        <fieldset className="flex flex-1 max-h-20 focus-within:text-green-100  text-gray-200">
            {legend && <legend className="uppercase text-sm mb-2 text-inherit">{legend} </legend>}

            <input className="w-full h-12 border border-gray-300 bg-transparent outline-none px-4 text-sm rounded-lg focus:border-2 mb-3 focus:border-green-100"
                type={type} {...rest} />
        </fieldset>
    )
}