import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

export default function shoppingCart() {

    // retrieves the values belonging to cart items from local
    // storage using the "so-cart" key 
    const cartContents = getLocalStorage("so-cart");

    // where the cart items will be displayed on cart/index.html
    const outputElement = document.querySelector(".product-list");
    
    // will insert the html that displays cart items in outputElement.
    renderListWithTemplate(cartItemTemplate, outputElement, cartContents);
    
    // must also compute and display total cost of cart items.
    const totalPrice = calculateListTotal(cartContents);
    displayCartTotal(totalPrice);

     // add listener to "X" icons
     const removeBtns = document.querySelectorAll("[data-id]");
     removeBtns.forEach((btn) => {
       btn.addEventListener("click", removeFromCart);
     })
}

function removeFromCart() {

  // find the value of btn data-id attribute
  const id = this.getAttribute("data-id");
 console.log(id);

  // get products in cart
  const cartContents = getLocalStorage("so-cart");
  
  // convert cartContents nodeList to array
  const cartContentsArray = Array.from(cartContents);

  // remove product with the id that matches the X icon's data-id
  let contentsUpdated = cartContentsArray.filter(product => product.Id !== id);

  // remove all products from local storage, then save the
  // updated array to local storage
  localStorage.clear();
  localStorage.setItem("so-cart", JSON.stringify(contentsUpdated));

  // render new cart contents
      // where the cart items will be displayed on cart/index.html
      const outputElement = document.querySelector(".product-list");
    
      // will insert the html that displays cart items in outputElement.
      renderListWithTemplate(cartItemTemplate, outputElement, contentsUpdated);
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
      return`<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Images.PrimaryMedium}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <span data-id="${item.Id}" class="cart-card__remove">X</span>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__finalPrice">Price: $${item.FinalPrice}</p>
    </li>`;
    } else {
      // items on clearance display the list price and final price.
      return `<li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img
          src="${item.Images.PrimaryMedium}"
          alt="${item.Name}"
        />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <span data-id="${item.Id}" class="cart-card__remove">X</span>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__listPrice">List Price: $${item.ListPrice}</p>
      <p class="cart-card__finalPrice">Final Price: $${item.FinalPrice}</p>
    </li>`;
    }
}


function displayCartTotal(total) {
    if (total > 0) {
        // shows the checkout button and total if there are items in the cart
        document.querySelector(".list-footer").classList.remove("hide");
        document.querySelector(".list-total").textContent = `Total: $${total}`;
    } else {
        // don't display checkoutBtn or total if cart is empty
        document.querySelector(".list-footer").classList.add("hide");
    }
}