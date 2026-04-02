import type { InterfaceUser } from "../Interfaces/InterfaceUser";

const setLocalStorageUser = (user: InterfaceUser, token?: any) => {
    localStorage.setItem('userData', JSON.stringify(user))
    if (token)
        localStorage.setItem('authToken', token)
    localStorage.setItem('isAuthenticated', 'true')
}

const getLocalStorageUser = () => {
    return localStorage.getItem('userData')
}

const getLocalStorageAuth = () => {
    return localStorage.getItem('authToken')
}

const checkIfLogged = (): boolean => {
    const a = localStorage.getItem('isAuthenticated') === 'true'
    const b = localStorage.getItem('userData') !== null
    const c = localStorage.getItem('userData') !== 'undefined'
    return (a && b && c)
}

const logoutLocalStorage = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('authToken');
    localStorage.removeItem('isAuthenticated');
}

export { setLocalStorageUser, getLocalStorageUser, getLocalStorageAuth, checkIfLogged, logoutLocalStorage }