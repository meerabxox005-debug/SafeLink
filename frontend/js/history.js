window.onload = loadAlerts;

async function loadAlerts() {

    const userEmail = localStorage.getItem("userEmail");

    if (!userEmail) {
        alert("Please login first.");
        return;
    }

    try {

        const response = await fetch(
            `https://safelink-1-vyfn.onrender.com/api/alerts/${userEmail}`
        );

        const alerts = await response.json();

        const alertList = document.getElementById("alertList");
        alertList.innerHTML = "";

        if (!alerts.length) {
            alertList.innerHTML = "<p>No SOS alerts found.</p>";
            return;
        }

        // Show newest alerts first
        alerts.reverse();

        alerts.forEach(alert => {

            const date = new Date(alert.time).toLocaleString();

            const mapLink = `https://www.google.com/maps?q=${alert.latitude},${alert.longitude}`;

            alertList.innerHTML += `
                <div class="card">
                    <h3>🚨 SOS Alert</h3>

                    <p><strong>Date:</strong> ${date}</p>

                    <p><strong>Status:</strong>
                        <span style="color:green;">Sent</span>
                    </p>

                    <p>
                        <a href="${mapLink}" target="_blank">
                            📍 View Location
                        </a>
                    </p>
                </div>
            `;
        });

    } catch (err) {

        console.error(err);
        alert("Unable to load alert history.");

    }
}


 