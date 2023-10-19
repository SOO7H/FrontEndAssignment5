const queryString = decodeURI(window.location.search.slice(1));
const queries = queryString.split('&');
const queryPair = {};
queries.forEach(query => {
    const keyValuePair = query.split('=');
    queryPair[keyValuePair[0]] = keyValuePair[1];
})
reloadCartCount();


const loadProduct = async (id) => {
    const product = await fetchProduct(id);
    const row = document.getElementById('row');
    row.innerHTML =`<div class="col-lg-5 pb-5">
                        <img class="w-100 h-100" src=${product.image} alt="Image">     
                    </div>
                    <div class="col-lg-7 pb-5">
                        <h3 class="font-weight-semi-bold">${product.title}</h3>
                        <div class="d-flex mb-3">
                            <p>${product.rating.rate}/5</p>
                            <small class="pt-1" style="margin-left: 20px;">(${product.rating.count} Reviews)</small>
                        </div>
                        <h3 class="font-weight-semi-bold mb-4">$${product.price}</h3>
                        <p class="mb-4">${product.description}</p>
                        
                        <div class="d-flex align-items-center mb-4 pt-2">
                            <div class="input-group quantity mr-3" style="width: 130px;">
                                <div class="input-group-btn">
                                    <button class="btn btn-primary btn-minus">
                                    <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input type="text" class="form-control bg-secondary text-center" value="1">
                                <div class="input-group-btn">
                                    <button class="btn btn-primary btn-plus">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                            <button class="btn btn-primary px-3"><i class="fa fa-shopping-cart mr-1"></i> Add To Cart</button>
                        </div>
                        
                    </div>
                    `
}

const loadSimilarProduct = async (id) => {
    const product = await fetchProduct(id);
    const category=product.category;
    const productCards=document.getElementById('owl');
    fetch(`${baseUrl}/products/category/${category}`)
    .then(res => res.json())
    .then(json => {        
        for (let product of json){
            if(product.id != id){
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
                                <h6>$123.00</h6><h6 class="text-muted ml-2"><del>${product.price}</del></h6>
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
        }        }
    });
    
}

const fetchProduct = async (id) => {
    const res = await fetch(`${baseUrl}/products/${id}`);
    const data = await res.json();
    return await data;
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
}

const baseUrl = 'https://fakestoreapi.com'
if(queryPair.id) {
    const id = queryPair.id;
    loadProduct(id);
    loadSimilarProduct(id);
} else {
    console.log("No or invalid product id found!");
}

