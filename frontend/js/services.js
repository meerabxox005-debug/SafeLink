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
                `https://www.google.com/maps/search/${encodeURIComponent(place)}/@${lat},${lng},15z`;

            window.open(url, "_blank");

        },

        function() {
            alert("Unable to get your location.");
        }

    );
}