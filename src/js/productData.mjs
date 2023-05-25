function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export function getData(category = "tents") {
  return fetch(`../json/${category}.json`)

    // will be carried out when (or rather if)
    // the promise is fulfilled
    .then(convertToJson)
    .then((data) => data);
}

export async function findProductById(id) {
  const products = await getData();
  return products.find((item) => item.Id === id);
}
