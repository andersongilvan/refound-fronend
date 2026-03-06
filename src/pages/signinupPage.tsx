import type React from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { useState } from "react";
import z, { ZodError } from "zod";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";

const signUpSchema = z.object({
    name: z.string().trim().min(1, { message: 'Informe o nome' }),
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 dígitos'),
    passwordConfirm: z.string({ message: 'Confirme a senmha' })
}).refine((data) => data.password === data.passwordConfirm, {
    message: 'As senhas não são iguais'
})


export function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            setIsLoading(true)

            const data = signUpSchema.parse({ name, email, password, passwordConfirm })

            await api.post('/user', data)

            if (confirm('Cadastrado com sucesso, ir para atela de entrar?')) {
                navigate('/')
            }


        } catch (error) {

            if (error instanceof ZodError) {
                return alert(error.issues[0].message)
            }
            if (error instanceof AxiosError) {
                return alert(error.response?.data.message)
            }

            alert('Não foi possível cadastrar!')
        } finally {
            setIsLoading(false)
        }
    }

    return (

        <form onSubmit={onSubmit}
            className="w-full flex flex-col gap-4">

            <Input
                required
                legend="Nome"
                type="text"
                placeholder="Seu nome"
                onChange={(e) => setName(e.target.value)}
            />

            <Input
                required
                legend="E-mail"
                type="email"
                placeholder="seu@email.com"
                onChange={(e) => setEmail(e.target.value)}
            />

            <Input
                required
                legend="Senha"
                type="password"
                placeholder="123456"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Input
                required
                legend="Confirme sua senha"
                type="password"
                placeholder="123456"
                onChange={(e) => setPasswordConfirm(e.target.value)}
            />


            <Button type="submit" isLoading={isLoading}>Entrar</Button>

            <a className="text-sm font-semibold text-gray-100  mt-2 mb-2 text-center hover:text-green-200 transition ease-linear" href="/">Já tenho uma conta</a>
        </form>

    )
}