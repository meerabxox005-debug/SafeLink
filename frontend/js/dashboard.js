console.log("Dashboard Loaded");

// -------------------- Save Profile --------------------
function saveProfile() {
    alert("Profile Updated Successfully!");
}

// -------------------- Welcome Message --------------------
const welcome = document.getElementById("welcomeUser");

const hour = new Date().getHours();
let greeting = "Welcome";

if (hour < 12) {
    greeting = "Good Morning";
} else if (hour < 18) {
    greeting = "Good Afternoon";
} else {
    greeting = "Good Evening";
}

const userName = localStorage.getItem("userName");

if (welcome && userName) {
    welcome.innerHTML = `${greeting}, ${userName}! 👋`;
}

// -------------------- Load Trusted Contact Count --------------------
async function loadContactCount() {
    try {
        const userEmail = localStorage.getItem("userEmail");

        if (!userEmail) return;

        const response = await fetch(
            `https://safelink-1-vyfn.onrender.com/api/contacts/${userEmail}`
        );

        if (!response.ok) {
            throw new Error("Failed to load contacts.");
        }

        const contacts = await response.json();

        const contactCount = document.getElementById("contactCount");
        const contactStat = document.getElementById("contactStat");

        if (contactCount) {
            contactCount.innerText =
                `${contacts.length} Trusted Contact${contacts.length !== 1 ? "s" : ""} Added`;
        }

        if (contactStat) {
            contactStat.innerText = contacts.length;
        }

    } catch (error) {
        console.error("Error loading contacts:", error);
    }
}

// -------------------- Load Dashboard --------------------
window.onload = function () {
    loadContactCount();
};