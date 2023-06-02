import { findProductById } from "../js/productData.mjs";
import { getParam, loadHeaderFooter } from "../js/utils.mjs";
import productDetails from "../js/productDetails.mjs";


loadHeaderFooter();

const productId = getParam("product");
productDetails(productId);


  

