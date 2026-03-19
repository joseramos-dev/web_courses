
export interface InterfaceUser {
    id: number,
    name: string,
    email: string,
    password?: string,
    role: 'admin' | 'user' | 'instructor',
    date_creation: string
}

