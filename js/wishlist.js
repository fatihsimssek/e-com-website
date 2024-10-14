const wishlistProductsContainer = document.getElementById("wishlist-page-products-api");

let wishlistProducts = [];

function renderWishlistProducts() {
  try {
    wishlistProducts = JSON.parse(localStorage.getItem("wishlistProducts")) || [];

    wishlistProductsContainer.innerHTML = wishlistProducts.length ? wishlistProducts.map((product) => {
      return `<div class="wishlist-page-products-container-goods" id="wishlist-products-${product.id}">
                <div class="wishlist-page-products-container-goods-img">
                  <div class="wishlist-page-products-img-container">
                    <img src="${product.image}" alt="${product.title}">
                  </div>
                  <div class="icon-container">
                    <div class="icon-delete">
                      <i class="fa-solid fa-trash" id="icon-delete-${product.id}" onclick="removeFromWishlist(${product.id})"></i>
                      <span class="tooltip">Remove from wishlist</span>
                    </div>
                  </div>
                  <button class="wishlist-page-cart-btn" id="cart-btn-${product.id}" onclick="handleAddToCart(${product.id}, wishlistProducts, this)">
                    <i class="fa-solid fa-cart-shopping"></i>
                    Add to Cart
                  </button>
                </div>
                <div class="goods-info">
                  <h3>${maxTitleCharacter(product.title, 30)}</h3>
                  <h4>$${product.price}</h4>
                </div>
              </div>`        
    })
    .join('') 
    :`<div class="empty-page-layout">
        <h3>Your Wishlist is Empty</h3>
        <p>Add some products to your wishlist to start shopping</p>
        <a href="index.html"><button class="back-to-shop-btn">Back to Shop</button></a>
      </div>`;

    wishlistProducts.forEach((product) => updateCartBtnState(product.id));

  } catch (error) {
    console.error("Error loading wishlist products:", error);
    wishlistProductsContainer.innerHTML = "<p>Error loading wishlist. Please try again later.</p>";
  }
}

function updateWishlistCount() {
  const wishlistCount = document.querySelector(".wishlist-product-count");
  wishlistCount.innerHTML = wishlistProducts.length;
}

function moveAllToCart() {
  const wishlistProducts = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  if (wishlistProducts.length === 0) {
    alert('Your wishlist is empty.');
    return;
  }

  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const cartProductsId = new Set(cartProducts.map(product => product.id));
  const newCartProducts = wishlistProducts.filter(product => !cartProductsId.has(product.id));
  const updatedCartProducts = [...cartProducts, ...newCartProducts];
  localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
  localStorage.removeItem("wishlistProducts");

  window.location.href = 'cart.html';
}

function removeFromWishlist(productId) {
  let wishlistProducts = JSON.parse(localStorage.getItem("wishlistProducts")) || [];
  wishlistProducts = wishlistProducts.filter(product => product.id !== productId);
  localStorage.setItem("wishlistProducts", JSON.stringify(wishlistProducts));

  const productElement = document.getElementById(`wishlist-products-${productId}`);
  if (productElement) {
    productElement.remove();
  }

  renderWishlistProducts();
  updateWishlistCount();
}

function handleAddToCart(productId, products, btnElement) {
  if (btnElement.classList.contains("go-to-cart")) {
    window.location.href = "cart.html";
  } else {
    addToCart(productId, products);

    const iconElement = btnElement.querySelector("i.fa-cart-shopping");
    toggleCartBtnState(iconElement, true);

    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Go to Cart';
    btnElement.classList.add("go-to-cart");
    btnElement.style.backgroundColor = "#235347";
    btnElement.style.color = "#ffffff";
  }
}

function addToCart(productId, products) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const newCartProduct = products.find((product) => parseInt(product.id) === parseInt(productId));
  if (!newCartProduct) return;

  const isInCart = cartProducts.some((product) => parseInt(product.id) === parseInt(productId));
  if (!isInCart) {
    localStorage.setItem("cartProducts",JSON.stringify([...cartProducts, newCartProduct]));
  } else if (products != wishlistProducts) {
    removeFromCart(productId);
  }
}

function removeFromCart(productId) {
  let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  cartProducts = cartProducts.filter(product => parseInt(product.id) !== parseInt(productId));
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}

function toggleCartBtnState (btnElement, isInCart) {
  btnElement.classList.toggle('active', isInCart);
  if (isInCart) {
    btnElement.classList.remove('fa-cart-shopping');
    btnElement.classList.add('fa-check');
  } else {
    btnElement.classList.remove('fa-check');
    btnElement.classList.add('fa-cart-shopping');
  }
}

function updateCartBtnState(productId) {
  const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
  const btnElement = document.getElementById(`cart-btn-${productId}`);

  const isInCart = cartProducts.some((product) => parseInt(product.id) === parseInt(productId));
  if (isInCart) {
    btnElement.innerHTML = '<i class="fa-solid fa-check"></i> Go to Cart';
    btnElement.classList.add("go-to-cart");
    btnElement.style.backgroundColor = "#235347";
    btnElement.style.color = "#ffffff";
  }
}

function maxTitleCharacter(title, maxLength) {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
}

renderWishlistProducts();
updateWishlistCount();