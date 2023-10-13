let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(queryUrl).then(function (data) 
{
    makeMap(data.features);
});

function makeMap(earthquakeData)
{
    let myMap = L.map("map", 
    {
        center: [39.8283, -98.5795],
        zoom: 4.5,
    });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(myMap);
    let earthquakes = L.markerClusterGroup();
    for (let i = 0; i < earthquakeData.length; i++) 
    {
        let earthquake = earthquakeData[i];
        earthquakes.addLayer(L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], 
            {
                radius: earthquake.properties.mag * 11000
            })
          .bindPopup(`<h3>${earthquake.properties.place}</h3><hr><p>Magnitude: ${earthquake.properties.mag}<br>Depth: ${earthquake.geometry.coordinates[2]}</p>`));
    }  
    console.log(earthquakes);
    myMap.addLayer(earthquakes);
}


// let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// d3.json(queryUrl).then(function (data) 
// {
//     makeMap(data.features);
// });

// function makeMap(earthquakeData)
// {
//     let myMap = L.map("map", 
//     {
//         center: [39.8283, -98.5795],
//         zoom: 4.5,
//     });
//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(myMap);
//     for (let i = 0; i < earthquakeData.length; i++) 
//     {
//         let earthquake = earthquakeData[i];
//         L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], 
//             {
//                 color: 0,
//                 fillColor: setColor(earthquake.geometry.coordinates[2]),
//                 radius: earthquake.properties.mag * 11000
//             })
//           .bindPopup(`<h3>${earthquake.properties.place}</h3><hr><p>Magnitude: ${earthquake.properties.mag}<br>Depth: ${earthquake.geometry.coordinates[2]}</p>`)
//           .addTo(myMap);
//     }  
// }

// function setColor(magnitude)
// {
    
// }
  