import { API_URL } from "../config/config.env";
export const getProjects = async () => {
    try {
        const response = await fetch(`${API_URL}/api/project`);
        if (!response.ok) {
            throw new Error(`Error al obtener proyectos: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en getProyects:', error);
        return null;
    }
};