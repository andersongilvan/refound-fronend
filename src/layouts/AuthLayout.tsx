import { Outlet } from 'react-router'
import logo from '../assets/icons/refund.svg'

export function AuthLayout() {
    return (
        <div className='w-full h-screen p-4 bg-gray-400 flex flex-col justify-center items-center text-gray-100'>
            <main  className='bg-gray-500 p-5 rounded-md w-full max-w-md flex flex-col items-center'>
                <img src={logo} alt="logo" className='my-1' />
                <Outlet />
            </main>
        </div>
    )
}