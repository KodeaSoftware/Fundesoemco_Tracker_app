import { supabase } from "../../supabase-client";


// 🔍 Get all coordinadores
export const getCoordinadores = async () => {
    const { data, error } = await supabase.from('coordinator').select('*');
    if (error) throw error;
    return data;
  };
  
  // 🔍 Get one employee by cedula
  export const getCoordinadorByCedula = async (cedula) => {
    const { data, error } = await supabase.from('coordinator').select('*').eq('cedula', cedula).single();
    if (error) throw error;
    return data;  
  };
  
    // 🔍 Get one employee by id
    export const getCoordinadorById = async (id) => {
      const { data, error } = await supabase.from('coordinator').select('*').eq('id', id).single();
      if (error) throw error;
      return data;  
    };

  // ➕ Add new employee
  export const createCoordinador = async (coordinador) => {
    const { data, error } = await supabase.from('coordinator').insert([coordinador]);
    if (error) throw error;
    return data;
  };
  
  // ✏️ Update employee by ID
  export const updateCoordinador = async (id, updates) => {
    const { data, error } = await supabase.from('coordinator').update(updates).eq('id', id);
    if (error) throw error;
    return data;
  };
  
  // 🗑️ Delete coordinador by ID
  export const deleteCoordinador = async (id) => {
    const { data, error } = await supabase.from('coordinator').delete().eq('id', id);
    if (error) throw error;
    window.location.reload();
    return data;
  };

  // Crear nueva cuenta de usuario
  export const crearCuenta = async (correo, contraseña, datosUsuario = {}) => {
    const { data, error } = await supabase.auth.signUp({
      email: correo,
      password: contraseña
    });
    
    if (error) {
      throw error;
    }
    
    return {
      success: true,
      user: data.user,
      session: data.session
    };
  }

  // Obtener la sesión actual del usuario
  export const obtenerSesionActual = async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  }

  // Verificar si el usuario está autenticado
  export const verificarAutenticacion = async () => {
    const session = await obtenerSesionActual();
    return !!session;
  }

  // Obtener el usuario actual
  export const obtenerUsuarioActual = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }

  // Cerrar sesión
  export const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  }

  // Iniciar sesión con credenciales existentes
  export const iniciarSesion = async (correo, contraseña) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contraseña
    });
    
    if (error) {
      throw error;
    }
    
    return {
      success: true,
      user: data.user,
      session: data.session
    };
  }