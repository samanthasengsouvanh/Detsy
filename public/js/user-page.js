const shopNameEl = document.getElementById("shopName");
const shopDescriptionEl = document.getElementById("shopDescription");
const shopContainerEl = document.getElementById("shopContainer");
const contactSellerEl = document.getElementById("contact-seller");

let realData;

console.log(window.location.href);
console.log(window.location.href.slice(-1));

axios.get("/api/users/all").then(res => console.log(res.data));

const fakeData = [
  {
    shopName: "Paul's Wonderful Things",
    shopDescription: "I sell tried and true cures for your worse ailments",
    productName: "Paul's Polypurpose Panacea",
    productDescription:
      "Have you been hard pressed by the vapors? The grippe got you down? Has your travel overseas gotten you stricken with King's Evil? Suffering from Milk Leg? Well, this magnificent product is for you.  It will cure what ails you, and then some. You will be reinvigorated, recuperated, reeducated, regenerated, refrigerated with no chance of it being regurgitated. This baby goes down smooth, and leaves you feeling smoother.",
    price: "49",
    productImage: "/images/robot.png"
  },
  {
    shopName: "Mary's Custom Scrunchies",
    shopDescription:
      "One stop shop for all your scrunchie needs this decade. Custom made in over 100 fabric options.",
    productName: "Scrunchie XL",
    productDescription: "Super big and poofy scrunchy",
    price: "17.99",
    productImage: "/images/yarn.png"
  },
  {
    shopName: "Peter's Pork Rinds",
    shopDescription:
      "Artisinal small batch pork rinds from locally sourced heirloom swine.",
    productName: "Cool Ranch Pork Rinds",
    productDescription: "Menthol Buttermilk Pork Rinds",
    price: "10.00",
    productImage: "/images/cheese.png"
  },
  {
    shopName: "Ulla's Umbrellas",
    shopDescription: "I made umbrellas.",
    productName: "Mysterious Black Funeral Umbrella",
    productDescription:
      "Black, mysterious umbrella perfect for the funeral of an enemy.",
    price: "22",
    productImage: "/images/umbrella.png"
  },
  {
    shopName: "Chrissy Lou Boo Ton",
    shopDescription: "These expensive these is red bottoms.",
    productName: "CFMPs",
    productDescription: "Bloody shoes",
    price: "859",
    productImage: "/images/shoe.png"
  }
];

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
shuffle(fakeData);

function renderProducts() {
  shopNameEl.innerHTML = fakeData[0].shopName;
  shopDescriptionEl.innerHTML = fakeData[0].shopDescription;
  shopContainerEl.innerHTML = "";
  //put in template literal for user email address
  contactSellerEl.innerHTML = `<a id="contact-seller" href="mailto: info@infoat.com" class="btn open-shop" role="button">Contact Seller</a>`;

  for (let i = 0; i < fakeData.length; i++) {
    const productCard = document.createElement("div");
    productCard.setAttribute("class", "col-6");
    productCard.innerHTML = `

      <div class="card product-card m-1" style="max-width: 540px;">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img id="shop-image" src="${fakeData[i].productImage}" class="card-img">
            </div>
            <div class="col-md-8">
              <div class="card-body ml-4">
                <h5 id="shop-name"class="card-title">${fakeData[i].productName}</h5>
                <p id="price" class="card-text"><small>$ ${fakeData[i].price}</small></p>
                <a id="view-product" href="/product-page" class="btn view-product">View Item</a>
              </div>
            </div>
          </div>
        </div>

      `;
    shopContainerEl.append(productCard);
  }
}
renderProducts();
