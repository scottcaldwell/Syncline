$(function() {
  //Personal access token, store in db/ENV var
  privateToken = 'pk.eyJ1Ijoic2NvdHRjYWxkd2VsbCIsImEiOiJjaWxsNGw1Mno1bXhldmFtY3JmYnF6OTIxIn0.Ar9lh4fImWj6UvHwEe15jQ';
  L.mapbox.accessToken = privateToken;

  //++++++++++++++++ geoSearchMap ++++++++++++//
  //Geo-search map, allows user to initialize site location

  //TODO
  //Increase modal size so map can be bigger

  if ($('#geo-search-map').length > 0) {
    console.log("geo-search-map found");
    //Create map
    var geoSearchMap = L.mapbox.map('geo-search-map', 'mapbox.outdoors')
      .setView([50, -123.1], 5); // latitude, longitude, zoom level WHERE SHOULD THIS DEFULT TO??

    var button = document.getElementById('submit-site');
    var siteName = $('#new-site-name');
    var marker;
    //addMarker(50, -123.1);

    //Add search bar
    var geocoderControl = L.mapbox.geocoderControl('mapbox.places', {
      autocomplete: true,
      keepOpen: true
    });
    geocoderControl.addTo(geoSearchMap);

    //When location is selected(via search or click), add marker and show button
    geocoderControl.on('select', function(res) {
      var coord = res.feature.geometry.coordinates;
      addMarker(coord[1], coord[0]);
    });
    geoSearchMap.on('click', function(e) {
      var lat = e.latlng.lat;
      var lng = e.latlng.lng;
      addMarker(lat, lng);
    });

    //When button is clicked, add Lat/Lng to db and close modal
    button.addEventListener("click", function() {
      var center_lat = marker._latlng.lat;
      var center_lng = marker._latlng.lng;

      //FIXME: Needs to acutally write to db
      alert('Site coordinates defined as: ' + center_lat + ',' + center_lng +
        "\n Site Name: " + siteName.val());
    });

    //Fixes modal bug for map
    $("#add-site-button").on('click', function() {
      //hack solution, but without delay it won't work.
      //I also tried to .invalidateSize() on other events like show, but they didn't work.
      setTimeout(func, 10);

      function func() {
        geoSearchMap.invalidateSize();
      }

    });
  }

  //Adds marker to map, shows 'Create' button, fill 'Site Name' field
  function addMarker(lat, lng) {
    if (marker) {
      geoSearchMap.removeLayer(marker);
    }
    marker = L.marker(new L.LatLng(lat, lng), {
      draggable: true
    });
    marker.addTo(geoSearchMap);
    button.style.display = 'inline'; //Show create button

    if (siteName.val().length === 0 || siteName.val().toString().substring(0, 5) == 'Site:') {
      siteName.val("Site: " + lat + " , " + lng); //Fill site name field
    }
  }

  //++++++++++++++++ markersMap +++++++++++++++++//
  //Overall drill site with multiple markers, centered around them

  //TODO
  //Zoom level isn't quite right when markers are close together.

  if ($('#markers-map').length > 0) {
    console.log("markers-map found");

    var markersMap = L.mapbox.map('markers-map', 'mapbox.outdoors');
    var myLayer = L.mapbox.featureLayer().addTo(markersMap);

    //just using dummy array for now
    var latlng = [];
    var markerGeoJSON = [];
    var markerUrl = [];

    $('.drill-row').each(function(i) {
      var name = $(this).children().eq(0).html();
      var depth = $(this).children().eq(1).html();
      var location = $(this).children().eq(2).html();
      var lat = $(this).children().eq(3).html();
      var lng = $(this).children().eq(4).html();
      latlng = [];
      latlng.push(L.latLng(lat, lng));
      markerUrl[i] = '/drill_holes/' + i;

      markerGeoJSON[i] = {
        type: 'Feature',
        properties: {
          name: name,
          depth: depth,
          location: location,
          url: markerUrl[i]
        },
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        }
      };
    }); //end for loop

    var geojson = {
      type: 'FeatureCollection',
      features: markerGeoJSON
    };

    myLayer.setGeoJSON(geojson);

    myLayer.eachLayer(function(layer) {
      var content =
        '<div>Name: ' + layer.feature.properties.name + '<div/>' +
        '<div>Depth: ' + layer.feature.properties.depth + '</div>' +
        '<div>Location: ' + layer.feature.properties.location + '</div>' +
        '<div>Coordinates: ' + layer.feature.geometry.coordinates[1] + ',' + layer.feature.geometry.coordinates[0] + '</div>' +
        '<a href="' + layer.feature.properties.url + '">Go to Drill Site</a></br>';
      layer.bindPopup(content);
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

  //If static map div is in DOM
  if ($('.static-map').length > 0) {

    $('.drill-card').each(function(j) {
      var latitude = $(this).find('.drill-hole-lat').html().trim();
      var longitude = $(this).find('.drill-hole-lng').html().trim();
      console.log(latitude);
      var staticImageString =
        'https://api.mapbox.com/v4/mapbox.outdoors/' + //map style
        'pin-l(' + longitude + ',' + latitude + ')/' + //Pin location
        longitude + "," + latitude + //Map location
        ",17/400x300@2x.png?access_token=" + //Zoom level, res
        privateToken; //api auth token
        console.log(staticImageString);

      $(this).find('.static-map').append("<img src = " + staticImageString + " width='400' alt='Map of Site'>");
    });
  }
});
