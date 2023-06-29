import { loadHeaderFooter, getParam  } from "./utils.mjs";
import { login } from "./auth.mjs";
loadHeaderFooter();

const param = getParam("redirect");
const loginButton = document.getElementById("loginBtn");
loginButton.addEventListener("click", (event) => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    login({ email, password }, redirect);
});
