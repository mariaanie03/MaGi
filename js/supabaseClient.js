// js/supabaseClient.js

// 1. Importa a função 'createClient' diretamente do CDN oficial do Supabase.
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// 2. Suas credenciais do Supabase.
const supabaseUrl = 'https://crlcdyiuyqgkyeuiahgb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNybGNkeWl1eXFna3lldWlhaGdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxNzgyNzUsImV4cCI6MjA2NTc1NDI3NX0.y_rIdqY6ducucO0lTX4KjbxdJsD10V4BImKTKizk6O4';

// 3. Cria a instância do cliente Supabase e a EXPORTA.
//    A palavra 'export' permite que outros arquivos a importem.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

console.log('Cliente Supabase inicializado a partir de supabaseClient.js');
