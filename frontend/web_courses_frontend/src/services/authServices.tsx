import api from '../api/axiosConfig';

export const login = async (userName: string, password: string) => {

  try {
    // Backend login endpoint expects GET query params email and password.
    console.log(`[authService]::login() - Attempting login with user: ${userName} and password: ${password}`)  // Debug: Verificar los parámetros enviados al backend
    const response = await api.get('/login', {
      params: { userName, password },
    });
    console.log(`[authService]::login() - API response:`, response)  // Debug: Verificar la respuesta completa del backend
    const data = response.data
    localStorage.setItem('userData', JSON.stringify(data.user))
    if (data.token) {
      localStorage.setItem('authToken', data.token)
    }
    localStorage.setItem('isAuthenticated', 'true')
  } catch (error: any) {
    // Manejo de errores (ej. usuario no encontrado)
    throw error?.response?.data || new Error('Error de red');
  }
}

export const logout = () => {
  // Eliminar datos de usuario y token del almacenamiento local
  localStorage.removeItem('userData');
  localStorage.removeItem('authToken');
  localStorage.removeItem('isAuthenticated');
}

