
export const getProjects = async () => {
    try {
        const response = await fetch('https://fundesoemcotrackerbackend-production.up.railway.app/api/project');
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