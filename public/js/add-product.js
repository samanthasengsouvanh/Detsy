const productNameEl = document.getElementById("product-name");
const priceEl = document.getElementById("price");
const quantityEl = document.getElementById("quantity");
const productDescriptionEl = document.getElementById("product-description");
const productImageEl = document.getElementById("product-image");
const addItemButtonEl = document.getElementById("add-item");
const fakeFormEl = document.getElementById("fakeForm");

let userData;

axios.get("/api/user_data").then(function(response) {
  console.log(response);
  userData = response.data.username;
  console.log(userData);
  renderFakeForm();
});

function renderFakeForm() {
  fakeFormEl.innerHTML = userData;
}
