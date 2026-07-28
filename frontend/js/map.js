let map;
let marker;
window.onload = function () {

    console.log("Map initialized");

    map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
};

window.onload = function () {

    map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

        attribution: '&copy; OpenStreetMap contributors'

    }).addTo(map);

};

function getLocation() {

    if (!navigator.geolocation) {

        alert("Geolocation is not supported.");

        return;

    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            map.setView([lat, lng], 16);

            if (marker) {

                map.removeLayer(marker);

            }

            marker = L.marker([lat, lng]).addTo(map);

            marker.bindPopup("📍 You are here").openPopup();

            document.getElementById("locationText").innerHTML =

                `Latitude: ${lat}<br>Longitude: ${lng}`;

        },

        function(error) {

            alert("Unable to retrieve your location.");

        }

    );

}