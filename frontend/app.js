const gallery = document.getElementById("gallery");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

let artItems = [];

async function fetchProducts() {
    try {
        const response = await fetch('https://artify-2iq3.onrender.com/api/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        artItems = data.map(item => ({
            id: item._id,
            name: item.title,
            price: item.price,
            img: item.image
        }));
        if(document.getElementById("gallery")){
            modifyGallery();
        }
    } catch(err) {
        console.error('Error loading products from DB:', err);
    }
}

/* ❤️ WISHLIST */
function getWishlist(){
    return JSON.parse(localStorage.getItem("wishlist")) || [];
}

function isWishlisted(item){
    return getWishlist().some(w => w.id === item.id);
}

function toggleWishlist(id){
    let wishlist = getWishlist();
    let item = artItems.find(x => x.id === id);

    let index = wishlist.findIndex(w => w.id === id);

    if(index > -1){
        wishlist.splice(index,1);
    } else {
        wishlist.push(item);
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    modifyGallery();
}

/* 🖼️ GALLERY */
function modifyGallery(){
    if(!gallery) return;

    gallery.innerHTML = "";

    artItems.forEach(item=>{
        const card = document.createElement("div");
        card.className="card";

        card.innerHTML=`
        <div class="image-box">
            <img src="${item.img}" alt="${item.name}">
            <div class="heart-icon ${isWishlisted(item) ? 'active' : ''}" 
                 onclick="toggleWishlist('${item.id}')">
                <i class="${isWishlisted(item) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </div>
        </div>

        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="addToCart('${item.id}')">Add to Cart</button>
        `;

        gallery.appendChild(card);
    });

    updateCartCount();
}

/* 🛒 ADD TO CART */
function addToCart(id){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const item = artItems.find(x=>x.id === id);

    let existing = cart.find(c => c.id === id);

    if(existing){
        existing.quantity += 1;
    } else {
        cart.push({...item, quantity:1});
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
}

/* 🛒 UPDATE CART UI */
function updateCart(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cartItems){
        cartItems.innerHTML="";
    }

    let total=0;
    let count=0;

    cart.forEach((item,index)=>{
        total += item.price * item.quantity;
        count += item.quantity;

        if(cartItems){
            const div = document.createElement("div");
            div.innerHTML = `
            ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}
            <button onclick="removeFromCart(${index})">x</button>
            `;
            cartItems.appendChild(div);
        }
    });

    if(totalPrice) totalPrice.innerText = total;

    updateCartCount();
}

/* ❌ REMOVE FROM CART */
function removeFromCart(index){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCart();
}

/* 🔢 UPDATE CART COUNT (MAIN FIX) */
function updateCartCount(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cart.forEach(item => {
        count += item.quantity;
    });

    let el = document.getElementById("cart-count");

    if(el){
        el.innerText = count;
    }
}

/* 💳 CHECKOUT */
function checkout(){

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if(cart.length===0){
        alert("Your cart is empty.");
        return;
    }

    // Rely exclusively on payments page and backend now
    window.location.href="payments.html";
}

/* ✅ INIT */
document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    updateCartCount();
});