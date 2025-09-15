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
    console.log('Respuesta completa de getAttendance:', data);

    // Verificar si los datos están en una propiedad específica
    if (data && data.Data) {
      console.log('Datos encontrados en data.Data:', data.Data);
      return data.Data;
    } else if (Array.isArray(data)) {
      console.log('Datos son un array directo:', data);
      return data;
    } else {
      console.log('Estructura de datos inesperada:', data);
      return data;
    }
  } catch (error) {
    console.error('Error en getAttendance:', error);
    return null;
  }
};

// Funciones para calcular estadísticas del día actual
export const calculateDailyStats = (attendanceData) => {
  if (!attendanceData || !Array.isArray(attendanceData)) {
    return {
      presentes: 0,
      ausentes: 0,
      tardes: 0,
      totalEmpleados: 0,
      porcentajeAsistencia: 0,
      horasPromedio: 0
    };
  }

  console.log('Datos de asistencia recibidos:', attendanceData);

  // Como el endpoint se borra diariamente, todos los datos son del día actual
  const presentes = attendanceData.filter(item => item.status === 'puntual').length;
  const tardes = attendanceData.filter(item => item.status === 'tarde').length;
  const ausentes = attendanceData.filter(item => item.status === 'ausente' || item.status === 'no_asistio').length;

  // Total de empleados registrados en el sistema
  const totalEmpleados = attendanceData.length;

  const porcentajeAsistencia = totalEmpleados > 0 ? Math.round(((presentes + tardes) / totalEmpleados) * 100) : 0;

  // Calcular horas promedio (asumiendo 8 horas de trabajo por día)
  const horasPromedio = presentes + tardes > 0 ? 8 : 0;

  console.log('Estadísticas calculadas:', {
    presentes: presentes + tardes,
    ausentes,
    tardes,
    totalEmpleados,
    porcentajeAsistencia,
    horasPromedio
  });

  return {
    presentes: presentes + tardes, // Incluir tardes como presentes
    ausentes,
    tardes,
    totalEmpleados,
    porcentajeAsistencia,
    horasPromedio
  };
};

// Función para obtener estadísticas para gráficos
export const getChartData = (attendanceData) => {
  console.log('getChartData recibió:', attendanceData);
  console.log('Tipo de datos:', typeof attendanceData);
  console.log('Es array:', Array.isArray(attendanceData));

  if (!attendanceData || !Array.isArray(attendanceData)) {
    console.log('Datos no válidos, devolviendo datos por defecto');
    // Crear datos por defecto para la semana
    const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const barChartData = dias.map(dia => ({
      mes: dia,
      asistencias: 0
    }));

    return {
      pieChartData: [
        { name: "Asistencias", value: 0 },
        { name: "Inasistencias", value: 0 },
        { name: "Excusa", value: 0 }
      ],
      barChartData
    };
  }

  console.log('Datos para gráficos:', attendanceData);
  console.log('Primer elemento:', attendanceData[0]);

  // Como el endpoint se borra diariamente, todos los datos son del día actual
  const asistencias = attendanceData.filter(item => item.status === 'puntual').length;
  const tardes = attendanceData.filter(item => item.status === 'tarde').length;
  const inasistencias = attendanceData.filter(item => item.status === 'ausente' || item.status === 'no_asistio').length;

  // Datos para el gráfico de pie
  const pieChartData = [
    { name: "Asistencias", value: asistencias + tardes },
    { name: "Inasistencias", value: inasistencias },
    { name: "Excusa", value: 0 } // Por ahora sin excusas
  ];

  // Datos para el gráfico de barras (organizando por días de la semana)
  const barChartData = [];
  const dias = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Agrupar datos por día de la semana usando la información de fecha
  const datosPorDia = {};

  // Inicializar todos los días de la semana con 0
  for (let i = 0; i < 7; i++) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() - (6 - i)); // Últimos 7 días
    const diaKey = fecha.toISOString().split('T')[0]; // YYYY-MM-DD
    const diaNombre = dias[fecha.getDay()];
    datosPorDia[diaKey] = {
      nombre: diaNombre,
      asistencias: 0,
      inasistencias: 0
    };
  }

  // Procesar datos reales de asistencia
  console.log('Procesando datos de asistencia...');
  attendanceData.forEach((item, index) => {
    console.log(`Procesando item ${index}:`, item);

    if (item.time) {
      const fechaItem = new Date(item.time);
      const diaKey = fechaItem.toISOString().split('T')[0];
      console.log(`Fecha procesada: ${diaKey}, Status: ${item.status}`);

      if (datosPorDia[diaKey]) {
        if (item.status === 'puntual' || item.status === 'tarde') {
          datosPorDia[diaKey].asistencias++;
          console.log(`Incrementando asistencias para ${diaKey}: ${datosPorDia[diaKey].asistencias}`);
        } else if (item.status === 'ausente' || item.status === 'no_asistio') {
          datosPorDia[diaKey].inasistencias++;
          console.log(`Incrementando inasistencias para ${diaKey}: ${datosPorDia[diaKey].inasistencias}`);
        }
      } else {
        console.log(`Fecha ${diaKey} no encontrada en datosPorDia`);
      }
    } else {
      console.log(`Item ${index} no tiene campo time:`, item);
    }
  });

  // Convertir a formato para el gráfico
  console.log('Datos por día antes de convertir:', datosPorDia);

  Object.values(datosPorDia).forEach(dia => {
    barChartData.push({
      mes: dia.nombre,
      asistencias: dia.asistencias
    });
  });

  console.log('Datos de gráficos calculados:', { pieChartData, barChartData });
  console.log('BarChartData final:', barChartData);

  return {
    pieChartData,
    barChartData
  };
};