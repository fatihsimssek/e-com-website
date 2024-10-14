const emailInput = document.getElementById("input-login-email");
const passwordInput = document.getElementById("input-login-password");
const loginButton = document.getElementById("login-btn");

document.getElementById("login-btn").addEventListener("click", (event) => {
    event.preventDefault();

    const emailOrPhone = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const phonePattern = /^[0-9]{10}$/;

    const isEmail = emailPattern.test(emailOrPhone);
    const isPhone = phonePattern.test(emailOrPhone);

    if (!isEmail && !isPhone) {
        alert("Please enter a valid email or a 10-digit phone number!");
        return;
    }

    const userList = JSON.parse(localStorage.getItem("userList")) || [];

    const user = userList.find(user => (user.email === emailOrPhone || user.phoneNumber === emailOrPhone));

    if (!user) {
        alert("User not found. Please check your email or phone number!");
        return;
    }

    if (user.password !== password) {
        alert("Incorrect password. Please try again!");
        return;
    }

    user.isLogin = true;
    localStorage.setItem("userList", JSON.stringify(userList));

    window.location.href = "/index.html";
});


emailInput.addEventListener("input", validateInputs);
passwordInput.addEventListener("input", validateInputs);

function validateInputs() {
    if (emailInput.value.trim() === "" || passwordInput.value.trim() === "") {
        loginButton.disabled = true;
    } else {
        loginButton.disabled = false;
    }
}

validateInputs();