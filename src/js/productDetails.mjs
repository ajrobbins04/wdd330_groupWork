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

        // add basic product info
        document.querySelector("#productName").innerText = product.Brand.Name;
        document.querySelector("#productNameWithoutBrand").innerText 
        = product.NameWithoutBrand;
        document.querySelector("#productImage").src = product.Image;
        document.querySelector("#productImage").alt = product.Name;

        // check if product is on clearance to display the list price
        // compared to the final price.
        const isClearance = document.querySelector("#productClearancePrice");
        if (isClearance === true) {
            isClearance.innerText = `List Price: $${product.ListPrice}`
            document.querySelector("#productFinalPrice").innerText = `Final Price: $${product.FinalPrice}`;
        }
     
        // List price === final price when product isn't on clearance
        document.querySelector("#productFinalPrice").innerText = `Price: $${product.FinalPrice}`;

        // add color, description, and set #addToCart id equal to product id
        document.querySelector("#productColorName").innerText = `Colors: ${product.Colors[0].ColorName}`;
        document.querySelector("#productDescriptionHtmlSimple").innerHTML 
        = product.DescriptionHtmlSimple;
        document.querySelector("#addToCart").dataset.id = product.Id;
        
    }

