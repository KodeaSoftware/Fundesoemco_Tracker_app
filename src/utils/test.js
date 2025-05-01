import { supabase } from "../../supabase-client";

async function getUsers() {
  const { data, error } = await supabase
    .from("users") // nombre de tu tabla
    .select("*"); // selecciona la columna que deseas

  if (error) {
    console.error("Error al obtener usuarios:", error);
  }

  data.map((usuario) => {
    console.log("Usuario:", usuario);
  });
}

export default getUsers;
