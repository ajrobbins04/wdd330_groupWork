import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";


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
    // handles calula
    calculateItemSummary: function() {

        const summaryElement = document.querySelector(
            this.outputSelector + " #cartTotal"
        );
        const itemNumElement = document.querySelector(
            this.outputSelector + " #num-items"
        );

        // set quantity value
        itemNumElement.innerText = this.list.length;

        // store the final price of each item in amounts
        const amounts = this.list.map((item) => item.FinalPrice);

        // add up the final price of each item 
        this.itemTotal = amounts.reduce((sum, item) => sum + item);

        // set total item cost
        summaryElement.innerText = "$" + this.itemTotal;
    },
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