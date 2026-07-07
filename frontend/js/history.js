window.onload = loadAlerts;

async function loadAlerts() {

    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
        alert("Please login first.");
        return;
    }

    try {

        const response = await fetch(`http://localhost:3000/api/alerts/${userEmail}`);
        const alerts = await response.json();

        const alertList = document.getElementById("alertList");
        alertList.innerHTML = "";

        if (alerts.length === 0) {
            alertList.innerHTML = "<p>No SOS alerts found.</p>";
            return;
        }

        alerts.forEach(alert => {

            const date = new Date(alert.createdAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
});

            alertList.innerHTML += `
                <div class="card">
                    <h3>🚨 SOS Alert</h3>
                    <p><strong>Date:</strong> ${date}</p>
                    <p>
                        <a href="${alert.locationLink}" target="_blank">
                            📍 View Location
                        </a>
                    </p>
                </div>
            `;

        });

    } catch (err) {
        console.log(err);
        alert("Unable to load alert history.");
    }
}