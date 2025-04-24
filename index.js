const products = [
    { id: 1, name: "Iphone 12", price: 45500, image: "12.jpg" },
    { id: 2, name: "HP Elitebook 840 G7", price: 58880, image: "hp.png" },
    { id: 3, name: "Oraimo Free Pods Lite", price: 1790, image: "pods2.jpg" },
    { id: 4, name: "Oraimo Watch 4 Plus", price: 4950, image: "watch.jpg" },
    { id: 5, name: "Samsung Galaxy A36", price: 42570, image: "a36.jpg" },
    { id: 6, name: "Samsung 25W Charger", price: 2350, image: "adapter.jpg" },
    { id: 7, name: "Playstation 5", price: 67800, image: "5.jpg" },
    { id: 8, name: "Samsung 65 Inch TV", price: 119990, image: "qled.jpg" },
    { id: 9, name: "MIKA Gas Cooker", price: 28990, image:"mika.jpg"},
    { id: 10,name: "Oraimo Shaving Clippers", price:2750, image:"clippers.jpg"},
    { id: 11,name: "Hisense Soundbar 350W", price:26590, image:"bar.jpg"},
    { id: 12,name: "Samsung 530L Refrigerator", price:136990, image:"530.jpg"} 
];

const productGrid = document.getElementById("product-grid");
const cartItemsList = document.getElementById("cart-items");
const cartTotalDisplay = document.getElementById("cart-total");
const checkoutButton = document.getElementById("checkout");

let cart = [];

function renderProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Ksh ${product.price}</p>
            <button class="button" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `).join("");
}

function addToCart(productId) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        const productToAdd = products.find(p => p.id === productId);
        if (productToAdd) {
            cart.push({ ...productToAdd, quantity: 1 });
        }
    }
    renderCart();
}

function renderCart() {
    cartItemsList.innerHTML = cart.map(item => `
        <li>
            <span>${item.name} (x${item.quantity})</span>
            <span>Ksh ${item.price * item.quantity}</span>
        </li>
    `).join("");

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalDisplay.textContent = `Total: Ksh ${total}`;
}

function generateReceipt() {
    let receipt = `
    <html>
        <head>
            <title>Receipt</title>
            <style>
                body { font-family: sans-serif; }
                .receipt { width: 300px; margin: 20px auto; border: 1px solid #ddd; padding: 20px; }
                .receipt h2 { text-align: center; }
                .item { display: flex; justify-content: space-between; margin-bottom: 5px; }
                .total { margin-top: 10px; border-top: 1px solid #ddd; padding-top: 10px; font-weight: bold; }
            </style>
        </head>
        <body>
            <div class="receipt">
                <h2>Bei Bora Receipt</h2>
                <p>Date: ${new Date().toLocaleDateString()}</p>
                <p>Time: ${new Date().toLocaleTimeString()}</p>
                <hr>
    `;

    let total = 0;

    if (cart.length === 0) {
        receipt += "<p>No items in cart.</p>";
    } else {
        cart.forEach(item => {
            receipt += `<div class="item"><span>${item.name} (x${item.quantity})</span><span>Ksh ${item.price} x ${item.quantity} = Ksh ${item.price * item.quantity}</span></div>`;
            total += item.price * item.quantity;
        });
        receipt += `<hr><div class="total"><span>Total:</span><span>Ksh ${total}</span></div>`;
    }

    receipt += `
            </div>
        </body>
        </html>
    `;

    return receipt;
}

checkoutButton.addEventListener("click", () => {
    if (cart.length > 0) {
        const receiptWindow = window.open("", "Receipt", "width=400,height=600");
        receiptWindow.document.write(generateReceipt());
        receiptWindow.document.close();
        cart = [];
        renderCart();
    } else {
        alert("Your cart is empty.");
    }
});

renderProducts();
