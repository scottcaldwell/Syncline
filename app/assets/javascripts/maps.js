$(function() {
  //Personal access token, store in db/ENV var
  privateToken = 'pk.eyJ1Ijoic2NvdHRjYWxkd2VsbCIsImEiOiJjaWxsNGw1Mno1bXhldmFtY3JmYnF6OTIxIn0.Ar9lh4fImWj6UvHwEe15jQ';
  L.mapbox.accessToken = privateToken;

  var markerCoords = [
    [50.02, -123.11],
    [50.01, -123.134],
    [50.05, -123.15],
    [50.06, -123.1002],
    [50.03, -123.156],
    [49.98, -123.124]
  ];
  //++++++++++++++++ geoSearchMap ++++++++++++//
  //Geo-search map, allows user to initialize site location

  //TODO
  //On first click, add marker to click location

  if($('#geo-search-map').length > 0) {
    console.log("geo-search-map found");
    //Create map
    var geoSearchMap = L.mapbox.map('geo-search-map', 'mapbox.outdoors')
      .setView([50, -123.1], 5); // latitude, longitude, zoom level WHERE SHOULD THIS DEFULT TO??

    var button = document.getElementById('submit-site');
    var marker;
    //addMarker(50, -123.1);

    //Add search bar
    var geocoderControl = L.mapbox.geocoderControl('mapbox.places', {
      autocomplete: true,
      keepOpen: true
    });
    geocoderControl.addTo(geoSearchMap);

    //When location is selected, add marker and show button
    geocoderControl.on('select', function(res) {
      var coord = res.feature.geometry.coordinates;
      addMarker(coord[1], coord[0]);
    });

    geoSearchMap.on('click', function(e){
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
      addMarker(lat, lng);
    });

    //When button is clicked, add Lat/Lng to db and close modal
    button.addEventListener("click", function() {
      var center_lat = marker._latlng.lat;
      var center_lng = marker._latlng.lng;
      alert('Site coordinates defined as: ' + center_lat + ',' + center_lng);
      //Needs to acutally write to db
      //Close modal/redirect
    });
  }

  function addMarker(lat, lng){
    if (marker){
      geoSearchMap.removeLayer(marker);
    }
    marker = L.marker(new L.LatLng(lat, lng), {
      draggable: true
    });
    marker.addTo(geoSearchMap);
    button.style.display = 'inline';
  }
  //++++++++++++++++ markersMap +++++++++++++++++//
  //Overall drill site with multiple markers, centered around them

  //TODO
  //when you click markers, pop up information/link to site page
  if($('#markers-map').length > 0) {
    console.log("markers-map found");

    var markersMap = L.mapbox.map('markers-map', 'mapbox.outdoors');
    var myLayer = L.mapbox.featureLayer().addTo(markersMap);

    //just using dummy array for now
    var latlng = [];
    var markerGeoJSON = [];

    for (var i = 0; i < markerCoords.length; i++) {
      var lat = markerCoords[i][0];
      var lng = markerCoords[i][1];
      latlng[i] = L.latLng(lat, lng);

      markerGeoJSON[i] = {
        type: 'Feature',
        properties: {
          title: 'Marker ' + i,
          url: 'http://en.wikipedia.org/wiki/' + i
        },
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      };
    } //end for loop

    var geojson = {
      type: 'FeatureCollection',
      features: markerGeoJSON
    };

    myLayer.setGeoJSON(geojson);
    // myLayer.on('click', function(e) {
    //   window.open(e.layer.feature.properties.url);
    // });

    myLayer.eachLayer(function(layer) {
      var content = '<h2>Coordinates: <\/h2>' +
          '<p>' + layer.feature.geometry.coordinates + '<\/p>' +
          '<button class="trigger">Go to drill hole</button>';
      //Add more stuff here bruh
      layer.bindPopup(content);
    });

    $('#markers-map').on('click', '.trigger', function() {
        alert('This will actually link you');
    });

    //Position map to show all markers THIS WORKS
    var bounds = L.latLngBounds(latlng).pad(0.2);
    markersMap.fitBounds(bounds);

    markersMap.scrollWheelZoom.disable();
  }

  //++++++++++++++++ staticMap +++++++++++++++++++//
  //Static map to show single site location

  //TODO:
  //add Mapbox/OpenMaps attribution somewhere on page
  //these will come from DB via JSON?

  if($('.static-map').length > 0) {
    console.log("static-map found");

    for(var j = 0; j < markerCoords.length; j++){
      var latitude = markerCoords[j][0];
      var longitude = markerCoords[j][1];
      var staticImageString =
        'https://api.mapbox.com/v4/mapbox.outdoors/' + //map style
        'pin-l(' + longitude + ',' + latitude + ')/' + //Pin location
        longitude + "," + latitude + //Map location
        ",14/800x400@2x.png?access_token=" + //Zoom level, res
        privateToken; //api auth token

      $(".static-map").append("<img src = " + staticImageString + " width='800' alt='Map of Site'>");
      //Could also do with pure javascript, using getElementById("static-map").src
    }
  }
});
