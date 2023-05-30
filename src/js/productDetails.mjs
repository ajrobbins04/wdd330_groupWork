// productDetails.mjs contains the code needed to 
// dynamically produce the product detail pages.

import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";

let product = {};

export default async function productDetails(productId) {

    // get the details for the current product.
    product = await findProductById(productId);

    // render out the details in HTML
    renderProductDetails();

    // add listener to Add to Cart button
    document.getElementById("addToCart")
    .addEventListener("click", addToCart);

    // add to cart button event handler
    async function addToCart() {
        setLocalStorage("so-cart", product);
    }
}
    async function renderProductDetails() { 
        document.querySelector("#productName").innerText = product.Brand.Name;
        document.querySelector("#productNameWithoutBrand").innerText 
        = product.NameWithoutBrand;
        document.querySelector("#productImage").src = product.Image;
        document.querySelector("#productImage").alt = product.Name;
        document.querySelector("#productFinalPrice").innerText = product.FinalPrice;
        document.querySelector("#productColorName").innerText = product.Colors[0].ColorName;
        document.querySelector("#productDescriptionHtmlSimple").innerHTML 
        = product.DescriptionHtmlSimple;
        document.querySelector("#addToCart").dataset.id = product.Id;
        
    }

