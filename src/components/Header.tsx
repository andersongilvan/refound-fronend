import refound from '../assets/icons/refund.svg'
import logOutIcon from '../assets/icons/Frame.svg'
import arrow from '../assets/icons/Vector (4).svg'
import { useAuth } from '../hooks/useAuth'



export function Header() {

    const userAuth = useAuth()

    return (
        <header className='max-w-6xl mx-auto mb-8  flex justify-between items-center px-2 py-1'>
            <div className='flex items-center gap-1'>
                <img src={arrow} />
                <img src={refound} />
            </div>

            <div className='flex items-center gap-2'>
                <span className='text-gray-200 font-semibold text-sm '>Olá, {userAuth.session?.user.name}</span>
                <a
                    onClick={() => userAuth.remove()}
                    href="" className='hover:opacity-50 transition ease-linear'>
                    <img src={logOutIcon} />
                </a>
            </div>
        </header>
    )
}