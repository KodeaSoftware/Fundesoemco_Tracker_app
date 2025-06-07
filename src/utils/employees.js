import { supabase } from "../../supabase-client";

// 🔍 Get all employees
export const getEmployees = async () => {
  const { data, error } = await supabase.from("employee").select();
  if (error) throw error;
  return [...data, data].sort((a, b) => a.cedula - b.cedula);
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

// ➕ Add new employee
export const createEmployee = async (employee) => {
  const { data, error } = await supabase.from("employee").insert([employee]);
  if (error) throw error;
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
