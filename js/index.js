const getAllCategories = async () => {
    const categories = await getCategories();
    return categories;
}
reloadCartCount();
const loadCardCategories = async () => {
    const categories = await getAllCategories();
    const categoryCards = document.getElementById('categories-start');
    await categories.forEach(async category => {
        const firstProd = await fetch(`https://fakestoreapi.com/products/category/${category}?limit=1`)
                                .then(res => res.json())
                                .then(prod => prod[0]);
        var div = document.createElement('div');
        div.className='col-lg-6 col-md-6 pb-1';
        div.innerHTML = `
            <div class="cat-item d-flex flex-column border mb-6" style="padding: 30px;">
                <a href="category.html?category=${category}" class="cat-img position-relative overflow-hidden mb-3" style="margin: auto auto;">
                    <img height='300px' width='300px'  src=${firstProd.image} alt="">
                </a>
                <h5 class="font-weight-semi-bold " style="margin: auto auto">${category[0].toUpperCase() + category.slice(1)}</h5>
            </div>                              
        `
        categoryCards.appendChild(div);
    })
}

loadCardCategories();

