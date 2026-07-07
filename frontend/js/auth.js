function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            alert("Login Successful!");
            window.location.href = "dashboard.html";
        } else {
            alert(data.message || "Invalid email or password");
        }
    })
    .catch(err => {
        console.error(err);
        alert("Server error");
    });
}