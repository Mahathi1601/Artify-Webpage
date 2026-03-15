document.getElementById("payment-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    // Simulate order creation
    const newOrder = {
        item: "Sample Art Piece",
        price: 999,
        date: new Date().toLocaleString(),
        payment: paymentMethod
    };

    // Save order in localStorage
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(newOrder);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert(`Payment successful via ${paymentMethod}!`);
    window.location.href = "orders.html";
});
