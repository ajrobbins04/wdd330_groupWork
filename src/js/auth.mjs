import { loginRequest } from "./externalServices.mjs";
import { alertMessage, 
         setLocalStorage,
         getLocalStorage } from "./utils.mjs";

const tokenKey = "token-key";

async function login(creds, redirect) {
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey,token);
        location.assign(redirect);
    } catch (err) {
        // err contains 2 properties: name and message
        alertMessage(err.message);
    }

}

function checkLogin() {

    const token = getLocalStorage(tokenKey);
    const valid = isTokenValid();

    if (!valid) {
        localStorage.removeItem(tokenKey);
        const location = window.location;
        console.log(location);
        window.location = `/login/index.html?redirect=${location.pathname}`;
    }
    else return token;

}

function isTokenValid() {

}