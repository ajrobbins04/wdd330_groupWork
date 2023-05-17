
import { findProductById } from "./productData.mjs";
import { setLocalStorage } from "./utils.mjs";

 
export default async function productDetails(productId) {

    // get the details for the current product.
    const product = await findProductById(productId);
    renderProductDetails();

    // add listener to Add to Cart button
    document.getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}


    // add to cart button event handler
    async function addToCartHandler() {
        setLocalStorage("so-cart", product);
    }
 

    function renderProductDetails() { 
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

