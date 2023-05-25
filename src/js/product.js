import { findProductById } from "./productData.mjs";
import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";


loadHeaderFooter();

const productId = getParam("product");
console.log(findProductById(productId));

productDetails(productId);


  

