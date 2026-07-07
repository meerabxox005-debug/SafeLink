async function loginUser() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("Please enter your email and password.");
        return;
    }

    try {

        const response = await fetch("http://safelink-hbf7.onrender.com/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await response.json();

        if (data.success) {

            localStorage.setItem("userName", data.user.name);
            localStorage.setItem("userEmail", data.user.email);

            alert(data.message);
            window.location.href = "dashboard.html";
        } else {
            alert(data.message);
        }

    } catch (error) {
        alert("Unable to connect to the backend.");
    }
}