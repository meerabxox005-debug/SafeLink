console.log("Profile Loaded");

// Load profile when page opens
window.onload = function () {

    // Logged-in user
    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    if (userName) {
        document.getElementById("profileName").innerText = userName;
        document.getElementById("name").value = userName;
    }

    if (userEmail) {
        document.getElementById("profileEmail").innerText = userEmail;
        document.getElementById("email").value = userEmail;
    }

    // Load saved profile information
    document.getElementById("phone").value =
        localStorage.getItem("phone") || "";

    document.getElementById("blood").value =
        localStorage.getItem("blood") || "";

    document.getElementById("medical").value =
        localStorage.getItem("medical") || "";
};

// Save profile
function saveProfile() {

    localStorage.setItem("phone", document.getElementById("phone").value);
    localStorage.setItem("blood", document.getElementById("blood").value);
    localStorage.setItem("medical", document.getElementById("medical").value);

    alert("✅ Profile Updated Successfully!");
}