// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with center and zoom level
let map = L.map('mapid').setView([30, 30], 2);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_key
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//Create a base that holds both maps
let baseMaps = {
    Street: streets,
    Dark: dark
};

// Then we add our 'graymap' tile layer to the map.
streets.addTo(map); 

//Accessing airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/Kanackle/mapping_earthquakes/main/majorAirports.json"

//Grabbing GeoJSON data
// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    console.log(data);
    console.log(data.properties)
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng){
        return L.marker(latlng)
        .bindPopup("<h2>Airport Code</h2>" + "<h3>" + feature.properties.faa + "</h3></br>" + "<h2>Airport Name</h2>" + "<h3>" + feature.properties.name + "</h3>")
    }
  }).addTo(map);
});