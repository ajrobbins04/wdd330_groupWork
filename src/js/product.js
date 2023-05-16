import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");
productDetails(productId);
// week 3: tried to compare the instructor's code with the week 3 
// activity so we can move on to week 4 
// commented off all the existing codes we did to match up with the sample code
// -marielle

// import { setLocalStorage, getParam } from "./utils.mjs";
// import { findProductById } from "./productData.mjs";

// function addProductToCart(product) {
//   setLocalStorage("so-cart", product);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
