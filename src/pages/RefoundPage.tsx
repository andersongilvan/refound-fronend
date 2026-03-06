import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { CATEGORIES, CATEGORIES_KEYS } from "../utils/categies";
import { useEffect, useState } from "react";
import { Upload } from "../components/Upload";
import { Button } from "../components/Button";
import { useNavigate, useParams } from "react-router";
import fileIcon from '../assets/icons/file-icon.svg'
import z, { ZodError } from "zod";
import { AxiosError } from "axios";
import { api } from "../services/api";
import type { RefoundApiResponse } from "../dtos/refound";
import { formatCurrency } from "../utils/formatCurrency";

const refoundSchem = z.object({
    name: z.string().min(1, 'Informe um nome claro para sua solicitação'),
    category: z.string().min(1, 'Informe a categoria'),
    amount: z.coerce.number({ message: 'Informe um valor válido' }).positive({ message: 'Informe um valor positivo' })
})


export function RefoundPage() {

    const [category, setCategory] = useState('')
    const [name, setName] = useState('')
    const [fileUrl, setFileUrl] = useState('')
    const [amount, setAmount] = useState('')
    const [isLoad, setIsLoad] = useState(false)
    const [filename, setFilename] = useState<File | null>(null)
    const [errorMessage, seterrorMessage] = useState('')

    const navigate = useNavigate()
    const params = useParams<{ id: string }>()



    async function onSubmot(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (params.id) {
            return navigate(-1)
        }

        try {
            setIsLoad(true)
            const data = refoundSchem.parse({
                name,
                category: category.toLocaleLowerCase(),
                amount: amount.replace(',', '.')
            })

            const formData = new FormData()

            formData.append('name', data.name)
            formData.append('amount', String(data.amount))
            formData.append('category', data.category)

            if (filename) {
                formData.append('file', filename)
            }

            await api.post('/refound', formData)

            setName('')
            setCategory('')
            setAmount('')
            setFilename(null)

            navigate('/confirm', { state: { fromSubmit: true } })

        } catch (error) {
            if (error instanceof ZodError) {
                seterrorMessage(error.issues[0].message)
            }
            if (error instanceof AxiosError) {
                console.log(error.response?.data?.validationError?.issues?.[0]?.message)
                return alert(error.response?.data.validationError?.issues?.[0]?.message)
            }

            return alert('Falha ao enviar, tente mais tarde')

        } finally {
            setIsLoad(false)
        }


    }

    async function fethRefound(id: string) {
        try {
            const response = await api.get<RefoundApiResponse>(`/refound/details/${id}`)

            setName(response.data.name)
            setCategory(response.data.category)
            setAmount(formatCurrency(response.data.amount))
            setFileUrl(response.data.filename)

        } catch (error) {
            if (error instanceof AxiosError) {
                console.log(error)
                return alert(error.response?.data.message)
            }
        }
    }

    useEffect(() => {
        if (params.id) {
            fethRefound(params.id)
        }
    }, [params.id])

    return (
        <div>
            <form onSubmit={onSubmot}
                className="flex flex-col gap-10 p-10 bg-gray-500 rounded-2xl
             lg:min-w-lg max-w-5xl mx-auto my-5">
                <header>
                    <h1 className="text-gray-100 text-2xl"
                    > {params.id ? 'Dados do reembolso' : 'Solicitação de reembolso'} </h1>
                    <p className="text-gray-200 text-sm mb-10"
                    > {!params.id && 'Dados da dispesa para solicitar reembolso.'} </p>
                </header>
                <Input value={name}
                    onChange={(e) => setName(e.target.value)}
                    required legend="nome da solicitação"
                    disabled={!!params.id}
                />
                <div className="flex gap-4 items-center">
                    <Select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required legend="categoria"
                        disabled={!!params.id}
                    >
                        {
                            CATEGORIES_KEYS.map((category) => (
                                <option value={CATEGORIES[category].name}
                                    key={category}> {CATEGORIES[category].name} </option>
                            ))
                        }

                    </Select>
                    <Input
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)} 
                        required legend="valor"
                        type={params.id ? 'text' : 'number'}
                        placeholder="0,00"
                        disabled={!!params.id}
                    />
                </div>

                {
                    params.id ? (<a
                        className="text-sm text-green-100 font-semibold flex items-center justify-center gap-2 hover:opacity-70 ease-linear"
                        href={`https://refound-api.onrender.com/uploads/${fileUrl}`} target="_blank">
                        <img src={fileIcon} alt="icone de arquivo" />
                        Abrir comprovante
                    </a>
                    ) : (
                        <Upload
                            filename={filename && filename.name}
                            onChange={(e) => e.target.files && setFilename(e.target.files[0])}
                        />
                    )
                }

                {
                    errorMessage && <p className="text-sm font-medium text-warning my-4">
                        {errorMessage}
                    </p>
                }

                <Button
                    isLoading={isLoad}
                    type="submit">
                    {params.id ? 'Voltar' : 'Enviar'}
                </Button>
            </form>
        </div>
    )
}