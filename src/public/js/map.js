let map;

function initMap() {
  console.log("initMap: ", google.maps);
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 18,
  });
  console.log("Map initialized: ", map);
}

window.mapInitiator = initMap;
