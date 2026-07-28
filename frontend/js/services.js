function openNearby(place) {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {

            const lat = position.coords.latitude;
            const lng = position.coords.longitude;

            const url =
                `https://www.google.com/maps/search/${encodeURIComponent(place)}/?api=1&query=${lat},${lng}`;

            window.open(url, "_blank");

        },
        function(error) {
            alert("Unable to get your location.");
        }
    );
}