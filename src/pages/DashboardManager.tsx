import { useEffect, useState } from "react";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import lupa from '../assets/icons/lupa.svg'
import { RefoundItem, type RefoundItemsProps } from "../components/RefoundItem";
import { CATEGORIES } from "../utils/categies";
import { formatCurrency } from "../utils/formatCurrency";
import { Pagination } from "../components/Pagination";
import { api } from "../services/api";
import { AxiosError } from "axios";
import type { RefoundsPaginationResponse } from "../dtos/refound";



const PER_PAGE = 10

export function DashBoard() {

    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [name, setName] = useState('')
    const [refounds, setRefounds] = useState<RefoundItemsProps[]>([])

    async function fethRefounds() {
        try {
            const response = await api.get<RefoundsPaginationResponse>(`/refound?name=${name.trim()}&page=${page}&perPage=${PER_PAGE}`)

            setRefounds(response.data.items.map((refound) => ({
                username: refound.user.name,
                id: refound.id,
                name: refound.name,
                category: refound.category,
                amount: formatCurrency(refound.amount),
                categoryImg: CATEGORIES[refound.category].icon
            })))

            setTotalPages(response.data.totalPages)

        } catch (error) {
            if (error instanceof AxiosError) {
                return alert(error.message)
            }
        }
    }

    function handlerPagination(action: 'next' | 'previous') {
        setPage((prevPage) => {
            if (action === 'next' && prevPage < totalPages) {
                return prevPage + 1
            }

            if (action === 'previous' && prevPage > 1) {
                return prevPage - 1
            }

            return prevPage
        })
    }

    useEffect(() => {
        fethRefounds()
    }, [page, name])

    return (
        <div className="bg-gray-500 max-w-5xl mx-auto rounded-lg md:min-w-3xl p-10">
            <h1 className="text-gray-100 font-bold text-xl flex-1"
            >Solicitações</h1>

            <form className="flex gap-2"
                onSubmit={(e) => { e.preventDefault(), fethRefounds() }}>
                <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Pesquisar pelo nome" />
                <Button
                    type="submit"
                    variant="icon">
                    <img src={lupa} alt="" />
                </Button>
            </form>
            <main className="mt-6 flex flex-col gap-4 px-1 max-h-85.75 overflow-x-scroll">
                {
                    refounds.map((item) => <RefoundItem key={item.id} data={item} href={`/refound/${item.id}`} />)
                }
            </main>
            <Pagination
                onNext={() => handlerPagination('next')}
                onPrevious={() => handlerPagination('previous')}
                current={page} total={totalPages} />
        </div>
    )
}