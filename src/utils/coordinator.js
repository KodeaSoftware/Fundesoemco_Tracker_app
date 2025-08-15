import { API_URL } from "../config/config.env";
// get coordinadores
export const getCoordinadores = async () => {
  try {
    const response = await fetch(`${API_URL}/api/coordinator`);
    if (!response.ok) {
      throw new Error(`Error al obtener coordinadores: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data)
    return data.Data;
  } catch (error) {
    console.error('Error en getCoordinator:', error);
    return null;
  }
};

// Crear Coordinador
export const createCoordinador = async (coordinador) => {
  try {
    const response = await fetch(`${API_URL}/api/coordinator`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coordinador),
    });

    if (!response.ok) {
      throw new Error(`Error al crear empleado: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Empleado creado:', data);
    window.location.reload()
    return data;
  } catch (error) {
    console.error('Error en createEmployee:', error);
    throw error;
  }
};

// Actualizar Coordinador por ID 
export const updateCoordinador = async (updates) => {
  try {
    const response = await fetch(`${API_URL}/api/coordinator`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar empleado: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Empleado actualizado:', data);
    window.location.reload()
    return data;
  } catch (error) {
    console.error('Error en updateEmployee:', error);
    throw error;
  }
};

// 🗑️ Delete coordinador by ID
export const deleteCoordinador = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/coordinator`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar coordinador: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Empleado eliminado:', data);
    window.location.reload()
    return data;
  } catch (error) {
    console.error('Error en deleteEmployee:', error);
    throw error;
  }
};
