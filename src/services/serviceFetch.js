export default function getFoodsOrDrinks(url, type) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => data[type]);
}
