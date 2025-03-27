export interface UserSignup {
    id: number
    name: string
    email: string
}

export interface UserDetails {
    id: number
    name: string
    email: string
    role: string
    isDeleted: boolean,
    createdAt: Date
}