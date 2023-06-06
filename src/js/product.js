import { getParam, loadHeaderFooter, setLocalStorage } from "./utils.mjs";
import productDetails from "./productDetails.mjs";


loadHeaderFooter();

const productId = getParam("product");
productDetails(productId);


  

