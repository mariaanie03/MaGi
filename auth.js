// js/auth.js

// 1. AQUI ESTÁ A CORREÇÃO PRINCIPAL:
//    Importamos a constante 'supabase' que foi exportada pelo supabaseClient.js.
import { supabase } from './supabaseClient.js';

// O restante do seu código permanece o mesmo, pois ele já espera
// que a variável 'supabase' exista e funcione.

// Função para lidar com o login na página index.html
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

// Código para o cadastro (cadastro.html)
const registrationForm = document.getElementById('registration-form');

if (registrationForm) {
    registrationForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = registrationForm.email.value;
        const password = registrationForm.senha.value;
        const confirmPassword = document.getElementById('confirmar-senha').value;
        const fullName = document.getElementById('nome-completo').value;
        // Adicionei a captura do telefone para que o trigger funcione
        const telefone = document.getElementById('telefone').value;

        if (password.length < 6) {
            alert('A senha deve ter no mínimo 6 caracteres.');
            return;
        }
        if (password !== confirmPassword) {
            alert('As senhas não coincidem!');
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                // ATUALIZADO: Corresponde ao que o trigger no seu DB espera
                data: {
                    nome_completo: fullName,
                    telefone: telefone
                }
            }
        });

        if (error) {
            console.error('Erro no cadastro:', error.message);
            alert('Ocorreu um erro no cadastro: ' + error.message);
        } else {
            console.log('Usuário registrado:', data.user);
            alert('Cadastro realizado com sucesso! Verifique seu e-mail para confirmar a conta.');
            window.location.href = 'index.html'; 
        }
    });
}