import { supabase } from "../../supabase-client";

export async function bulkCreateEmployees(employees) {
  // employees: array de objetos { nombre, cedula, ... }
  const { data, error } = await supabase.from("employee").insert(employees);
  if (error) throw error;
  return data;
}
