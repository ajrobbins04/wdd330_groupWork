// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  
  // JSON.parse parses a JSON string to create
  // an object
  return JSON.parse(localStorage.getItem(key));
}

// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// set a listener for both touchend and click
// (touchend is for touch screens)
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";   
  }
  const htmlString = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlString.join(""));
}


export async function renderWithTemplate(
  templateFn,
  parentElement,
  data,
  callback,
  position = "afterbegin",
  clear = true
) {
  if (clear) {
    parentElement.innerHTML = "";   
  }

  const htmlString = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlString);

  // callback function isn't always included
  if (callback) {
    callback(data);
  }

}


function loadTemplate(path) {
  return async function() {

    // make fetch request to provided filepath
    const response = await fetch(path);
    if (response.ok) {

       // must process as text - not JSON
      const html = await response.text();
      return html;
    }
  }
}

export function loadHeaderFooter() {

  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");

  const header = document.querySelector("#template-header");
  const footer = document.querySelector("#template-footer");

  renderWithTemplate(headerTemplateFn, header);
  renderWithTemplate(footerTemplateFn, footer);
}

export function alertMessage(message, scroll = true, duration = 3000) {

  // create element to hold our alert
  const alert = document.createElement("div");

  // add a class to style the alert
  alert.classList.add("alert");

  // set the contents. You should have a message and an X or something the user can click on to remove
  alert.innerHTML = `<p>${message}</p><span>X</span>`;

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener("click", function (event) {
    if (event.target.tagName == "SPAN") {
      main.removeChild(this);
    }
  });

  // add the alert to the top of main - prepend inserts before first child of parent node
  const main = document.querySelector("main");
  main.prepend(alert);

  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if (scroll) {
    window.scrollTo(0, 0);
  }

  // commenting out would make alert message disappear after given duration time
  //setTimeout(function () {
  //  main.removeChild(alert);
  // }, duration);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}
