import { apiClient } from "./apiClient";

// get coordinadores
export const getCoordinadores = async () => {
  try {
    const response = await apiClient("/api/coordinator");
    if (!response.ok) {
      throw new Error(`Error al obtener coordinadores: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.Data;
  } catch (error) {
    console.error('Error en getCoordinator:', error);
    return null;
  }
};

// Crear Coordinador
export const createCoordinador = async (coordinador) => {
  try {
    const response = await apiClient("/api/coordinator", {
      method: 'POST',
      body: JSON.stringify(coordinador),
    });

    if (!response.ok) {
      throw new Error(`Error al crear coordinador: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en createCoordinador:', error);
    throw error;
  }
};

// Actualizar Coordinador por ID 
export const updateCoordinador = async (updates) => {
  try {
    const response = await apiClient("/api/coordinator", {
      method: 'PUT',
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar coordinador: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en updateCoordinador:', error);
    throw error;
  }
};

// 🗑️ Delete coordinador by ID
export const deleteCoordinador = async (id) => {
  try {
    const response = await apiClient(`/api/coordinator/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar coordinador: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en deleteCoordinador:', error);
    throw error;
  }
};
