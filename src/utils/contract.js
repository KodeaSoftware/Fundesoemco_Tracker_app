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

export const createContractType = async (contractData) => {
    try {
        const response = await fetch(`${API_URL}/api/employment/contractTypes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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