// Get logged-in user's name
const name = localStorage.getItem("userName");

if (name) {
    welcome.innerHTML = `${greeting}, ${name}! 👋`;
}

// Display the name
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

const name = localStorage.getItem("userName");

if (name) {
    welcome.innerHTML = `${greeting}, ${name}! 👋`;
}

const contacts = JSON.parse(localStorage.getItem("contacts")) || [];

document.getElementById("contactCount").innerText =
`${contacts.length} Trusted Contact${contacts.length !== 1 ? "s" : ""} Added`;

document.getElementById("contactStat").innerText = contacts.length;