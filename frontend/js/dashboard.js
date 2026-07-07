// Get logged-in user's name
const userName = localStorage.getItem("userName");

// Display the name
const welcome = document.getElementById("welcomeUser");
const user = JSON.parse(localStorage.getItem("loggedInUser"));

const hour = new Date().getHours();

let greeting = "Welcome";

if (hour < 12) {
    greeting = "Good Morning";
} else if (hour < 18) {
    greeting = "Good Afternoon";
} else {
    greeting = "Good Evening";
}

if (user) {
    welcome.innerHTML = `${greeting}, ${user.name}! 👋`;
}

const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

document.getElementById("contactCount").innerText =
`${contacts.length} Trusted Contact${contacts.length !== 1 ? "s" : ""} Added`;

document.getElementById("contactStat").innerText = contacts.length;