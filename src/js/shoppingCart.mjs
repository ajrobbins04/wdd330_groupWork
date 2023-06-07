import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {

    // retrieves cart items values from local storage
    // using the key "so-cart"
    const cartItems = getLocalStorage("so-cart");

    // where the cart items will be displayed on cart/index.html
    const outputElement = document.querySelector(".product-list");

    // will insert the html that displays cart items in outputElement.
    renderListWithTemplate(cartItemTemplate, outputElement, cartItems);
    
    // must also compute and display total cost of cart items.
    const totalPrice = calculateListTotal(cartItems);
    displayCartTotal(total);
}
 
// does not currently include taxes in total cost calculation.
function calculateListTotal(list) {
    const amounts = list.map((item) => item.FinalPrice);
    const total = amounts.reduce((sum, item) => sum + item, 0);
    return total;
}

function cartItemTemplate(item) {
    
    // non-clearance items only display final price
    // (which is equivalent to the list price)
    if (item.IsClearance === false) {
      const newItem = `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Images.PrimaryMedium}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__finalPrice">Price: $${item.FinalPrice}</p>
    </li>`;
    } else {
      // items on clearance display the list price and final price.
      const newItem = `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Images.PrimaryMedium}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__finalPrice">List Price: $${item.ListPrice}</p>
      <p class="cart-card__finalPrice">Final Price: $${item.FinalPrice}</p>
    </li>`;
    }

    return newItem;
}


function displayCartTotal(total) {
    if (total > 0) {
        // shows the checkout button and total if there are items in the cart
        document.querySelector(".list-footer").classList.remove("hide");
        document.querySelector(".list-total").innerText += ` $${total}`;
    } else {
        // don't display checkoutBtn or total if cart is empty
        document.querySelector(".list-footer").classList.add("hide");
    }
}