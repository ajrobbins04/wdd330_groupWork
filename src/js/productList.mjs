// productList.mjs used to generate a list of product 
// cards in HTML from an array.

import { getData } from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";


function productCardTemplate(product) {

    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p></a
    >
  </li>`;
}

export default async function productList(selector, category) {

    // get the element we will insert the list into from the selector
    const element = document.querySelector(selector);

    // get the list of products ... use await to make JavaScript
    // wait until the promise returns its result
    const products = await getData(category);

    // only show 4 products
    const fourProducts = products.slice(0, 4);
  
    // render out the product list to the element
    renderListWithTemplate(productCardTemplate, element, fourProducts);
}

