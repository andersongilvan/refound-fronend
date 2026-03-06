
import { useActionState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import z, { ZodError } from "zod";
import { api } from "../services/api";
import { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";


const sigInSchema = z.object({
    email: z.string().email({ message: 'E-mail inválido' }),
    password: z.string().trim().min(1, 'Informe a senha')
})


export function Signin() {

    const [state, formAction, isLoading] = useActionState(sigIn, null)

    const auth = useAuth()

    async function sigIn(_: any, formData: FormData) {
        try {
            const data = sigInSchema.parse({
                email: formData.get('email'),
                password: formData.get('password')
            })

            const response = await api.post('/user/session', data)

            auth.save(response.data)

        } catch (error) {
            if (error instanceof ZodError) {
                return { message: error.issues[0].message }
            }
            if (error instanceof AxiosError) {
                return { message: error.response?.data.message }
            }

            return { message: 'Não foi possível entrar!' }
        }


    }


    return (

        <form action={formAction}
            className="w-full flex flex-col gap-4">
            <Input
                name="email"
                required
                legend="E-mail"
                type="email"
                placeholder="seu@email.com"
            />

            <Input
                name="password"
                required
                legend="Senha"
                type="password"
                placeholder="123456"
            />

            <p className="text-sm font-medium text-warning my-4">
                {state?.message}
            </p>

            <Button type="submit" isLoading={isLoading}>Entrar</Button>

            <a className="text-sm font-semibold text-gray-100  mt-10 mb-4 text-center hover:text-green-200 transition ease-linear" href="/signup">Criar conta</a>
        </form>

    )
}