import { useEffect, useState } from "react"
import { RefoundItem, type RefoundItemsProps } from "../components/RefoundItem"
import { Pagination } from "../components/Pagination"
import { api } from "../services/api"
import { useAuth } from "../hooks/useAuth"
import type { RefoundsPaginationResponse } from "../dtos/refound"
import { CATEGORIES } from "../utils/categies"
import { formatCurrency } from "../utils/formatCurrency"
import trashIcon from '../assets/icons/trash-icon.svg'

const PER_PAGE = 10

export function EmployeeDshboard() {

    const userAut = useAuth()


    const [page, setPage] = useState(1)

    const [totalPages, setTotalPages] = useState(1)
    const [refounds, setRefounds] = useState<RefoundItemsProps[]>([])


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

    async function loadRefounds() {

        const response = await api.get<RefoundsPaginationResponse>(`/refound/my?page=${page}&perPage=${PER_PAGE}`)

        setRefounds(response.data.items.map((item) => {
            return {
                username: '',
                id: item.id,
                name: item.name,
                category: item.category,
                amount: formatCurrency(item.amount),
                categoryImg: CATEGORIES[item.category].icon
            }
        }))

        console.log(response)
    }

    async function deleteRefound(id: string) {
        await api.delete(`/refound/${id}`)

        setRefounds((prev) => {
            return prev.filter((refound) => refound.id !== id)
        })

    }


    useEffect(() => {
        loadRefounds()
    }, [])


    return (
        <div className="bg-gray-500 max-w-5xl mx-auto rounded-lg md:min-w-3xl p-10">
            <div>
                <h1 className="text-gray-100 font-bold text-xl flex-1"
                >Minhas solicitações</h1>

                <a
                className="text-sm font-semibold text-green-100 underline hover:opacity-50 transition ease-linear"
                href="/refound">Nova solicitação</a>

            </div>

            <main className="mt-6 flex flex-col gap-4 px-1 max-h-[343px] overflow-x-scroll">
                {
                    refounds.map((refound) => <RefoundItem key={refound.id} data={refound}>
                        <img
                            onClick={() => deleteRefound(refound.id)}
                            className="w-4 h-4" src={trashIcon} alt="icone-deletar" />
                    </RefoundItem>)
                }
            </main>

            <Pagination
                current={page}
                total={totalPages}
                onNext={() => handlerPagination('next')}
                onPrevious={() => handlerPagination('previous')}
            />
        </div>
    )
}