let seconds = 5;
let timer;

function startSOS() {

    const countdown = document.getElementById("countdown");
    const status = document.getElementById("status");

    status.innerHTML = "Preparing emergency alert...";

    timer = setInterval(() => {

        countdown.innerHTML = `Sending alert in ${seconds}...`;
        seconds--;

        if (seconds < 0) {
            clearInterval(timer);
            seconds = 5;
            sendSOS();
        }

    }, 1000);
}

function sendSOS() {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(

        function (position) {

            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
            const userEmail = localStorage.getItem("userEmail");

            fetch("https://safelink-hbf7.onrender.com/api/sos", {
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
            })
            .then(response => response.json())
            .then(data => {

                // Alert saved successfully
                alert(data.message);
                console.log(data);

                // Load trusted contacts
                return fetch(`https://safelink-hbf7.onrender.com/api/sos-contacts/${userEmail}`);

            })
           .then(response => {
    console.log("Status:", response.status);
    return response.json();
})
            .then(data => {
                 console.log("SOS Contacts Response:", data);

                if (data.success) {

                    if (data.contacts.length === 0) {
                        alert("No trusted contacts found.");
                    } else {

                        let message = "🚨 SOS would be sent to:\n\n";

                        data.contacts.forEach(contact => {
                            message += `${contact.name} (${contact.relationship})\n📞 ${contact.phone}\n\n`;
                        });

                        alert(message);
                    }

                } else {
                    alert("Unable to load trusted contacts.");
                }

            })
            .catch(err => {
    console.error("SOS Error:", err);
    alert("Something went wrong.");
});

            document.getElementById("status").innerHTML =
                `🚨 SOS Sent!<br><br>Your Location:<br><a href="${mapLink}" target="_blank">${mapLink}</a>`;

            console.log("Latitude:", latitude);
            console.log("Longitude:", longitude);

        },

        function (error) {
            alert("Unable to get your location.");
        }

    );
}