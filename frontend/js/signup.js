alert("signup.js loaded");
function signup() {
    alert("signup() started");

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    
    alert("Fields read successfully");
   
    // Check if all fields are filled
    if (name === "" || email === "" || phone === "" || password === "" || confirmPassword === "") {
        alert("Please fill all fields.");
        return;
    }

    // Check passwords match
    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const user = {
        name,
        email,
        phone,
        password
    };

    fetch("https://safelink-1-vyfn.onrender.com/login/api/signup", {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(user)

    })
    .then(res => res.json())
    .then(data => {

        alert(data.message);

        if (data.success) {
            window.location.href = "login.html";
        }

    })
    .catch(err => {
        console.error(err);
        alert("Unable to connect to the backend.");
    });

}