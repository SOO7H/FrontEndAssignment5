import Product from "./product";

export const getAllProducts = async () : Promise<Product[] | any> => {
    try {
        const res : any = await fetch('https://fakestoreapi.com/products/');
        return res.json();
    } catch (error) {
        console.log("Unable to fetch products");
        console.error(error);      
    }
}

export const getProductsCategoryWise = async (category: string) : Promise<Product[] | any> => {
    try {
        const res : any = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        return res.json();
    } catch (error) {
        console.log("Unable to fetch products of category" + category);
        console.error(error);      
    }
}

export const getProduct = async (productId: number) : Promise<Product | any> => {
    try {
        const res : any = await fetch(`https://fakestoreapi.com/products/${productId}`);
        return res.json();
    } catch (error) {
        console.log("Unable to fetch products from productId" + productId);
        console.error(error);      
    }
}

export const getCategories = async () => {
    try {
        const res: any = await fetch(`https://fakestoreapi.com/products/categories`);
        const categories = await res.json();
        return categories;
    } catch (error) {
        console.log("Unable to fetch categories of product");
        console.error(error);                   
    }    
}

export const reloadCartCount = () => {
    var span = document.getElementById('count-span');
    var cic=document.getElementById('count');
    if(span)
        cic?.removeChild(span);
    span=document.createElement('span');
    span.className="badge";
    span.id = 'count-span';
    // span.innerHTML=``;
    span.innerHTML=`${Object.keys(JSON.parse(localStorage.getItem('cart-items')!)).length}`;
    cic?.appendChild(span);
}