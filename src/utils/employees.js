import { API_URL } from "../config/config.env";
export const getEmployees = async () => {
  try {
    const response = await fetch(`${API_URL}/api/employee`);
    if (!response.ok) {
      throw new Error(`Error al obtener empleados: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data)
    return data.Data;
  } catch (error) {
    console.error('Error en getEmployees:', error);
    return null;
  }
};


export const createEmployee = async (employee) => {
  try {
    const response = await fetch(`${API_URL}/api/employee`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employee),
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




// ✏️ Update employee by ID
export const updateEmployee = async (updates) => {
  try {
    const response = await fetch(`${API_URL}/api/employee/`, {
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

// 🗑️ Delete employee by ID
export const deleteEmployee = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/employee/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar empleado: ${response.status} ${response.statusText}`);
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


export const getAttendance = async () => {
  try {
    const response = await fetch(`${API_URL}/api/employee/attendance`);
    if (!response.ok) {
      throw new Error(`Error al obtener asistencia: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();

    // Verificar si los datos están en una propiedad específica
    if (data && data.Data) {
      return data.Data;
    } else if (Array.isArray(data)) {
      return data;
    } else {
      return data;
    }
  } catch (error) {
    return null;
  }
};
