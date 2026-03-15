// Get orders from localStorage
const orders = JSON.parse(localStorage.getItem("orders")) || [];
const ordersList = document.getElementById("orders-list");

if (orders.length === 0) {
    ordersList.innerHTML = "<p>No previous orders found.</p>";
} else {
    orders.forEach(order => {
        const orderDiv = document.createElement("div");
        orderDiv.classList.add("order-item");
        orderDiv.innerHTML = `
             <p><strong>Date:</strong> ${order.date}</p>
            <p><strong>Items:</strong></p>
            <ul>
            ${order.items.map(i=>`<li>${i.name}-₹${i.price}</li>`).join('')}
            </ul>
        `;
        ordersList.appendChild(orderDiv);
    });
}
