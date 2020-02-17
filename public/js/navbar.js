const rightNavEl = document.getElementById("rightNav");
const yourGoodsEl = document.getElementById("yourGoods");
const addProductEl = document.getElementById("addProduct");

let userData;

axios.get("/api/user_data").then(function(response) {
  console.log(response);
  userData = response.data;
  console.log(userData);
  renderGreeting();
});

function renderGreeting() {
  if (userData.username === undefined) {
    yourGoodsEl.setAttribute("href", "/log-in");
    addProductEl.setAttribute("href", "/log-in");
  } else {
    yourGoodsEl.setAttribute("href", `/user-page/${userData.id}`);
    const username = document.createElement("p");
    username.innerHTML = `Hello, ${userData.username}`;
    username.setAttribute("class", "nav-bar-username");
    rightNavEl.prepend(username);
  }
}
