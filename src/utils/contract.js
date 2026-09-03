import { apiClient } from "./apiClient";

export const getContractTypes = async () => {
    try {
        const response = await apiClient("/api/employment/contractTypes");
        if (!response.ok) {
            throw new Error(`Error al obtener tipos de contrato: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en getContractTypes:', error);
        return null;
    }
};

export const createContractType = async (contractData) => {
    try {
        const response = await apiClient("/api/employment/contractTypes", {
            method: 'POST',
            body: JSON.stringify(contractData),
        });
        if (!response.ok) {
            throw new Error(`Error al crear tipo de contrato: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en createContractType:', error);
        return null;
    }
};

export const updateContractType = async (contractData) => {
    try {
        const response = await apiClient("/api/employment/contractTypes", {
            method: 'PUT',
            body: JSON.stringify(contractData),
        });
        if (!response.ok) {
            throw new Error(`Error al actualizar tipo de contrato: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en updateContractType:', error);
        return null;
    }
};

export const deleteContractType = async (id) => {
    try {
        const response = await apiClient(`/api/employment/contractTypes/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Error al eliminar tipo de contrato: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en deleteContractType:', error);
        return null;
    }
};