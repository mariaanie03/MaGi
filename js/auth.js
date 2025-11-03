// js/auth.js

// 1. Importa a constante 'supabase' que foi exportada pelo supabaseClient.js.
import { supabase } from './supabaseClient.js';

// --- LÓGICA DE LOGIN (Página index.html) ---
const loginForm = document.getElementById('actual-login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = loginForm.email.value;
        const password = loginForm.senha.value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            console.error('Erro no login:', error.message);
            alert('Falha no login: ' + error.message);
        } else {
            console.log('Login bem-sucedido!', data.user);
            alert('Login realizado com sucesso!');
            window.location.href = 'index.html'; 
        }
    });
}

// --- LÓGICA DE CADASTRO (Página cadastro.html) ---
const registrationForm = document.getElementById('registration-form');

if (registrationForm) {
    registrationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Captura todos os dados do formulário
        const email = document.getElementById('email').value;
        const password = document.getElementById('senha').value;
        const confirmPassword = document.getElementById('confirmar-senha').value;
        const fullName = document.getElementById('nome-completo').value;
        const telefone = document.getElementById('telefone').value; // Captura o telefone

        // Validações básicas
        if (password.length < 6) {
            alert('A senha deve ter no mínimo 6 caracteres.');
            return;
        }
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        // Envia os dados para o Supabase
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                // CORREÇÃO: Enviando 'full_name' e 'telefone'
                // A chave 'full_name' deve ser exatamente igual à usada na sua função SQL.
                data: {
                    full_name: fullName,
                    telefone: telefone
                }
            }
        });

        if (error) {
            console.error('Erro no cadastro:', error.message);
            // CORREÇÃO: A mensagem de erro original agora será exibida
            alert('Ocorreu um erro no cadastro: ' + error.message);
        } else {
            console.log('Usuário registrado:', data.user);
            alert('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta.');
            window.location.href = 'index.html'; 
        }
    });
}