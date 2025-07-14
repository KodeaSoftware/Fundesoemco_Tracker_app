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
            throw new Error(`Error al crear empleado: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Login exitoso:', data);
        window.location = "/"
        return data;
    } catch (error) {
        console.error('Error en createEmployee:', error);
        throw error;
    }
}