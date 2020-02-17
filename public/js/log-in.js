const setUpShopBtnEl = document.getElementById("set-up-shop");
const shopEmailEl = document.getElementById("email-address");
const userPasswordEl = document.getElementById("password");
console.log(setUpShopBtnEl, shopEmailEl, userPasswordEl);
// add event listener to setUpShopBtnEl that ...
setUpShopBtnEl.addEventListener("click", function() {
  const email = shopEmailEl.value;

  const password = userPasswordEl.value;
  fetch("/api/login", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      email,
      password
    })
  })
    .then(function(response) {
      const signInAttempt = response.statusText;
      console.log(signInAttempt);
      if (signInAttempt === "OK") {
        success();
      } else {
        failure();
      }
    })
    .catch(function(error) {
      console.log(error);
    });
});
// adds input information into an object that can be added to the database

function success() {
  alert("You are signed in");
}

function failure() {
  alert("Error. Email and password did not match.");
}
