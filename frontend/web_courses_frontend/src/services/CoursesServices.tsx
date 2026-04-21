import api from "../api/axiosConfig";
import type { InterfaceQueryCourses } from "../Interfaces/InterfaceCourse";

export const getCourses = async (skip: number, limit: number, query?: string):
    Promise<InterfaceQueryCourses> => {
    try {
        const response = await api.get('/courses/', {
            params: { skip, limit, query }
        });
        return response.data
    } catch (error: any) {
        throw new Error('Error de red')
    }
}