alert("contacts.js loaded");

// Load saved contacts when page opens
window.onload = loadContacts;

// Add a new contact
async function addContact() {

    alert("Button clicked!");

    const name = document.getElementById("contactName").value;
const phone = document.getElementById("contactPhone").value;
const email = document.getElementById("contactEmail").value;
const relationship = document.getElementById("relationship").value;

    if (!name || !phone || !email || !relationship) {
        alert("Please fill all fields.");
        return;
    }

    // Get logged-in user's email
    const userEmail = localStorage.getItem("userEmail");

    try {

        const response = await fetch("https://safelink-hbf7.onrender.com/api/add-contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userEmail,
                name,
                phone,
                email,
                relationship
            })
        });

        const data = await response.json();

        alert(data.message);

        if (data.success) {

            // Clear inputs
            document.getElementById("contactName").value = "";
            document.getElementById("contactPhone").value = "";
            document.getElementById("relationship").value = "";

            // Reload contacts
            loadContacts();
        }

    } catch (err) {
        console.log(err);
        alert("Unable to connect to backend.");
    }
}

async function deleteContact(id) {

    if (!confirm("Are you sure you want to delete this contact?")) {
        return;
    }

    try {

        const response = await fetch(`https://safelink-1-vyfn.onrender.com/login/api/delete-contact/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        alert(data.message);

        if (data.success) {
            loadContacts();
        }

    } catch (err) {
        console.log(err);
        alert("Unable to connect to backend.");
    }

}

// Load all contacts
async function loadContacts() {

    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) return;

    try {

        const response = await fetch(`https://safelink-1-vyfn.onrender.com/login/api/contacts/${userEmail}`);
        const contacts = await response.json();

        const list = document.getElementById("contactList");
        list.innerHTML = "";

        contacts.forEach(contact => {

    list.innerHTML += `
        <div class="card">
            <h4>${contact.name}</h4>
            <p><strong>Relationship:</strong> ${contact.relationship}</p>
            <p>📞 ${contact.phone}</p>
             <p>📧 ${contact.email}</p>

            <button class="btn" onclick="deleteContact('${contact._id}')">
                🗑 Delete
            </button>
        </div>
    `;

});
    } catch (err) {
        console.log(err);
    }

}