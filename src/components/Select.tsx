import type React from "react";

type Props = React.ComponentProps<"select"> & {
    legend?: string
}

export function Select({ legend, children, ...rest }: Props) {
    return (
        <fieldset className="flx flex-1 max-h-20 focus-within:text-green-100  text-gray-200">
            {legend && <legend className="uppercase text-sm mb-2 text-inherit">{legend} </legend>}

            <select className="w-full h-12 border border-gray-300 bg-transparent outline-none px-4 text-sm rounded-lg focus:border-2 focus:border-green-100"
                {...rest}>
                    <option value='' disabled hidden >Selecione</option>
                {children}
            </select>
        </fieldset>
    )
}