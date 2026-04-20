export const login = async (auth) => {
    try {
        const response = await fetch('http://localhost:4123/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(auth),
        });

        if (!response.ok) {
            throw new Error(`Error al iniciar sesión: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Login exitoso:', data);
        window.location = "/"
        return data;
    } catch (error) {
        console.error('Error en login:', error);
        throw error;
    }
}

export const forgotPassword = async (correo) => {
    try {
        const response = await fetch('http://localhost:4123/auth/forgot-password', {
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
        const response = await fetch('http://localhost:4123/auth/reset-password', {
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