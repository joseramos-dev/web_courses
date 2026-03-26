import api from "../api/axiosConfig";
import type { InterfaceUser } from "../Interfaces/InterfaceUser";
import { setLocalStorageUser } from "./LocalStorageUser";


export const updateUser = async (userData:InterfaceUser) =>{
    try{
        // TODO : añadir seguridad, que compruebe que el nombre no este repetido
        console.log(`[authService]::updateUser() actualizando valores de user: ${userData.id}, ${userData.name}`)
        const response = await api.put('/update', userData)
        setLocalStorageUser(userData)
        return response.data;
    }catch(error:any){
        throw error?.response?.data || new Error('Error de red');
    }
}