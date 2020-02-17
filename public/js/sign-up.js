const setUpShopBtnEl = document.getElementById("set-up-shop");
const shopImageEl = document.getElementById("shop-image");
const shopNameEl = document.getElementById("shop-name");
const shopDescriptionEl = document.getElementById("shop-description");
const shopEmailEl = document.getElementById("email-address");
const usernameEl = document.getElementById("user-name");
const userPasswordEl = document.getElementById("password");
// add event listener to setUpShopBtnEl that ...
setUpShopBtnEl.addEventListener("click", function() {
  const shopImage = shopImageEl.value;
  const shopName = shopNameEl.value;
  const shopDescription = shopDescriptionEl.value;
  const email = shopEmailEl.value;
  const username = usernameEl.value;
  const password = userPasswordEl.value;

  // eslint-disable-next-line no-undef
  axios
    .post("/api/signup", {
      shopImage,
      shopName,
      shopDescription,
      email,
      username,
      password
    })
    .then(function(response) {
      switch (response.data.errors[0].path) {
        case "password":
          passwordWrong();
          break;
        case "username":
          usernameWrong();
          break;
        case "email":
          emailWrong();
          break;
        default:
          sucess();
          break;
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});

function passwordWrong() {
  alert("There was an issue with your password. Try again, please.");
}
function usernameWrong() {
  alert("There was an issue with your username. Try a new one, please.");
}
function emailWrong() {
  alert("There was an issue with your email. Try a new one, please.");
}
function sucess() {
  alert("Success");
}
