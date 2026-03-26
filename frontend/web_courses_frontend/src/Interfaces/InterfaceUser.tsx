
export interface InterfaceUser {
    id: number,
    name: string,
    email: string,
    password?: string,
    role: 'admin' | 'student' | 'instructor',
    date_creation: string
}

