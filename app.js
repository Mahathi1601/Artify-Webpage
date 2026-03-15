const gallery = document.getElementById("gallery");
const cartSection = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
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

let cart=[];

const modifyGallery=()=>{
    gallery.innerHTML="";
    artItems.forEach(item=>{
        const card = document.createElement("div");
        card.className="card";
        const imgStyle = item.id === 13 ? 'style="height:500px;width:55%;object-fit:cover"' : '';
        card.innerHTML=`
        <img src="${item.img}" alt="${item.name}" >
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
        gallery.appendChild(card);
    });
}

const addToCart=(id)=>{
    const item = artItems.find(x=>x.id === id);
    cart.push(item);
    updateCart();
}

const updateCart=()=>{
    cartItems.innerHTML="";
    let total=0;
    cart.forEach((item,index)=>{
        total+=item.price;
        const div = document.createElement("div");
        div.innerHTML = `
        ${item.name} -  ₹${item.price} 
        <button onclick="removeFromCart(${index})">x</button>
        `;
        cartItems.appendChild(div);
    });
    cartCount.innerText = cart.length;
    totalPrice.innerText = total;
}

const removeFromCart=(index)=>{
    cart.splice(index,1);
    updateCart();
}

const CartFxn = () =>{
    cartSection.style.display= cartSection.style.display === "block"?"none":"block";
}

const checkout=()=>{
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
    alert("Order placed successfully! We'll contact you soon. ");
    cart=[];
    updateCart();
    CartFxn();
    window.location.href="payments.html";
}

modifyGallery();

