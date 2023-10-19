reloadCartCount();

const queryString = decodeURI(window.location.search.slice(1));
const queries = queryString.split('&');
const queryPair = {};
queries.forEach(query => {
    const keyValuePair = query.split('=');
    queryPair[keyValuePair[0]] = keyValuePair[1];
})
const baseUrl = 'https://fakestoreapi.com'
const productCards = document.getElementById('category-products');
if(queryPair.category) {
    
    const category = queryPair.category;
    document.getElementById('category-name').innerHTML = category[0].toUpperCase() + category.slice(1);
    document.getElementById('navbar').innerHTML=category[0].toUpperCase() + category.slice(1);
    fetch(`${baseUrl}/products/category/${category}`)
    .then(res => res.json())
    .then(json => {        
        for (let product of json){
            var div = document.createElement('div');
            div.className='fil col-lg-4 col-md-6 col-sm-12 pb-1';
            div.innerHTML=`
                <div class="card product-item border-0 mb-4">
                <a href="details.html?id=${product.id}">
                    <div class="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                        <img height='200px' width='200px' style="display: block; margin-left: auto; margin-right: auto; width: 50%;" src=${product.image} alt="">
                    </div>
                    <div class="card-body border-left border-right text-center p-0 pt-4 pb-3">
                        <h6 class="text-truncate mb-3 title">${product.title}</h6>
                        <div class="d-flex justify-content-center">
                            <h6>$${product.price}</h6><h6 class="text-muted ml-2"><del>$${product.price}</del></h6>
                        </div>
                    </div>
                    </a>
                    <div class="card-footer d-flex justify-content-between bg-light border">
                        <button class="btn btn-sm text-dark p-0" type="button" onclick="addToCart(${product.id})"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</button>
                        <button class="btn btn-sm text-dark p-0" type="submit" onclick="addToCart(${product.id}); window.location.href='cart.html'"><i class="fas fa-eye text-primary mr-1"></i>Buy Now</button>
                    </div>
                </div>
            `
        productCards.appendChild(div);
        }        
    });
} else {
    console.error('Category doesn\'t exist in query string');
}

const addToCart = (id) => {
    var cartItems = localStorage.getItem('cart-items');
    if(!cartItems) {
        cartItems = {};
    } else {
        cartItems = JSON.parse(cartItems);
    }

    cartItems[id] = 1;

    localStorage.setItem('cart-items', JSON.stringify(cartItems));
    reloadCartCount();
}

let filterInput = document.getElementById("filterInput");
filterInput.addEventListener('keyup', filterProducts);

function filterProducts(){
    let filterValue = filterInput.value.toUpperCase();
    let item = productCards.querySelectorAll('.fil');

    for (let i = 0; i < item.length; i++){
        let span = item[i].querySelector('.title');

        if(span.innerHTML.toUpperCase().indexOf(filterValue) > -1){
            item[i].style.display = "initial";
        }else{
            item[i].style.display = "none";
        }

    }
}