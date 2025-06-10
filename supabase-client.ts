// Archivo inicial de configuración y conexion con supabase

import { createClient } from "@supabase/supabase-js";

const SUPABASEURL = import.meta.env.VITE_SUPABASE_URL; // URL de Supabase
const SUPABASEKEY = import.meta.env.VITE_SUPABASE_KEY; // API Key de Supabase

export const supabase = createClient(SUPABASEURL, SUPABASEKEY);

