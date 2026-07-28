console.log("Profile Loaded");

window.onload = function () {

    const userName = localStorage.getItem("userName");
    const userEmail = localStorage.getItem("userEmail");

    if (userName) {
        document.getElementById("profileName").innerText = userName;
        document.getElementById("fullName").value = userName;
    }

    if (userEmail) {
        document.getElementById("profileEmail").innerText = userEmail;
        document.getElementById("email").value = userEmail;
    }

    document.getElementById("phone").value =
        localStorage.getItem("phone") || "";

    document.getElementById("bloodGroup").value =
        localStorage.getItem("bloodGroup") || "";

    document.getElementById("medicalInfo").value =
        localStorage.getItem("medicalInfo") || "";
};

function saveProfile() {

    // Save edited name
    const fullName = document.getElementById("fullName").value;
    localStorage.setItem("userName", fullName);
    document.getElementById("profileName").innerText = fullName;

    // Save other details
    localStorage.setItem("phone", document.getElementById("phone").value);
    localStorage.setItem("bloodGroup", document.getElementById("bloodGroup").value);
    localStorage.setItem("medicalInfo", document.getElementById("medicalInfo").value);

    alert("✅ Profile Updated Successfully!");
}