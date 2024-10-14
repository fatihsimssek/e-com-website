const registerForm = document.getElementById("register-form");
const registerBtn = document.getElementById("register-btn");

const usernameInput = document.getElementById("input-register-username");
const emailInput = document.getElementById("input-register-email");
const phoneNumberInput = document.getElementById("input-register-phonenumber");
const passwordInput = document.getElementById("input-register-password");

registerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const phoneNumber = phoneNumberInput.value.trim();
    const password = passwordInput.value.trim();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
        return;
    }

    const phonePattern = /^[0-9]{10}$/;
    if (phoneNumber && !phonePattern.test(phoneNumber)) {
        alert("Please enter a valid 10-digit phone number!");
        return;
    }

    const userList = JSON.parse(localStorage.getItem("userList")) || [];

    const emailExists = userList.some(user => user.email === email);
    if (emailExists) {
        alert("This email is already registered. Please use a different email!");
        return;
    }

    const newUser = { username, email, phoneNumber, password, isLogin: false };
    userList.push(newUser);
    localStorage.setItem("userList", JSON.stringify(userList));

    alert("Registration successful. You can now log in!");
    window.location.href = "login.html";
});

document.getElementById("delete-user-btn").addEventListener("click", () => {
    const deleteUserSection = document.getElementById("delete-user-section");

    deleteUserSection.classList.toggle("show");
});


function deleteUser(emailToDelete) {
    const userList = JSON.parse(localStorage.getItem("userList")) || [];
    const userExists = userList.some(user => user.email === emailToDelete);

    if (!userExists) {
        alert("User not found with the provided email!");
        return;
    }

    const updatedUserList = userList.filter(user => user.email !== emailToDelete);
    localStorage.setItem("userList", JSON.stringify(updatedUserList));
    alert("User deleted successfully!");

    document.getElementById("input-delete-user").value = "";
};

document.getElementById("confirm-delete-btn").addEventListener("click", () => {
    const emailToDelete = document.getElementById("input-delete-user").value.trim();
    if (emailToDelete) {
        deleteUser(emailToDelete);
    } else {
        alert("Please enter a valid email!");
    }
});