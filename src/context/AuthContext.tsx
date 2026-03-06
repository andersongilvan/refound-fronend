import { createContext, useEffect, useState, type ReactNode } from "react";
import { api } from "../services/api";

type AuthContext = {
    session: null | UserApiResponse
    save: (data: UserApiResponse) => void
    remove: () => void
    isLoading: boolean
}

const LOCAL_STORAGE_KEY = '@refound'

export const AuthContext = createContext({} as AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {

    const [session, setSession] = useState<UserApiResponse | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    function save(data: UserApiResponse) {
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:user`, JSON.stringify(data.user))
        localStorage.setItem(`${LOCAL_STORAGE_KEY}:token`, data.token)

        api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

        setSession(data)
    }

    function remove() {
        setSession(null)
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:user`)
        localStorage.removeItem(`${LOCAL_STORAGE_KEY}:token`)

        window.location.assign('/')
    }

    function loadUser() {
        const user = localStorage.getItem(`${LOCAL_STORAGE_KEY}:user`)
        const token = localStorage.getItem(`${LOCAL_STORAGE_KEY}:token`)

        if (user && token) {

            api.defaults.headers.common['Authorization'] = `Bearer ${token}`

            setSession({
                user: JSON.parse(user),
                token
            })
        }

        setIsLoading(false)
    }

    useEffect(() => {
        loadUser()
    }, [])



    return (
        <AuthContext.Provider value={{ session, save, isLoading, remove }}>
            {children}
        </AuthContext.Provider>
    )
}