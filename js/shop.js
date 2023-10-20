reloadCartCount();
const loadAllProducts = async () => {
  sorting();
  const products = await getAllProducts();
  var newprod = document.getElementById("shop-products");
  console.log(products);
  await products.forEach((product) => {
    var div = document.createElement("div");
    div.className = "fil col-lg-3 col-md-6 col-sm-12 pb-1";
    div.id = "prod";
    div.innerHTML = `
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
                                <h6>Rating ${product.rating.rate}/5</h6>
                            </div>
                            </a>
                            <div class="card-footer d-flex justify-content-between bg-light border">
                                <button class="btn btn-sm text-dark p-0" type="button" onclick="addToCart(${product.id})"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</button>
                                <button class="btn btn-sm text-dark p-0" type="submit" onclick="addToCart(${product.id}); window.location.href='cart.html'"><i class="fas fa-eye text-primary mr-1"></i>Buy Now</button>
                            </div>
                        </div>
        `;
    newprod.appendChild(div);
  });
};

loadAllProducts();

const addToCart = (id) => {
  var cartItems = localStorage.getItem("cart-items");
  if (!cartItems) {
    cartItems = {};
  } else {
    cartItems = JSON.parse(cartItems);
  }

  cartItems[id] = 1;

  localStorage.setItem("cart-items", JSON.stringify(cartItems));
  reloadCartCount();
};

let filterInput = document.getElementById("filterInput");
filterInput.addEventListener("keyup", filterProducts);

function filterProducts() {
  let filterValue = filterInput.value.toUpperCase();
  let item = productCards.querySelectorAll(".fil");

  for (let i = 0; i < item.length; i++) {
    let span = item[i].querySelector(".title");

    if (span.innerHTML.toUpperCase().indexOf(filterValue) > -1) {
      item[i].style.display = "initial";
    } else {
      item[i].style.display = "none";
    }
  }
}

function sorting() {
  var sort = document.getElementById("shop-products");
  sort.innerHTML = `
<div class="col-12 pb-1">
                        <div class="d-flex align-items-center justify-content-between mb-4">
                            <form action="">
                                <div class="input-group">
                                    <input type="text" class="form-control" placeholder="Search by name" id="filterInput">
                                    <div class="input-group-append">
                                        <span class="input-group-text bg-transparent text-primary">
                                            <i class="fa fa-search"></i>
                                        </span>
                                    </div>
                                </div>
                            </form>
                            <div class="dropdown ml-4">
                                <button class="btn border dropdown-toggle" type="button" id="triggerId" data-toggle="dropdown" aria-haspopup="true"
                                        aria-expanded="false">
                                            Sort by
                                        </button>
                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="triggerId" id="sort">
                                    <button class="btn btn-outline-black decrease"
                                    onclick="sort('pasc')"
                                    type="button">Price (Low to High)</button>
                                    <button class="btn btn-outline-black decrease"
                                    onclick="sort('pdesc')"
                                    type="button">Price (High to Low)</button>
                                    <button class="btn btn-outline-black decrease"
                                    onclick="sort('rasc')"
                                    type="button">Rating (Low to High)</button>
                                    <button class="btn btn-outline-black decrease"
                                    onclick="sort('rdesc')"
                                    type="button">Rating (High to Low)</button>
                                </div>
                            </div>
                        </div>
                    </div>
`;
}

const sort = async (param) => {
  const productss = await getAllProducts();
  var newprod = document.getElementById("shop-products");
  newprod.remove();

  var newprod = document.createElement("div");
  newprod.className = "row pb-3";
  newprod.id = "shop-products";
  var append = document.getElementById("append");
  append.appendChild(newprod);
  sorting();
  var products = await productss.slice(0);
  products.sort(function (a, b) {
    if (param === "pasc") {
      return a.price - b.price;
    } else if (param === "pdesc") {
      return b.price - a.price;
    } else if (param === "rasc") {
      return a.rating.rate - b.rating.rate;
    } else if (param === "rdesc") {
      return b.rating.rate - a.rating.rate;
    }
  });
  console.log(products);
  await products.forEach((product) => {
    var div = document.createElement("div");
    div.className = "fil col-lg-3 col-md-6 col-sm-12 pb-1";
    div.id = "prod";
    div.innerHTML = `
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
                                    <h6>Rating ${product.rating.rate}/5</h6>
                                </div>
                                </a>
                                <div class="card-footer d-flex justify-content-between bg-light border">
                                    <button class="btn btn-sm text-dark p-0" type="button" onclick="addToCart(${product.id})"><i class="fas fa-shopping-cart text-primary mr-1"></i>Add To Cart</button>
                                    <button class="btn btn-sm text-dark p-0" type="submit" onclick="addToCart(${product.id}); window.location.href='cart.html'"><i class="fas fa-eye text-primary mr-1"></i>Buy Now</button>
                                </div>
                            </div>
            `;
    newprod.appendChild(div);
  });
};
