function changeMainImage(selectedImage) {
    const mainImage = document.querySelector('.pdp-imgs-big-img img');
    const selectedImgSrc = selectedImage.querySelector('img').src;

    mainImage.src = selectedImgSrc;

    const smallImages = document.querySelectorAll('.pdp-imgs-small-img');
    smallImages.forEach(img => img.classList.remove('selected'));
    selectedImage.classList.add('selected');
};

function initializeMainImage() {
    const firstSmallImage = document.querySelector('.pdp-imgs-small-img');
    changeMainImage(firstSmallImage);
};

window.onload = initializeMainImage;

function selectColor(button) {
    const buttons = document.querySelectorAll('.pdp-color-picker-choices button');
    buttons.forEach(btn => btn.classList.remove('selected-color'));
    
    button.classList.add('selected-color');
};

const colorButtons = document.querySelectorAll('.pdp-color-picker-choices button');
colorButtons.forEach(button => {
    button.addEventListener('click', function() {
        selectColor(button);
    });
});

window.onload = function() {
    const initialColorButton = document.querySelector('.pdp-color-picker-choices .selected-color');
    if (initialColorButton) {
        selectColor(initialColorButton);
    }
};

function selectSize(button) {
    const buttons = document.querySelectorAll('.pdp-size-choices button');
    buttons.forEach(btn => btn.classList.remove('selected-size'));
    
    button.classList.add('selected-size');
}

const sizeButtons = document.querySelectorAll('.pdp-size-choices button');
sizeButtons.forEach(button => {
    button.addEventListener('click', function() {
        selectSize(button);
    });
});

window.onload = function() {
    const initialSizeButton = document.querySelector('.pdp-size-choices .selected-size');
    if (initialSizeButton) {
        selectSize(initialSizeButton);
    }
};

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    
    if (currentValue < 99) {
        quantityInput.value = currentValue + 1;
    }
};

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
    }
};

function validateQuantity() {
    const quantityInput = document.getElementById('quantity');
    let value = parseInt(quantityInput.value);

    if (isNaN(value) || value < 1) {
        quantityInput.value = 1;
    }
    else if (value > 99) {
        quantityInput.value = 99;
    }
};

function toggleState() {
    const heartIcon = document.getElementById('wishlist-icon');
    
    if (heartIcon.classList.contains('fa-solid')) {
        heartIcon.classList.remove('fa-solid');
        heartIcon.classList.add('fa-regular');
    } else {
        heartIcon.classList.remove('fa-regular');
        heartIcon.classList.add('fa-solid');
    }
};