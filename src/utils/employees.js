import { supabase } from "../../supabase-client";

// Get all employees

export const getEmployees = async () => {
  try {
    const response = await fetch('https://fundesoemcotrackerbackend-production.up.railway.app/api/employee');
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




// 🔍 Get one employee by cedula
export const getEmployeeByCedula = async (cedula) => {
  const { data, error } = await supabase
    .from("employee")
    .select("*")
    .eq("cedula", cedula)
    .single();
  if (error) throw error;
  return data;
};

// 🔍 Get one employee by id
export const getEmployeeById = async (id) => {
  const { data, error } = await supabase
    .from("employee")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
};

export const createEmployee = async (employee) => {
  const { data, error } = await supabase
    .from("employee")
    .insert([employee]); // sin select


  if (error) throw error;
  console.log("insert result:", data); // <-- muy importante
  return data;
};




// ✏️ Update employee by ID
export const updateEmployee = async (id, updates) => {
  const { data, error } = await supabase
    .from("employee")
    .update(updates)
    .eq("id", id);
  if (error) throw error;
  return data;
};

// 🗑️ Delete employee by ID
export const deleteEmployee = async (id) => {
  const { data, error } = await supabase.from("employee").delete().eq("id", id);
  if (error) throw error;
  window.location.reload();
  return data;
};
