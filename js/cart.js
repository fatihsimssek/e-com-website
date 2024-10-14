let cartProducts = [];

const subtotalPrice = document.querySelector(".subtotal-price");
const totalPrice = document.querySelector(".total-price");
const cartCoupon = document.querySelector(".cart-coupon");
const cartApplyBtn = document.querySelector(".cart-apply-btn");

const cartList = document.querySelector(".cart-product-list");

const getCartProductsFromLocalStorage = JSON.parse(
  localStorage.getItem("cartProducts")
);

cartProducts = getCartProductsFromLocalStorage;
cartList.innerHTML = `${cartProducts
  .map((product) => {
    return `<li>
          <div>
            <img src=${product.image} />
            <p>${product.title.slice(0, 30)}...</p>
          </div>
          <p>$${product.price}</p>
          <span>
            <input id="quantity" type="number" placeholder="1" min="1" max="99" />
          </span>
          <p class="product-subtotal-price">$${product.price}</p>
        </li>`;
  })
  .join("")}`;

const quantities = document.querySelectorAll("#quantity");
quantities.forEach((quantityInput, index) => {
  quantityInput.addEventListener("input", (e) => {
    const quantityValue = e.target.value;
    const productPrice = cartProducts[index].price;
    const productSubtotalPriceElement = document.querySelectorAll(
      ".product-subtotal-price"
    )[index];

    // Alt toplamı güncelle
    const newSubtotal = quantityValue * productPrice;
    productSubtotalPriceElement.textContent = `$${newSubtotal.toFixed(2)}`;

    // Toplam fiyatı yeniden hesapla
    calculateTotalPrice();
  });
});

const productPrices = document.querySelectorAll(".product-subtotal-price");

const coupons = {
  APPLY100: 100,
  APPLY200: 200,
  APPLY300: 300,
};

const calculateTotalPrice = (discount = 0) => {
  let priceCount = 0;

  productPrices.forEach((product) => {
    priceCount += Number(product.textContent.substring(1));
  });

  subtotalPrice.textContent = "$" + priceCount.toFixed(2);

  // İndirimi uygula
  const discountedPrice = priceCount - discount;
  totalPrice.textContent = "$" + discountedPrice.toFixed(2);
};

calculateTotalPrice();

cartApplyBtn.addEventListener("click", () => {
  const enteredCoupon = cartCoupon.value;

  // Geçerli kupon kodunu kontrol et
  if (coupons[enteredCoupon]) {
    const discountAmount = coupons[enteredCoupon];

    // Toplam fiyatı kupon indirimi ile güncelle
    calculateTotalPrice(discountAmount);
  } else {
    console.log("Geçersiz kupon kodu");
  }
});
