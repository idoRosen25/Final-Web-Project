let map;

function initMap() {
  const myLngLat = { lat: 40.72501, lng: -73.9983 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: myLngLat,
    zoom: 16,
  });

  const marker = new google.maps.Marker({
    position: myLngLat,
    label: "FreshCart",
  });

  marker.setMap(map);
}

window.mapInitiator = initMap;
