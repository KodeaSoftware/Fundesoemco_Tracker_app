import { API_URL } from "../config/config.env";
export const getContractTypes = async () => {
    try {
        const response = await fetch(`${API_URL}/api/employment/contractTypes`);
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