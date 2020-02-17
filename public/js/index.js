// import API from "/js/api.js";
const signUpBtnEl = document.getElementById("sign-up-btn");
const cardEls = document.querySelectorAll(".card");

let realData;

axios.get("/api/users/all").then(function(response) {
  realData = response.data;
  realData.reverse();
  renderCards();
});

//function that will render the innerHTMl of the 6 cards on the page
function renderCards() {
  for (let i = 0; i < cardEls.length; i++) {
    const card = cardEls[i];
    card.innerHTML = `  <img src="/images/robot.png" class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="shop-name card-title">${realData[i].shopName}</h5>
          <p id="shop-description" class="card-text">${realData[i].shopDescription}</p>
          <a href="/user-page/${realData[i].id}" class="btn visit-shop">Visit Shop</a>
      </div>`;
  }
}
