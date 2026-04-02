import toast from 'react-hot-toast';
import api from '../api/axiosConfig';
import { logoutLocalStorage, setLocalStorageUser } from './LocalStorageUser';
import type { InterfaceUser } from '../Interfaces/InterfaceUser';

export const login = async (userName: string, password: string) => {

  try {
    // Backend login endpoint expects GET query params email and password.
    console.log(`[authService]::login() - Attempting login with user: ${userName} and password: ${password}`)  // Debug: Verificar los parámetros enviados al backend
    const response = await api.post('/users/login', {
      name_or_email: userName,
      password: password
    });
    console.log(`[authService]::login() - API response:`, response)  // Debug: Verificar la respuesta completa del backend
    const data = response.data
    setLocalStorageUser(data)
    toast.success('Logged in successfully!');
    return data;
  } catch (error: any) {
    // Manejo de errores (ej. usuario no encontrado)
    throw error?.response?.data || new Error('Error de red');
  }
}

export const register = async (userName: string, email: string, password: string) => {
  try {
    console.log(`[authService]::register() - Attempting register with user: ${userName}, email: ${email} and password: ${password}`)
    const newUser: InterfaceUser = {
      name: userName,
      email: email,
      password: password,
      role: "student"
    }
    const response = await api.post('/users/', newUser)
    toast.success('Registered successfully!');
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || new Error('Error de red');
  }
}

export const logout = () => {
  // Eliminar datos de usuario y token del almacenamiento local
  logoutLocalStorage()
  toast.success('Logged out successfully!');
}
