async function loginUser() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    try {
        const response = await fetch("https://safelink-hbf7.onrender.com/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("userEmail", email);

            if (data.user?.name) {
                localStorage.setItem("userName", data.user.name);
            }

            alert(data.message || "Login successful!");
            window.location.href = "dashboard.html";
        } else {
            alert(data.detail || data.message || "Login failed.");
        }

    } catch (error) {
        console.error(error);
        alert("Unable to connect to the server.");
    }
}