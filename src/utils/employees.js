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

// 📝 Record attendance for an employee
export const recordAttendance = async (cedula, idProject) => {
  try {
    const response = await fetch(`${API_URL}/api/employee/attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cedula: parseInt(cedula), idProject }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error al registrar asistencia: ${response.status}`);
    }

    const data = await response.json();
    console.log("Asistencia registrada:", data);
    return data;
  } catch (error) {
    console.error("Error en recordAttendance:", error);
    throw error;
  }
};

// Función para formatear datos de asistencia para el gráfico semanal
export const formatAttendanceForChart = (attendanceData) => {
  if (!attendanceData || !Array.isArray(attendanceData)) {
    return [];
  }

  // Nombres de días en español
  const diasSemana = [    'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
  // Inicializar contadores para cada día de la semana
  const contadoresPorDia = {
  
    'Lunes': 0,
    'Martes': 0,
    'Miércoles': 0,
    'Jueves': 0,
    'Viernes': 0,
    'Sábado': 0,
    'Domingo': 0
  };

  // Procesar cada registro de asistencia
  attendanceData.forEach(registro => {
    // Usar hora_asistencia como fuente principal, con fallback a fecha_asistencia
    const fechaAsistencia = registro.hora_asistencia || registro.fecha_asistencia;
    const estado = registro.estado || registro.status;
    
    if (fechaAsistencia && (estado === 'puntual' || estado === 'tarde')) {
      try {
        // Convertir la fecha/hora a objeto Date
        const fecha = new Date(fechaAsistencia);
        
        // Verificar que la fecha sea válida
        if (isNaN(fecha.getTime())) {
          return;
        }
        
        // Obtener el día de la semana (0 = Domingo, 1 = Lunes, etc.)
        const diaSemana = fecha.getDay();
        
        // El array diasSemana empieza en Lunes (indice 0), pero getDay() devuelve 0 para Domingo.
        // Mapeo: 1=Lun(0), 2=Mar(1), 3=Mie(2), 4=Jue(3), 5=Vie(4), 6=Sab(5), 0=Dom(6)
        const indiceDia = diaSemana === 0 ? 6 : diaSemana - 1;
        const nombreDia = diasSemana[indiceDia];
        
        // Incrementar el contador
        if (nombreDia && contadoresPorDia[nombreDia] !== undefined) {
          contadoresPorDia[nombreDia]++;
        }
      } catch (error) {
        console.error('Error procesando fecha de asistencia:', fechaAsistencia, error);
      }
    }
  });

  // Convertir el objeto a array para el gráfico
  const chartData = diasSemana.map(dia => ({
    dia: dia,
    puntual: contadoresPorDia[dia]
  }));

  return chartData;
};

// 📥 Download Excel template
export const downloadEmployeeTemplate = async () => {
  try {
    const response = await fetch(`${API_URL}/api/employee/template`);
    if (!response.ok) throw new Error("Error al descargar la plantilla");
    
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'plantilla_empleados.xlsx';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error al descargar plantilla:", error);
    throw error;
  }
};

// 🚀 Bulk Upload Employees Excel
export const bulkUploadEmployeesExcel = async (file) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/api/employee/bulk`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en la carga masiva");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en bulkUploadEmployeesExcel:", error);
    throw error;
  }
};




