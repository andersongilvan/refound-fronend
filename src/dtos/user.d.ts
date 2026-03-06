type UseApiRole = 'employee' | 'manager'

type UserApiResponse = {
    token: string
    user: {
        id: string
        name: string
        role: UseApiRole
    }
}