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
    for (let i = 0; i < earthquakeData.length; i++) 
    {
        let earthquake = earthquakeData[i];
        L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], 
            {
                color: 'black',
                weight: 0.25,
                fillColor: setColor(earthquake.geometry.coordinates[2]),
                radius: earthquake.properties.mag * 12000
            })
          .bindPopup(`<h3>${earthquake.properties.place}</h3><hr><p>Magnitude: ${earthquake.properties.mag}<br>Depth: ${earthquake.geometry.coordinates[2]}</p>`)
          .addTo(myMap);
    }
    let legend = L.control({position: 'bottomright'});
    legend.onAdd = function (myMap) 
    {

      let div = L.DomUtil.create('div', 'legend');
      let labels = [];
      let ranges = ['-10-10','10-30','30-50','50-70','70-90', '90+'];
      let colors = ["#98EE00", "#D4EE00", "#EECC00", "#EE9C00", "#EA822C", "#EA2C2C"]
      for (let j = 0; j < ranges.length; j++) 
      {
        div.innerHTML += labels.push('<i style="background:' + colors[j] + '">&nbsp&nbsp&nbsp&nbsp</i> ' + (ranges[j] ? ranges[j] : '+'));

      }
      div.innerHTML = labels.join('<br>');
      return div;
    };
    legend.addTo(myMap);
}

function setColor(depth)
{
    switch (true) {
        case depth > 90:
          return "#EA2C2C";
        case depth > 70:
          return "#EA822C";
        case depth > 50:
          return "#EE9C00";
        case depth > 30:
          return "#EECC00";
        case depth > 10:
          return "#D4EE00";
        default:
          return "#98EE00";
      }
}
  