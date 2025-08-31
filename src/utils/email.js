import { API_URL } from "../config/config.env";

export const sendPassword = async (data) => {
    try {
        const response = await fetch(`${API_URL}/api/email/send-password`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
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