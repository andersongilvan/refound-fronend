export type RefoundApiResponse = {
    id: string
    name : string
    amount: number
    category: CategoriesApiEnum
    createdAt: string
    filename: string

    user: {
        name: string
    }
}

type RefoundsPaginationResponse = {
    items: RefoundApiResponse[],
   
        page: number
        perPage: number
        totalItems: number
        totalPages: number
 
}