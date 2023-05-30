function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

// default category is tents...other categories
// can be specified
export function getData(category = "tents") {
  return fetch(`../json/${category}.json`)

    // .then() will be carried out when (or 
    // rather if) the promise is fulfilled
    .then(convertToJson)
    .then((data) => data);
}

// with async, js pauses the function execution
// until the promise settles
export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
}
