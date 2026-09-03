import { apiClient } from "./apiClient";

export const getProjects = async () => {
    try {
        const response = await apiClient("/api/project");
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

export const getProjectById = async (projectId) => {
    try {
        const response = await apiClient(`/api/project/${projectId}`);
        if (!response.ok) {
            throw new Error(`Error al obtener proyecto: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en getProjectById:', error);
        return null;
    }
};

export const createProject = async (project) => {
    try {
        const response = await apiClient("/api/project", {
            method: 'POST',
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            throw new Error(`Error al crear el proyecto: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en createProject:', error);
        throw error;
    }
};

export const updateProject = async (project) => {
    try {
        const response = await apiClient("/api/project", {
            method: 'PUT',
            body: JSON.stringify(project),
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar el proyecto: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en updateProject:', error);
        throw error;
    }
};

// 🗑️ Eliminar proyecto por ID
export const deleteProject = async (id) => {
    try {
        const response = await apiClient(`/api/project/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar proyecto: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en deleteProject:', error);
        throw error;
    }
};

export const getEmployeeByIdProjecAndContract = async (employeeInfo) => {
    try {
        const response = await apiClient("/api/employeeListProject", {
            method: 'POST',
            body: JSON.stringify(employeeInfo),
        });

        if (!response.ok) {
            throw new Error(`Error al traer el proyecto con los empleados: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.DataEmployee;
    } catch (error) {
        console.error('Error en getEmployeeByIdProjecAndContract:', error);
        throw error;
    }
};