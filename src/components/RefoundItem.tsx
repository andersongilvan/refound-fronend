import type React from "react"


export type RefoundItemsProps = {
    username: string
    id: string
    name: string
    category: string
    amount: string
    categoryImg: string
}

type Props = React.ComponentProps<'a'> & {
    data: RefoundItemsProps
}

export function RefoundItem({ data, children, ...rest }: Props) {
    return (
        <a
            className="flex items-center justify-between gap-3 hover:bg-green-100/10 transition ease-linear cursor-pointer rounded-md p-2"
            {...rest}>
            <img
                className="w-8 h-8"
                src={data.categoryImg} alt="Icone das categoria" />
            <div className="flex flex-col flex-1">
                <strong className="text-sm text-gray-100"> {`${data.username} | ${data.name}`} </strong>
                <span className="text-sm text-gray-200"> {data.category} </span>
            </div>
            { children }
            <span className="text-sm text-gray-100 font-semibold">
                <small className="font-normal text-gray-200">R$</small>
                {data.amount}
            </span>
            
        </a>
    )
}