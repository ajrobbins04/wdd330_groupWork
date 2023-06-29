import { loginRequest } from "./externalServices.mjs";
import { alertMessage, 
         setLocalStorage,
         getLocalStorage } from "./utils.mjs";
import jwt_decode from "jwt-decode";

const tokenKey = "so-token";


function isTokenValid(token) {

    if (token) {
        const tokenDecoded = jwt_decode(token);

        const date = new Date();
        if (tokenDecoded.exp * 1000 < date.getTime()) {
            console.log("token invalid");
            return false;
        }
        else {
            console.log("token valid")
            return true;
        }
    } else {
        console.log("token not found");
        return false;
    }
}

function checkLogin() {

    // get token from local storage
    const token = getLocalStorage(tokenKey);

    // use isTokenValid() to check token's validity
    const valid = isTokenValid(token);

    // if token is NOT valid
    if (!valid) {

        // remove stored token
        localStorage.removeItem(tokenKey);

        // grab current location from the browser
        const location = window.location;

        console.log(location);

        // redirect by updating window.location
        window.location = `/login/index.html?redirect=${location.pathname}`;
    }
    // user successfully logged in
    else return token;

}

export async function login(creds, redirect = "/") {
    try {
        const token = await loginRequest(creds);
        setLocalStorage(tokenKey,token);
        location.assign(redirect);
    } catch (err) {
        // err contains 2 properties: name and message
        alertMessage(err.message);
    }

}
