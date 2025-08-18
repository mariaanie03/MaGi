// js/modal.js
import { addToCart } from './carrinho.js';
import { todosOsProdutos } from './produtos.js'; // Importa a lista de produtos

// --- LÓGICA DO MODAL ---
const overlay = document.getElementById('product-modal-overlay');
const closeBtn = document.getElementById('modal-close-btn');
const addToCartBtn = document.getElementById('modal-add-to-cart-btn');
let currentProduct = null;

function openModal(productId) {
    currentProduct = todosOsProdutos.find(p => p.id === productId);
    if (!currentProduct || !overlay) return;

    document.getElementById('modal-product-image').src = currentProduct.imagem;
    document.getElementById('modal-product-name').textContent = currentProduct.nome;
    document.getElementById('modal-product-price').textContent = currentProduct.preco;
    document.getElementById('modal-product-description').textContent = currentProduct.descricao;
    
    overlay.classList.remove('escondido');
}

function closeModal() {
    if (overlay) overlay.classList.add('escondido');
    currentProduct = null;
}

// Adiciona eventos GLOBAIS
document.addEventListener('DOMContentLoaded', () => {
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeModal();
    });

    if (addToCartBtn) addToCartBtn.addEventListener('click', () => {
        if (currentProduct) {
            const productToAdd = {
                id: currentProduct.id,
                nome: currentProduct.nome,
                preco: parseFloat(currentProduct.preco.replace('R$ ', '').replace(',', '.')),
                imagem: currentProduct.imagem
            };
            addToCart(productToAdd);
            closeModal();
        }
    });

    document.body.addEventListener('click', (event) => {
        const viewButton = event.target.closest('[data-product-id]');
        if (viewButton) {
            event.preventDefault();
            const productId = parseInt(viewButton.dataset.productId);
            openModal(productId);
        }
    });
});