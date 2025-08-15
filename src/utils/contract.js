
export const getContractTypes = async () => {
    try {
        const response = await fetch('https://fundesoemcotrackerbackend-production.up.railway.app/api/employment/contractTypes');
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