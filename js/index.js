async function getProducts() {
  const productsResponse = await fetch("https://fakestoreapi.com/products");
  const productsData = await productsResponse.json();
  return productsData;
}
document.getElementById("year").textContent = new Date().getFullYear("2024");
const bestSellingProductsContainer = document.getElementById(
  "best-selling-products-api"
);
const toggleBtnText = document.getElementById("best-selling-products-btn");

let bestSellingProducts = [];
let allBestSellingProducts = [];
let productsData = [];
let currentStartIndex = 0;
let viewAllOpen = false;

/* [Today's-Products] AkileNisa - START */
function fetchProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((data) => {
      productsData = data;
      displayProducts();
    })
    .catch((error) => console.error("Error:", error));
}

// Ürünü wishlist ya da cart'a ekleme/çıkarma fonksiyonu
function toggleItem(productId, listType, products) {
  const icon = document.getElementById(`icon-${listType}-${productId}`);
  if (!icon) return;

  const storageKey = `${listType}Products`; // localStorage'daki anahtar
  let storedItems = JSON.parse(localStorage.getItem(storageKey)) || [];
  const addedProduct = products.find((product) => product.id === productId);
  if (!addedProduct) return;

  const alreadyInList = storedItems.some((product) => product.id === productId);

  if (alreadyInList) {
    // Eğer zaten listede varsa, listeden çıkar
    storedItems = storedItems.filter((product) => product.id !== productId);
  } else {
    // Eğer listede yoksa, ekle
    storedItems.push(addedProduct);
  }

  // localStorage'a güncellenmiş listeyi kaydet
  localStorage.setItem(storageKey, JSON.stringify(storedItems));

  // Icon'un durumunu güncelle
  toggleIconState(icon, listType, !alreadyInList);
}

// Icon'un durumunu değiştiren fonksiyon
function toggleIconState(icon, listType, isAdded) {
  if (isAdded) {
    icon.classList.add("active"); // Ürünün ekli olduğu durumu göster
    icon.setAttribute("title", `Remove from ${listType}`);
  } else {
    icon.classList.remove("active"); // Ürünün ekli olmadığı durumu göster
    icon.setAttribute("title", `Add to ${listType}`);
  }
}

// Sayfa yüklendiğinde icon'ların durumunu güncelleyen fonksiyon
function updateIconState() {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  productsData.forEach((product) => {
    const wishlistIcon = document.getElementById(`icon-wishlist-${product.id}`);
    const cartIcon = document.getElementById(`icon-cart-${product.id}`);

    if (wishlistIcon) {
      const isInWishlist = wishlistProducts.some(
        (item) => item.id === product.id
      );
      toggleIconState(wishlistIcon, "wishlist", isInWishlist);
    }

    if (cartIcon) {
      const isInCart = cartProducts.some((item) => item.id === product.id);
      toggleIconState(cartIcon, "cart", isInCart);
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  displayProducts();
});
// Ürünleri ekranda gösterme fonksiyonu
function displayProducts() {
  const productList = document.getElementById("product-list");
  if (!productList) {
    console.error("product-list element not found");
    return; // Eğer element yoksa işlem yapma
  }
  productList.innerHTML = "";

  let numProductsToShow = 4;
  if (window.innerWidth < 500) {
    numProductsToShow = 1;
  } else if (window.innerWidth < 820) {
    numProductsToShow = 2;
  } else if (window.innerWidth < 960) {
    numProductsToShow = 3;
  }

  const selectedProducts = productsData.slice(
    currentStartIndex,
    currentStartIndex + numProductsToShow
  );
  selectedProducts.forEach((product) => {
    const productDiv = createProductElement(product);
    productList.appendChild(productDiv);
  });

  updateIconState();
}

// Ürün elementini oluşturma fonksiyonu
function createProductElement(product) {
  const productDiv = document.createElement("div");
  productDiv.className = "product";

  const halfPrice = (product.price / 2).toFixed(2);
  const productName =
    product.title.length > 20
      ? product.title.substring(0, 20) + "..."
      : product.title;

  productDiv.innerHTML = `
    <div class="discount">50% OFF</div>
    <img src="${product.image}" alt="${
    product.title
  }" style="width: 100px; height: 100px;">
    <div class="product-title">
      <h2 class="product-name">${productName}</h2>
    </div>
    <div class="product-price-rating">
      <div class="product-title-price">
        <p class="price-title">$${product.price}</p>
        <div class="half-price">$${halfPrice}</div>
      </div>
      <div class="rating">
        <div class="stars">${generateStars(product.rating.rate)}</div>
        <p class="vote">(${product.rating.count})</p>
      </div>
    </div>
    <div class="icons">
      <div class="icon-container">
        <div class="icon-wishlist">
          <i class="fa-regular fa-heart" id="icon-wishlist-${
            product.id
          }" onclick="toggleItem(${product.id}, 'wishlist', productsData)"></i>
          <span class="tooltip">Add to wishlist</span>
        </div>
        <div class="icon-cart">
          <i class="fa-solid fa-cart-shopping" id="icon-cart-${
            product.id
          }" onclick="toggleItem(${product.id}, 'cart', productsData)"></i>
          <span class="tooltip">Add to cart</span>
        </div>
      </div>
    </div>
  `;
  return productDiv;
}

// Ekran boyutu değiştiğinde ürünleri yeniden göster
window.addEventListener("resize", displayProducts);

// Başlangıçta ürünleri göster
displayProducts();

// Yıldızları oluşturma fonksiyonu
function generateStars(starRating) {
  const filledStars = Math.round(starRating);
  const emptyStars = 5 - filledStars;
  return `${'<i class="fas fa-star filled"></i>'.repeat(filledStars)}  
          ${'<i class="fas fa-star"></i>'.repeat(emptyStars)}`;
}

// Okları kullanarak ürünleri kaydırma
function handleArrowTodayClick(direction) {
  currentStartIndex =
    direction === "left"
      ? (currentStartIndex - 4 + productsData.length) % productsData.length
      : (currentStartIndex + 4) % productsData.length;

  displayProducts();
}

// Tüm ürünleri gösterme/kapama
function toggleViewAllProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  viewAllOpen = !viewAllOpen;

  if (viewAllOpen) {
    productList.classList.add("grouped");
    const totalProducts = productsData.length;

    // Ürünleri dörtlü gruplar halinde göster
    for (let i = 0; i < totalProducts; i += 4) {
      const productGroup = document.createElement("div");
      productGroup.className = "product-group";

      const selectedProducts = productsData.slice(i, i + 4);
      selectedProducts.forEach((product) => {
        const productDiv = createProductElement(product);
        productGroup.appendChild(productDiv);
      });

      productList.appendChild(productGroup);
      document.getElementById("view-all-products").textContent =
        "View Less Products";
    }
  } else {
    productList.classList.remove("grouped");
    document.getElementById("view-all-products").textContent =
      "View All Products";
    displayProducts();
  }
}

// Geriye sayma sayacı
function startCountdown() {
  const countdown = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
  };
  let timeLeft = 4 * 24 * 60 * 60;
  const interval = setInterval(() => {
    const days = Math.floor(timeLeft / (24 * 3600));
    const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    countdown.days.textContent = String(days).padStart(2, "0");
    countdown.hours.textContent = String(hours).padStart(2, "0");
    countdown.minutes.textContent = String(minutes).padStart(2, "0");
    countdown.seconds.textContent = String(seconds).padStart(2, "0");

    if (timeLeft > 0) {
      timeLeft--;
    } else {
      clearInterval(interval);
      fetchProducts();
      startCountdown();
    }
  }, 1000);
}

// Başlangıç fonksiyonları
document
  .getElementById("left-arrow")
  .addEventListener("click", () => handleArrowTodayClick("left"));
document
  .getElementById("right-arrow")
  .addEventListener("click", () => handleArrowTodayClick("right"));
document
  .getElementById("view-all-products")
  .addEventListener("click", toggleViewAllProducts);

fetchProducts();
startCountdown();
startCountdownfeatured();

/* [Today's-Products] AkileNisa - END */

/* [AU-03] AkileNisa - STAR */

let startIndex = 0;
let visibleCategories = 6;
const categories = document.querySelectorAll(".homepage-categoriy-card");
const totalCategories = categories.length;

function updateCategories() {
  categories.forEach((category) => {
    category.style.display = "none";
  });

  for (let i = 0; i < visibleCategories; i++) {
    const currentIndex = (startIndex + i) % totalCategories;
    categories[currentIndex].style.display = "flex";
  }
}

function updateVisibleCategories() {
  if (window.innerWidth <= 770) {
    visibleCategories = 2;
  } else if (window.innerWidth <= 1070) {
    visibleCategories = 4;
  } else {
    visibleCategories = 6;
  }
}

window.addEventListener("resize", function () {
  updateVisibleCategories();
  updateCategories();
});

function handleArrowClick(direction) {
  if (direction === "left") {
    startIndex = (startIndex + 1) % totalCategories;
  } else {
    startIndex = (startIndex - 1 + totalCategories) % totalCategories;
  }
  updateCategories();
}

document
  .querySelector(".homepage-category-btn-prev")
  .addEventListener("click", () => handleArrowClick("left"));
document
  .querySelector(".homepage-category-btn-next")
  .addEventListener("click", () => handleArrowClick("right"));

updateVisibleCategories();
updateCategories();
/* [AU-03] AkileNisa/Homepage Category - END */

// [AU-4] - Furkan/Homepage Best Selling Products Section Start

async function productsRender() {
  try {
    if (allBestSellingProducts.length === 0) {
      allBestSellingProducts = await getProducts();
    }

    if (bestSellingProducts.length === 0) {
      bestSellingProducts = allBestSellingProducts.slice(0, 4);
    }

    bestSellingProductsContainer.innerHTML = bestSellingProducts
      .map((product) => {
        return `<div class="homepage-best-selling-products-container-goods">
                <div class="homepage-best-selling-products-container-goods-img">
                  <div class="homepage-best-selling-products-img-container">
                    <img src="${product.image}" alt="${product.title}">
                  </div>
                  <div class="icon-container">
                    <div class="icon-wishlist">
                      <i class="fa-regular fa-heart" id="icon-wishlist-${
                        product.id
                      }" onclick="toggleItem(${
          product.id
        }, 'wishlist', allBestSellingProducts)"></i>
                      <span class="tooltip">Add to wishlist</span>
                    </div>
                    <div class="icon-cart">
                      <i class="fa-solid fa-cart-shopping" id="icon-cart-${
                        product.id
                      }" onclick="toggleItem(${
          product.id
        }, 'cart', allBestSellingProducts)"></i>
                      <span class="tooltip">Add to cart</span>
                    </div>
                  </div>
                </div>
                <div class="goods-info">
                  <h3>${maxTitleCharacter(product.title, 28)}</h3>
                  <div class="goods-price">
                    <h3>$${discount(product).toFixed(2)}</h3>
                    <h3 class="base-price"><s>$${product.price}</s></h3>
                  </div>
                  <div class="goods-rating-container">
                    ${generateStars(product.rating.rate)}
                    <h4 class="goods-amount">(${product.rating.count})</h4>
                  </div>
                </div>
              </div>`;
      })
      .join("");

    updateIconState();
  } catch (error) {
    console.error("Couldn't render products:", error);
  }
}

function toggleProductsView() {
  if (bestSellingProducts.length === allBestSellingProducts.length) {
    bestSellingProducts = allBestSellingProducts.slice(0, 4);
    toggleBtnText.textContent = "View All";
  } else {
    bestSellingProducts = allBestSellingProducts;
    toggleBtnText.textContent = "View Less";
  }
  productsRender();
}

function toggleItem(productId, listType, products) {
  const icon = document.getElementById(`icon-${listType}-${productId}`);
  if (!icon) return;
  const storageKey = `${listType}Products`;
  let allItems = JSON.parse(localStorage.getItem(storageKey)) || [];
  const addedProduct = products.find((product) => product.id === productId);
  if (!addedProduct) return;
  const inList = allItems.some((product) => product.id === productId);

  if (inList) {
    allItems = allItems.filter((product) => product.id !== productId);
  } else {
    allItems.push(addedProduct);
  }
  localStorage.setItem(storageKey, JSON.stringify(allItems));

  toggleIconState(icon, listType, !inList);
}

function updateIconState() {
  const wishlistProducts =
    JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];

  allBestSellingProducts.forEach((product) => {
    const wishlistIcon = document.getElementById(`icon-wishlist-${product.id}`);
    const cartIcon = document.getElementById(`icon-cart-${product.id}`);

    if (wishlistIcon) {
      const inWishlist = wishlistProducts.some(
        (item) => item.id === product.id
      );
      toggleIconState(wishlistIcon, "wishlist", inWishlist);
    }

    if (cartIcon) {
      const inCart = cartProducts.some((item) => item.id === product.id);
      toggleIconState(cartIcon, "cart", inCart);
    }
  });
}

function toggleIconState(iconType, listType, inList) {
  iconType.classList.toggle("active", inList);
  if (inList) {
    iconType.classList.remove(
      listType === "wishlist" ? "fa-regular" : "fa-cart-shopping"
    );
    iconType.classList.add(listType === "wishlist" ? "fa-solid" : "fa-check");
    iconType.style.color = listType === "wishlist" ? "#C20000" : "#1A9900";
  } else {
    iconType.classList.remove(
      listType === "wishlist" ? "fa-solid" : "fa-check"
    );
    iconType.classList.add(
      listType === "wishlist" ? "fa-regular" : "fa-cart-shopping"
    );
    iconType.style.color = "";
  }
}

function discount(product) {
  return product.price - (product.price * 30) / 100;
}

function maxTitleCharacter(title, maxLength) {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + "...";
  } else {
    return title;
  }
}

function generateStars(starRating) {
  const filledStars = Math.round(starRating);
  const emptyStars = 5 - filledStars;
  return `
    ${'<i class="fa-solid fa-star star filled"></i>'.repeat(filledStars)}
    ${'<i class="fa-solid fa-star star"></i>'.repeat(emptyStars)}
  `;
}

productsRender();
// [AU-4] - Furkan/Homepage Best Selling Products Section Start

/*<!--[AU-1-Homepage-Header] fatih - START-->*/

const dropdownBtn = document.querySelector(".header-dropdown-btn");
const languageElement = document.querySelector(".header-language");
const turkishBtn = document.getElementById("turkish-btn");

const dropdowns = document.querySelectorAll(".cat-dropdown");

dropdowns.forEach((dropdown) => {
  dropdown.addEventListener("click", () => {
    const subCat = dropdown.querySelector(".sub-cat");

    subCat.style.display = subCat.style.display === "block" ? "none" : "block";
  });
});

let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const totalSlides = slides.length;
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

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateSlider();
  });
});

function updateSlider() {
  let width = window.innerWidth;
  if (width > 600) {
    const translatePercentage = -100 * currentIndex;
    document.querySelector(
      ".slides"
    ).style.transform = `translateX(${translatePercentage}%)`;
  } else {
    const translatePercentage = -100 * currentIndex;
    document.querySelector(
      ".slides"
    ).style.transform = `translateX(${translatePercentage}%)`;
  }
}

function autoSlide() {
  currentIndex = (currentIndex + 1) % totalSlides;
  updateSlider();
}
setInterval(autoSlide, 3000);

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

/*<!--[AU-5-Homepage Featured Product] fatih - START-->*/
function startCountdownfeatured() {
  const countdown = {
    days: document.getElementById("countdown-featured-days"),
    hours: document.getElementById("countdown-featured-hours"),
    minutes: document.getElementById("countdown-featured-minutes"),
    seconds: document.getElementById("countdown-featured-seconds"),
  };
  let timeLeft = 4 * 24 * 60 * 60;
  const interval = setInterval(() => {
    const days = Math.floor(timeLeft / (24 * 3600));
    const hours = Math.floor((timeLeft % (24 * 3600)) / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    countdown.days.textContent = String(days).padStart(2, "0");
    countdown.hours.textContent = String(hours).padStart(2, "0");
    countdown.minutes.textContent = String(minutes).padStart(2, "0");
    countdown.seconds.textContent = String(seconds).padStart(2, "0");

    if (timeLeft > 0) {
      timeLeft--;
    } else {
      clearInterval(interval);
      startCountdownfeatured();
    }
  }, 1000);
}

/*<!--[AU-5-Homepage Featured Product] fatih - END-->*/
//[AU-6]-Esra / Homepage Our Products List Start

const homepageOurProductsContainer = document.getElementById(
  "homepage-our-products-details"
);
const viewAllBtn = document.getElementById("he-view-all-products");

let homepageOurProducts = [];
let allHomepageOurProducts = [];
let currentStartIndexE = 0;

async function ourProductList() {
  try {
    if (allHomepageOurProducts.length === 0) {
      allHomepageOurProducts = await getProducts();
    }

    homepageOurProducts = allHomepageOurProducts.slice(
      currentStartIndexE,
      currentStartIndexE + 8
    );

    homepageOurProductsContainer.innerHTML = homepageOurProducts
      .map((product) => {
        return `<div class="homepage-our-products-details-container">
                  <div class="homepage-our-products-container-details">
                    <div class="homepage-our-products-img-container">
                      <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="icon-container">
                      <div class="icon-wishlist">
                        <i class="fa-regular fa-heart" id="icon-wishlist-${
                          product.id
                        }" onclick="toggleItem(${
          product.id
        }, 'wishlist', allHomepageOurProducts)"></i>
                        <span class="tooltip">Add to wishlist</span>
                      </div>
                      <div class="icon-cart">
                        <i class="fa-solid fa-cart-shopping" id="icon-cart-${
                          product.id
                        }" onclick="toggleItem(${
          product.id
        }, 'cart', allHomepageOurProducts)"></i>
                        <span class="tooltip">Add to cart</span>
                      </div>
                    </div>
                  </div>
                  <div class="goods-info">
                    <h3>${maxTitleCharacter(product.title, 28)}</h3>
                    <div class="goods-price">
                      <h3 class="our-products-price">$${product.price}</h3>
                    </div>
                    <div class="goods-rating-container">
                      ${generateStars(product.rating.rate)}
                      <h4 class="goods-amount">(${product.rating.count})</h4>
                    </div>
                  </div>
                </div>`;
      })
      .join("");

    updateIconState();
  } catch (error) {
    console.error("Couldn't render products:", error);
  }
}

ourProductList();

document
  .getElementById("he-left-arrow")
  .addEventListener("click", () => handleOPArrowClick("left"));
document
  .getElementById("he-right-arrow")
  .addEventListener("click", () => handleOPArrowClick("right"));

function handleOPArrowClick(direction) {
  if (direction === "left") {
    currentStartIndexE =
      (currentStartIndexE - 8 + allHomepageOurProducts.length) %
      allHomepageOurProducts.length;
  } else {
    currentStartIndexE =
      (currentStartIndexE + 8) % allHomepageOurProducts.length;
  }
  ourProductList();
}

document
  .getElementById("he-view-all-products")
  .addEventListener("click", toggleOurProductsView);

// Our Product Tüm ürünleri gösterme/kapama

let viewAllOpenE = false;

function toggleOurProductsView() {
  const homepageOurProductsContainer = document.getElementById(
    "homepage-our-products-details"
  );
  const exploreProductsArrows = document.querySelectorAll(
    ".he-explore-products-arrows"
  );

  homepageOurProductsContainer.innerHTML = "";

  viewAllOpenE = !viewAllOpenE;

  if (viewAllOpenE) {
    homepageOurProductsContainer.classList.add("grouped");

    for (let i = 0; i < productsData.length; i += 4) {
      const homepageContainerProductGroup = document.createElement("div");
      homepageContainerProductGroup.className = "our-product-group";

      const selectedProducts = productsData.slice(i, i + 4);
      selectedProducts.forEach((productE) => {
        const productEDiv = createProductElement(productE);
        homepageContainerProductGroup.appendChild(productEDiv);
      });

      homepageOurProductsContainer.appendChild(homepageContainerProductGroup);
    }

    document.getElementById("he-view-all-products").textContent =
      "View Less Products";
    exploreProductsArrows.forEach((arrow) => {
      arrow.style.display = "none";
    });
  } else {
    homepageOurProductsContainer.classList.remove("grouped");
    ourProductList();
    document.getElementById("he-view-all-products").textContent =
      "View All Products";
    exploreProductsArrows.forEach((arrow) => {
      arrow.style.display = "flex";
    });
  }
}

//[AU-6]-Esra / Homepage Our Products List End
