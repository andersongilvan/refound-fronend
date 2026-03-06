import { Navigate, useLocation } from "react-router"
import okIcon from '../assets/icons/confirmIcon.svg'


export function Confirm() {

    const location = useLocation()

    if (!location.state?.fromSubmit) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="w-full h-screen">        
            <main className=" max-w-lg bg-gray-500 p-10 mx-auto flex flex-col gap-6 items-center rounded-lg">
                <header>
                    <h1 className="text-green-100 text-2xl font-bold"
                    >Solicitação enviada</h1>
                </header>
                <div className="w-28 h-28">
                    <img src={okIcon} alt="" />
                </div>
                 <p className="font-sm text-gray-200 text-center">Agora é apenas aguardar! Sua solicitação será analisada e, em breve, o setor financeiro irá entrar em contato com você.</p>
                <a className="w-full p-3 text-center bg-green-100 rounded-lg text-white hover:bg-green-200 transition ease-linear"
                 href="/"
                 >Home</a>
            </main>
        </div>
    )
}