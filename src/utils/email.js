import { apiClient } from "./apiClient";

export const sendPassword = async (data) => {
    try {
        const response = await apiClient("/api/email/send-password", {
            method: 'POST',
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`Error al enviar la contraseña: ${response.status} ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error en sendPassword:', error);
        throw error;
    }
};