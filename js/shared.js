async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}
document.getElementById("year").textContent = new Date().getFullYear("2024");
/*<!--[AU-16-Logou] akile - START-->*/
/*<!--[AU-1-Homepage-Header] fatih - START-->*/

const dropdownBtn = document.querySelector(".header-dropdown-btn");
const languageElement = document.querySelector(".header-language");
const turkishBtn = document.getElementById("turkish-btn");

let currentIndex = 0;
const searchInput = document.querySelector(".search-input");

const renderProducts = (products) => {
  const container = document.querySelector(".search-list");
  container.innerHTML = "";
  const productChunks = chunkArray(products, 4);

  let currentIndex = 0;

  const showProducts = (index) => {
    productChunks[index].forEach((product) => {
      const card = document.createElement("li");
      card.className = "product-card";
      card.innerHTML = `
      <a href="details.html"  width="20px" height="20px">
      <img src="${product.image}" alt="${product.title}" width="40px" height="40px">
          <p>${product.title}</p>
      </a>
          `;
      container.appendChild(card);
    });
  };

  showProducts(currentIndex);
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".search-list")) {
      container.innerHTML = "";
    }
  });
};

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

searchInput.addEventListener("input", async () => {
  const searchTerm = searchInput.value.toLowerCase();
  const products = await getProducts();
  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(searchTerm);
  });
  renderProducts(filteredProducts);
});

function myFunction() {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
/*<!--[AU-1-Homepage-Header] fatih - END-->*/

/*<!--[AU-16-Logou] akile - START-->*/
function userMenu() {
  const menu = document.querySelector(".user-menu");
  menu.classList.toggle("show");
}
/*<!--[AU-16-Logout] akile - END-->*/
