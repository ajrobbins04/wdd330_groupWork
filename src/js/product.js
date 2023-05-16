import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
 
function run() {
const productId = getParam("product");

productDetails(productId);
}

  