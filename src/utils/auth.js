import { API_URL } from "../config/config.env";

export const login = async (auth) => {
    try {
        const response = await fetch(`${API_URL}/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(auth),
        });

        if (!response.ok) {
            let serverError = "";
            try {
                const errorData = await response.json();
                serverError = errorData?.message || "";
            } catch {
                // Si la respuesta no es JSON válido
            }

            // Si el backend responde con error de credenciales o 500, mostrar mensaje amigable
            if (
                response.status === 401 ||
                response.status === 404 ||
                response.status === 500 ||
                serverError.includes("500") ||
                serverError.toLowerCase().includes("internal") ||
                serverError.toLowerCase().includes("contrase") ||
                serverError.toLowerCase().includes("encontrado") ||
                serverError.toLowerCase().includes("failed auth")
            ) {
                throw new Error("Correo o contraseña incorrectos");
            }

            throw new Error(serverError || "Correo o contraseña incorrectos");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error en login:', error);
        if (error.name === "TypeError" && error.message.includes("fetch")) {
            throw new Error("No se pudo conectar con el servidor. Por favor, intenta de nuevo.");
        }
        throw error;
    }
}

export const forgotPassword = async (correo) => {
    try {
        const response = await fetch(`${API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al solicitar recuperación');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en forgotPassword utility:', error);
        throw error;
    }
}

export const resetPassword = async (data) => {
    try {
        const response = await fetch(`${API_URL}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al resetear contraseña');
        }

        return await response.json();
    } catch (error) {
        console.error('Error en resetPassword utility:', error);
        throw error;
    }
}