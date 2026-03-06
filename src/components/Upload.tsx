import type React from 'react'
import uploadIcon from '../assets/icons/Name=CloudArrowUp.svg'


type Props = React.ComponentProps<'input'> & {
    filename?: string | null
}


export function Upload({ filename = null, ...rest }: Props) {
    return (
        <div>
            <legend className='uppercase text-sm text-gray-200 mb-2 mt-2'>Comprovante</legend>
            <div className='w-full h-12 flex items-center rounded-lg border border-gray-300 text-sm text-gray-100 bg-transparent'>

                <input className='hidden' type="file" id="upload" {...rest} />

                <span className='text-xs text-gray-100 flex-1 pl-4'>{filename ?? 'Selecione o arquivo'}</span>
                <label htmlFor="upload"
                className='flex h-12 items-center bg-green-100 rounded-lg cursor-pointer disabled:opacity-50 hover:bg-green-200 transition ease-linear px-2 py-1' >
                    <img className='w-6' src={uploadIcon} alt="upload" />
                </label>
            </div>
        </div>
    )

}