"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reloadCartCount = exports.getCategories = exports.getProduct = exports.getProductsCategoryWise = exports.getAllProducts = void 0;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch('https://fakestoreapi.com/products/');
        return res.json();
    }
    catch (error) {
        console.log("Unable to fetch products");
        console.error(error);
    }
});
exports.getAllProducts = getAllProducts;
const getProductsCategoryWise = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://fakestoreapi.com/products/category/${category}`);
        return res.json();
    }
    catch (error) {
        console.log("Unable to fetch products of category" + category);
        console.error(error);
    }
});
exports.getProductsCategoryWise = getProductsCategoryWise;
const getProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://fakestoreapi.com/products/${productId}`);
        return res.json();
    }
    catch (error) {
        console.log("Unable to fetch products from productId" + productId);
        console.error(error);
    }
});
exports.getProduct = getProduct;
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield fetch(`https://fakestoreapi.com/products/categories`);
        const categories = yield res.json();
        return categories;
    }
    catch (error) {
        console.log("Unable to fetch categories of product");
        console.error(error);
    }
});
exports.getCategories = getCategories;
const reloadCartCount = () => {
    var span = document.getElementById('count-span');
    var cic = document.getElementById('count');
    if (span)
        cic === null || cic === void 0 ? void 0 : cic.removeChild(span);
    span = document.createElement('span');
    span.className = "badge";
    span.id = 'count-span';
    // span.innerHTML=``;
    span.innerHTML = `${Object.keys(JSON.parse(localStorage.getItem('cart-items'))).length}`;
    cic === null || cic === void 0 ? void 0 : cic.appendChild(span);
};
exports.reloadCartCount = reloadCartCount;
