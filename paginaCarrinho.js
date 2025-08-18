// js/paginaCarrinho.js
import { getCart, removeFromCart, updateQuantity, updateCartIcon } from './carrinho.js';

function renderCartPage() {
    updateCartIcon(); // Garante que o ícone esteja sempre atualizado
    const cart = getCart();

    const cartView = document.getElementById('cart-view');
    const emptyCartMessage = document.getElementById('empty-cart-message');

    if (!cartView || !emptyCartMessage) return; // Sai se não estiver na página do carrinho

    if (cart.length === 0) {
        cartView.style.display = 'none';
        emptyCartMessage.style.display = 'block';
    } else {
        cartView.style.display = 'block';
        emptyCartMessage.style.display = 'none';
        
        populateCartItems(cart);
        updateCartSummary(cart);
    }
}

function populateCartItems(cart) {
    const itemsListContainer = document.getElementById('cart-items-list');
    itemsListContainer.innerHTML = ''; 

    cart.forEach(item => {
        // CORREÇÃO: Usando 'item.nome' e 'item.imagem' como definido no objeto do carrinho
        const itemHtml = `
            <article class="cart-item" data-product-id="${item.id}">
                <div class="cart-item-image">
                    <img src="${item.imagem}" alt="${item.nome}">
                </div>
                <div class="cart-item-details">
                    <h3>${item.nome}</h3>
                    <p class="price">R$ ${item.preco.toFixed(2).replace('.', ',')}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn minus">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                    <button class="quantity-btn plus">+</button>
                </div>
                <p class="cart-item-subtotal">R$ ${(item.preco * item.quantity).toFixed(2).replace('.', ',')}</p>
                <div class="cart-item-remove">
                    <button class="remove-btn">🗑️</button>
                </div>
            </article>
        `;
        itemsListContainer.innerHTML += itemHtml;
    });
}

function updateCartSummary(cart) {
    const summaryContainer = document.getElementById('cart-summary');
    const subtotal = cart.reduce((sum, item) => sum + (item.preco * item.quantity), 0);
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const frete = 15.00;
    const total = subtotal + frete;

    summaryContainer.innerHTML = `
        <h2>Resumo do Pedido</h2>
        <div class="summary-row">
            <span>Subtotal (${totalItems} itens)</span>
            <span>R$ ${subtotal.toFixed(2).replace('.', ',')}</span>
        </div>
        <div class="summary-row">
            <span>Frete</span>
            <span>R$ ${frete.toFixed(2).replace('.', ',')}</span>
        </div>
        <div class="summary-row total">
            <span>Total</span>
            <span>R$ ${total.toFixed(2).replace('.', ',')}</span>
        </div>
        <button id="checkout-button">Finalizar Compra</button>
    `;
}

// Executa o código e adiciona os eventos
document.addEventListener('DOMContentLoaded', () => {
    renderCartPage();

    document.body.addEventListener('click', (event) => {
        const cartItem = event.target.closest('.cart-item');
        if (!cartItem) return;

        const productId = parseInt(cartItem.dataset.productId);
        
        if (event.target.matches('.remove-btn')) {
            if (confirm('Remover este item do carrinho?')) {
                removeFromCart(productId);
                renderCartPage();
            }
        } else if (event.target.matches('.plus')) {
            const qtyInput = cartItem.querySelector('.quantity-input');
            qtyInput.value = parseInt(qtyInput.value) + 1;
            updateQuantity(productId, parseInt(qtyInput.value));
            renderCartPage();
        } else if (event.target.matches('.minus')) {
            const qtyInput = cartItem.querySelector('.quantity-input');
            const newQty = parseInt(qtyInput.value) - 1;
            if (newQty < 1) {
                if (confirm('Remover este item do carrinho?')) {
                    removeFromCart(productId);
                    renderCartPage();
                }
            } else {
                qtyInput.value = newQty;
                updateQuantity(productId, newQty);
                renderCartPage();
            }
        }
    });
});