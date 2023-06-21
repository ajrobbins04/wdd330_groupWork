// productDetails.mjs contains the code needed to 
// dynamically produce the product detail pages.

import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

// sets an empty object
let product = {};

export default async function productDetails(productId) {

    document.getElementById("addToCart").classList.remove("added");

    // get the details for the current product.
    // await included b/c findProductById will return a promise.
    product = await findProductById(productId);

    // render out the details in HTML
    renderProductDetails();

    // add listener to Add to Cart button
    document.getElementById("addToCart")
    .addEventListener("click", addToCart);

}

// add to cart button event handler
function addToCart() {

    let cartContents = getLocalStorage("so-cart");
   
    //check to see if there was anything there
    if (!cartContents) {
        // create an array to hold products in cart
        cartContents = [];
        console.log(cartContents);
    }
    // then add the current product to the array
    cartContents.push(product);
    setLocalStorage("so-cart", cartContents);

    // change button text from "Add to Cart" to "Added!"
    document.getElementById("addToCart").textContent = "Added!"
    document.getElementById("addToCart").classList.add("added");
  }

function renderProductDetails() { 

    // add basic product info
    document.querySelector("#productName").innerText = product.Brand.Name;
    document.querySelector("#productNameWithoutBrand").innerText 
    = product.NameWithoutBrand;
    document.querySelector("#productImage").src = product.Images.PrimaryMedium;
    document.querySelector("#productImage").alt = product.Name;
    document.querySelector("#productRetailPrice").innerText = `Retail Price: $${product.SuggestedRetailPrice}`;
    // check if product is on clearance to display the list price
    // compared to the final price.
    const isClearance = document.querySelector("#productClearancePrice");
    if (isClearance === true) {
        isClearance.innerText = `List Price: $${product.ListPrice}`
        document.querySelector("#productFinalPrice").innerText = `Final Price: $${product.FinalPrice}`;
    }
     
    // List price === final price when product isn't on clearance
    document.querySelector("#productFinalPrice").innerText = `Our Price: $${product.FinalPrice}`;

    // add color, description, and set #addToCart id equal to product id
    document.querySelector("#productColorName").innerText = `Colors: ${product.Colors[0].ColorName}`;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML 
    = product.DescriptionHtmlSimple;
    document.querySelector("#addToCart").dataset.id = product.Id;
        
}

