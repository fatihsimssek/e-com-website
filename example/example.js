// Async ile veri alma örneği
/*
const getProductsFromAPIWithAsync = async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  console.log("products with async", products);
  return products;
};
getProductsFromAPIwithAsync();
*/

// Promise ile veri alma örneği
/*
const getProductsFromAPIwithPromise = () => {
  return fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => console.log("products with promise", data));
};
getProductsFromAPIwithPromise();
*/

// Örnek bir uygulama
const getProductsFromAPIWithPromise = () => {
  return fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => renderProducts(data))
    .catch((error) => console.error("Error fetching products:", error));
};

const renderProducts = (products) => {
  const container = document.getElementById("product-container");
  const productChunks = chunkArray(products, 4);

  let currentIndex = 0;

  const showProducts = (index) => {
    container.innerHTML = "";
    productChunks[index].forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
              <img src="${product.image}" alt="${product.title}">
              <div class="product-info">
                  <h3>${product.title}</h3>
                  <p>${product.description}</p>
                  <p class="price">$${product.price.toFixed(2)}</p>
              </div>
          `;
      container.appendChild(card);
    });
  };

  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      showProducts(currentIndex);
    }
  });

  nextButton.addEventListener("click", () => {
    if (currentIndex < productChunks.length - 1) {
      currentIndex++;
      showProducts(currentIndex);
    }
  });

  showProducts(currentIndex);
};

const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

// Uygulamayı çalıştırın
getProductsFromAPIWithPromise();
