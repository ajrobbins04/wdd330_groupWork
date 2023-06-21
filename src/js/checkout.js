import { loadHeaderFooter } from "../js/utils.mjs";
import checkoutProcess from "./checkout-process.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );

// this is how it would look if we listen for the submit on the form
document.forms["checkout"].addEventListener("submit", (e) => {
    e.preventDefault();
    // e.target would contain our form in this case
    checkoutProcess.checkout(e.target);
});
 
 // listening for click on the submit button
 document.querySelector('#checkoutSubmit')
  .addEventListener('click', (e) => {
    // prevents from submitting form if data invalid
    e.preventDefault();

    // accesses form from the DOM
    var myForm = document.forms[0];

    // checkValidity is a Form method
    var chk_status = myForm.checkValidity();
    myForm.reportValidity();

    // only checkout if chk_status returns true
    if(chk_status) 
      checkoutProcess.checkout();
  });