import { renderListWithTemplate } from "./utils.mjs";
function productList() {
    
  }

export default async function productList(selector, category) { 
     // get the element we will insert the list into from the selector
    const el = document.querySelector(selector);
    // get the list of products
    const products = await getData (category);
    console.log(products);
    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, el,products);
}