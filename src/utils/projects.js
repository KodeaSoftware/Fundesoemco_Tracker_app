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

export const createProject = async (project) => {
    try {
        const response = await fetch(`${API_URL}/api/project`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            throw new Error(`Error al crear el proyecto: ${response.status} ${response.statusText}`);
        }

        const data = await response.json(); 7
        window.location.reload()
        return data;
    } catch (error) {
        console.error('Error en createProject:', error);
        throw error;
    }
};

export const getEmployeeByIdProjecAndContract = async (employeeInfo) => {
    try {
        const response = await fetch(`${API_URL}/api/employeeListProject`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(employeeInfo),
        });

        if (!response.ok) {
            throw new Error(`Error al traer el proyecto con los empleados: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log(data)
        return data.DataEmployee;
    } catch (error) {
        console.error('Error en createProject:', error);
        throw error;
    }
};