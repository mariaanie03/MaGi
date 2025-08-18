// js/script.js (Versão Completa e Corrigida)

// Importa a lista de produtos para ser usada na busca.
import { todosOsProdutos } from './produtos.js';

document.addEventListener('DOMContentLoaded', function() {
    console.log("Sistema global 'script.js' iniciado.");

    // ===================================================================
    // --- LÓGICA GLOBAL (FUNCIONA EM TODAS AS PÁGINAS) ---
    // ===================================================================
    const cartIconButton = document.getElementById('cart-icon-btn');
    if (cartIconButton) {
        cartIconButton.addEventListener('click', () => {
            // Ação padrão do ícone do carrinho: ir para a página do carrinho.
            window.location.href = 'carrinho.html';
        });
    }

    // ===================================================================
    // --- LÓGICA ESPECÍFICA DE CADA PÁGINA ---
    // ===================================================================

    // --- LÓGICA DA PÁGINA INICIAL (index.html) ---
    if (document.getElementById('home-content')) {
        console.log("Lógica da PÁGINA INICIAL sendo executada.");

        function showSection(targetId) {
            const contentSections = document.querySelectorAll('.content-section');
            contentSections.forEach(section => section.classList.remove('active'));
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        }

        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('section') === 'login') {
            showSection('login-content');
        } else {
            // Comportamento padrão é mostrar a home-content
            const homeSection = document.getElementById('home-content');
            if (homeSection) {
                homeSection.classList.add('active');
            }
        }

        // Navegação por abas na página inicial
        const navLinks = document.querySelectorAll('.main-nav .nav-link');
        navLinks.forEach(link => {
            if (link.tagName === 'SPAN' && link.dataset.target) {
                link.addEventListener('click', function(e) { 
                    e.preventDefault(); 
                    showSection(this.dataset.target); 
                });
            }
        });
    }
    
    // --- LÓGICA DA PÁGINA DE CADASTRO (cadastro.html) ---
    if (document.getElementById('registration-form')) {
        console.log("Lógica da PÁGINA DE CADASTRO sendo executada.");

        // Lógica para buscar CEP
        const cepInput = document.getElementById('cep');
        if (cepInput) {
            cepInput.addEventListener('blur', function() {
                const cep = this.value.replace(/\D/g, ''); // Remove caracteres não numéricos
                if (cep.length === 8) {
                    fetch(`https://viacep.com.br/ws/${cep}/json/`)
                        .then(response => response.json())
                        .then(data => {
                            if (!data.erro) {
                                document.getElementById('logradouro').value = data.logradouro;
                                document.getElementById('bairro').value = data.bairro;
                                document.getElementById('cidade').value = data.localidade;
                                document.getElementById('estado').value = data.uf;
                                document.getElementById('numero').focus(); // Foca no campo de número
                            } else { 
                                alert('CEP não encontrado.'); 
                            }
                        }).catch(error => console.error('Erro ao buscar CEP:', error));
                }
            });
        }
    }

    // --- LÓGICA DA PÁGINA DE RESULTADOS (resultados.html) ---
    if (document.getElementById('resultados-grid')) {
        console.log("Lógica da PÁGINA DE RESULTADOS sendo executada.");
        
        const resultsGrid = document.getElementById('resultados-grid');
        const resultsTitle = document.getElementById('search-results-title');
        const urlParams = new URLSearchParams(window.location.search);
        const searchTerm = urlParams.get('q');

        if (searchTerm) {
            const decodedSearchTerm = decodeURIComponent(searchTerm);
            const searchInputOnPage = document.querySelector('#search-form #search-input');
            if (searchInputOnPage) {
                searchInputOnPage.value = decodedSearchTerm;
            }
            resultsTitle.textContent = `Resultados para: "${decodedSearchTerm}"`;
            
            const resultados = todosOsProdutos.filter(produto => 
                produto.nome.toLowerCase().includes(decodedSearchTerm.toLowerCase())
            );

            if (resultados.length > 0) {
                resultsGrid.innerHTML = ''; // Limpa resultados antigos
                resultados.forEach(produto => {
                    const produtoCard = document.createElement('div');
                    produtoCard.className = 'quadro';
                    // O botão agora tem o 'data-product-id' para o modal funcionar
                    produtoCard.innerHTML = `
                        <img src="${produto.imagem}" alt="${produto.nome}">
                        <h3>${produto.nome}</h3>
                        <p class="preco">${produto.preco}</p>
                        <button class="btn-ver-produto" data-product-id="${produto.id}">Ver Detalhes</button>
                    `;
                    resultsGrid.appendChild(produtoCard);
                });
            } else {
                resultsGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">Nenhum produto encontrado.</p>';
            }
        }
    }
});