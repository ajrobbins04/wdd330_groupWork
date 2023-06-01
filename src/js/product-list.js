import productList from "../js/productList.mjs";
import { getParam, loadHeaderFooter } from "../js/utils.mjs";

// loads header and footer on product list page
loadHeaderFooter();

const category = getParam("category");

// shows products on page based on the category chosen
productList(".product-list", category);
