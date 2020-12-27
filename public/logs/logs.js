//Creando mapa y las tiles (imagenes)
const mymap = L.map('map').setView([0, 0], 2);
const attribution = 
    '&copy; <a href="https://www.openstreetmap.org/copyright"> OpenStreetMap </a> contributers';
const tileUrl= 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl,{attribution});
tiles.addTo(mymap);


async function getData() {
    const response = await fetch('/api');
    const data = await response.json();

    for (item of data) {
        var timeStamp = new Date(item.time).toLocaleString();
        const text = `${item.country} C: ${item.temp_c} F: ${item.temp_f} Date: ${timeStamp}`;
        const marker = L.marker([item.lat,item.long]).addTo(mymap);
        marker.bindPopup(text);
    }

}

getData();
