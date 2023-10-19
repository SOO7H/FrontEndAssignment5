var totalPrice=0;

reloadCartCount();
const loadCheckoutTable = async () => {
    totalPrice = 0;
    const cartItemsString = localStorage.getItem('cart-items');
    if (cartItemsString) {
        const baseUrl = "https://fakestoreapi.com"
        const check = document.getElementById('checkk');
        const hr = document.getElementById('hr');
        
        const cartItems = JSON.parse(cartItemsString);
        
        for(const itemId in cartItems) {
            
            const item = await fetch(`${baseUrl}/products/${itemId}`)
                            .then(res => res.json())
                            .then(json => json);      
        
            const div = document.createElement('div');
            div.className="d-flex justify-content-between";
            div.innerHTML = `
            <p>${item.title.slice(0,30)}...</p>
            <p>X${cartItems[itemId]}</p>
            <p>$${item.price}</p>
                                `
            
            check.insertBefore(div,hr);
            totalPrice += Math.round((cartItems[itemId] * item.price) * 100) / 100;
        }
        document.getElementById('subtotal').innerHTML='$' + Math.round(totalPrice * 100) / 100;
        document.getElementById('total').innerHTML='$' + Math.round(totalPrice * 100) / 100;
        
}
}

loadCheckoutTable();

var options = {
    "key": "rzp_test_Pp0o7b7hjUPGZU", // Enter the Key ID generated from the Dashboard
    "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "EShopper", //your business name
    "description": "Test Transaction",
    "image": "/img/cat-1.jpg",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
        localStorage.removeItem('cart-items');
        loadTable();
        alert("Your order was successfull!");
        window.location.href = 'index.html';
    },
    "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        "name": "John Wick", //your customer's name
        "email": "johnwick@continental.com", 
        "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
    },
    "notes": {
        "address": "Continental@NewYorkCity"
    },
    "theme": {
        "color": "#3399cc"
    }
};

document.getElementById('rzp-button1').onclick = function(e){
    options.amount = Math.round((totalPrice * 100) * 100) / 100;
    console.log(options.amount);
    options.currency = 'INR';
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
}