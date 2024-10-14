function logout() {
    const userList = JSON.parse(localStorage.getItem("userList")) || [];

    userList.forEach(user => {
        if (user.isLogin) {
            user.isLogin = false; 
            console.log("User logged out:", user.username); 
        }
    });

    localStorage.setItem("userList", JSON.stringify(userList));
    alert("You have been logged out successfully!"); 
    window.location.href = "/login.html"; 
}

