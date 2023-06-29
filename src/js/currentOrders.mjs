import { getOrders } from "./externalServices.mjs";

export default async function currentOrders(token, selector) {
    
    const element = document.querySelector(selector);
    const orders = await getOrders(token);

    orders.forEach((order) => {
        console.log(order);
    })
   
};

function orderCardTemplate(order) {

};