const gallery = document.getElementById("gallery");
const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

const artItems = [
    {id:1 , name :"Lotus Mandala art" , price:299 , img:"1.jpg"},
    {id:2 , name :"Dog Mandala art" , price:299 , img:"2.jpg"},
    {id:3 , name :"Girl Mandala art" , price:299 , img:"3.jpg"},
    {id:4 , name :"Deer Mandala art" , price:299 , img:"4.jpg"},
    {id:5 , name :"Wolf Mandala art" , price:399 , img:"5.jpg"},
    {id:6 , name :"Lord Mandala art" , price:399 , img:"6.jpg"},
    {id:7 , name :"Tribal Mandala art" , price:399 , img:"7.jpg"},
    {id:8 , name :"Seasons Mandala art" , price:399 , img:"8.jpg"},
    {id:9 , name :"Swan Mandala art" , price:399 , img:"9.jpg"},
    {id:10 , name :"Dog Pencil Sketch" , price:149 , img:"p1.jpg"},
    {id:11, name :"Deer Pencil Sketch" , price:299 , img:"p2.jpg"},
    {id:12 , name :"Customisable Pencil Sketch" , price:499 , img:"p3.jpg"},
];

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
                 onclick="toggleWishlist(${item.id})">
                <i class="${isWishlisted(item) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
            </div>
        </div>

        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
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

    const orders = JSON.parse(localStorage.getItem("orders"))||[];

    const newOrder = {
        items:[...cart],
        date:new Date().toLocaleString()
    };

    orders.push(newOrder);
    localStorage.setItem("orders",JSON.stringify(orders));

    //alert("Order placed successfully!");

    localStorage.removeItem("cart");

    updateCartCount();

    window.location.href="payments.html";
}

/* ✅ INIT */
document.addEventListener("DOMContentLoaded", () => {

    if(document.getElementById("gallery")){
        modifyGallery();
    }

    updateCartCount();
});