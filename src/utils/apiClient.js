import { API_URL } from "../config/config.env";

/**
 * Cliente HTTP centralizado que automáticamente:
 * - Adjunta el token JWT en el header Authorization
 * - Redirige al login si recibe un 401
 * - Usa la API_URL configurada
 */
export async function apiClient(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const defaultHeaders = {
        "Content-Type": "application/json",
    };

    // Si hay token, agregarlo al header
    if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
    }

    // No sobreescribir Content-Type si es FormData (para uploads)
    if (options.body instanceof FormData) {
        delete defaultHeaders["Content-Type"];
    }

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    const response = await fetch(`${API_URL}${endpoint}`, config);

    // Si el token expiró o es inválido, redirigir al login
    if (response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("correo");
        localStorage.removeItem("role");
        window.location.href = "/login";
        throw new Error("Sesión expirada. Redirigiendo al login...");
    }

    return response;
}
