import { Role } from "@prisma/client"

export interface UserSignup {
    id: number
    name: string
    email: string
}

export interface UserDetails {
    id: number
    name: string
    email: string
    role: Role
    isDeleted: boolean,
    createdAt: Date
}