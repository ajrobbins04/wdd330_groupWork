import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

// takes a form element and returns an object where 
// the key is the "name" of the form input.
function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
    convertedJSON = {};

    formData.forEach(function (value, key) {
        convertedJSON[key] = value;
    });

    return convertedJSON;
}

// takes the items currently stored in the cart (localstorage) and 
// returns them in a simplified form.
function packageItems(items) {
    // convert the list of products to the simpler form required for checkout process
    const simplifiedItems = items.map((item) => {
        return {
            id: item.Id,
            price: item.finalPrice,
            name: item.Name,
            quantity: 1
        };
    });
    return simplifiedItems;
}
const checkoutProcess = {
    // properties
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,

    // initialize object property values
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    }, 
    // handles item calculations
    calculateItemSummary: function() {

        const summaryElement = document.querySelector(
            this.outputSelector + " #cartTotal"
        );
        console.log(summaryElement);
        const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
        );
        console.log(itemNumElement);
        // set quantity value
        itemNumElement.innerText = this.list.length;

        // store the final price of each item in amounts
        const amounts = this.list.map((item) => item.FinalPrice);

        // add up the final price of each item 
        this.itemTotal = amounts.reduce((sum, item) => sum + item);

        // set total item cost
        summaryElement.innerText = "$" + this.itemTotal;
    },
    // handles order calculations
    calculateOrdertotal: function() {
        // calculate shipping
        this.shipping = 10 + (this.list.length - 1) * 2;
        // calculate tax
        this.tax = (this.itemTotal * 0.06).toFixed(2);
        // calculat the order's total cost
        this.orderTotal = (
            parseFloat(this.itemTotal) +
            parseFloat(this.shipping) +
            parseFloat(this.tax)
        ).toFixed(2);
        this.displayOrderTotals();
    },
    displayOrderTotals: function() {
        const shipping = document.querySelector(this.outputSelector + " #shipping");
        const tax = document.querySelector(this.outputSelector + " #tax");
        const orderTotal = document.querySelector(
            this.outputSelector + " #orderTotal"
        );
        // place each computed value inside html
        shipping.innerText = "$" + this.shipping;
        tax.innerText = "$" + this.tax;
        orderTotal.innerText = "$" + this.orderTotal;
    },
    checkout: async function(form) {
         // build the data object from the calculated fields, the items
         // in the cart, and the information entered into the form
        const json = formDataToJSON(form);
        json.orderDate = new Date();
        json.orderTotal = this.getOrderTotal;
        json.tax = this.tax;
        json.shipping = this.shipping;
        json.items = packageItems(this.list);
        
        try {
            const res = await checkout(json);
        } catch (err) {
            console.log(err);
        }
    }
};

export default checkoutProcess;