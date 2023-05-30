import productList from "../js/productList.mjs";
import { getParam, loadHeaderFooter } from "../js/utils.mjs";
import { getData } from "./productData.mjs";

getParam();
getData();
loadHeaderFooter();
productList(".product-list", "tents");
