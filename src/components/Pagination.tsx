import leftIcon from '../assets/icons/leftIcon.svg'
import rigthIcon from '../assets/icons/rigthIcon.svg'
import { Button } from './Button'

type Props = {
    current: number
    total: number
    onNext: () => void
    onPrevious: () => void
}

export function Pagination({ current, total, onNext, onPrevious }: Props) {
    return (
        <div className='flex flex-1 items-center justify-center gap-4'>
            <Button
             disabled={current === 1}
                onClick={onPrevious}
                variant='small'>
                <img src={leftIcon} alt="" />
            </Button>
            <span className='text-sm text-gray-200'>
                {current} / {total}
            </span>
            <Button
            disabled={current === total}
                onClick={onNext}
                variant='small'>
                <img src={rigthIcon} alt="" />
            </Button>
        </div>
    )

}