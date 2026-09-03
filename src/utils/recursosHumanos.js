import { apiClient } from "./apiClient";

// Obtener todos los usuarios RRHH
export const getRecursosHumanos = async () => {
  try {
    const response = await apiClient("/api/recursos-humanos");
    if (!response.ok) {
      throw new Error(`Error al obtener RRHH: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.Data || data;
  } catch (error) {
    console.error('Error en getRecursosHumanos:', error);
    return null;
  }
};

// Crear usuario RRHH
export const createRecursosHumanos = async (data) => {
  try {
    const response = await apiClient("/api/recursos-humanos", {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al crear RRHH: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error en createRecursosHumanos:', error);
    throw error;
  }
};

// Actualizar usuario RRHH
export const updateRecursosHumanos = async (data) => {
  try {
    const response = await apiClient("/api/recursos-humanos", {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar RRHH: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error en updateRecursosHumanos:', error);
    throw error;
  }
};

// Eliminar usuario RRHH
export const deleteRecursosHumanos = async (id) => {
  try {
    const response = await apiClient(`/api/recursos-humanos/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar RRHH: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error en deleteRecursosHumanos:', error);
    throw error;
  }
};
