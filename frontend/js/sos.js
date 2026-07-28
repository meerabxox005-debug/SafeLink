let seconds = 5;
let timer;

function startSOS() {
    const countdown = document.getElementById("countdown");
    const status = document.getElementById("status");
    const button = document.getElementById("sosButton");

    button.disabled = true;

    seconds = 5;
    status.innerHTML = "Preparing emergency alert...";
    countdown.innerHTML = `Sending alert in ${seconds}...`;

    timer = setInterval(() => {
        seconds--;

        if (seconds >= 0) {
            countdown.innerHTML = `Sending alert in ${seconds}...`;
        }

        if (seconds < 0) {
            clearInterval(timer);
            countdown.innerHTML = "";
            sendSOS();
        }
    }, 1000);
}

function sendSOS() {
    const status = document.getElementById("status");
    const button = document.getElementById("sosButton");

    if (!navigator.geolocation) {
        alert("Geolocation is not supported.");
        button.disabled = false;
        return;
    }

    status.innerHTML = "📍 Getting your location...";

    navigator.geolocation.getCurrentPosition(
        async function (position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
            const userEmail = localStorage.getItem("userEmail");

            try {

                status.innerHTML = "🚨 Sending emergency alert...";

                const response = await fetch("https://safelink-1-vyfn.onrender.com/api/alerts/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userEmail,
                        latitude,
                        longitude,
                        locationLink: mapLink
                    })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.detail || "Failed to send SOS.");
                }

                status.innerHTML = `
    <h3 style="color:green;">✅ SOS Alert Sent Successfully!</h3>
    <p>Your trusted contacts have been notified.</p>
    <a href="${mapLink}" target="_blank">📍 View Your Location</a>
`;

                alert("✅ SOS Alert sent successfully! Your trusted contacts have been notified.");

                // Load trusted contacts
                const contactsResponse = await fetch(
                    `https://safelink-1-vyfn.onrender.com/api/contacts/${userEmail}`
                );

                const contactsData = await contactsResponse.json();

                if (contactsData.length > 0) {

                    let message = "🚨 SOS sent to:\n\n";

                    contactsData.forEach(contact => {
                        message += `${contact.name}\n`;
                        message += `${contact.relationship}\n`;
                        message += `${contact.phone}\n\n`;
                    });

                    alert(message);

                } else {

                    alert("No trusted contacts found.");

                }

            } catch (error) {

                console.error(error);

                status.innerHTML = "❌ Failed to send emergency alert.";

                alert(error.message || "Something went wrong.");

            } finally {

                button.disabled = false;

            }
        },

        function (error) {

            console.error(error);

            status.innerHTML = "❌ Unable to get your location.";

            alert("Unable to access your location.");

            button.disabled = false;

        }
    );
}