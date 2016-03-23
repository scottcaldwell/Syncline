$(function() {
  //Personal access token, store in db/ENV var
  privateToken = 'pk.eyJ1Ijoic2NvdHRjYWxkd2VsbCIsImEiOiJjaWxsNGw1Mno1bXhldmFtY3JmYnF6OTIxIn0.Ar9lh4fImWj6UvHwEe15jQ';
  L.mapbox.accessToken = privateToken;

  //++++++++++++++++ geoSearchMap ++++++++++++//
  //Geo-search map, allows user to initialize site location

  //TODO
  //Increase modal size so map can be bigger

  if ($('#geo-search-map').length > 0) {
    //Create map
    var geoSearchMap = L.mapbox.map('geo-search-map', 'mapbox.outdoors')
      .setView([50, -123.1], 5); // latitude, longitude, zoom level WHERE SHOULD THIS DEFULT TO??

    var button = $('input[type=submit]');
    var siteName = $('#site_site_name');
    var siteLat = $('#site_center_lat');
    var siteLng = $('#site_center_lng');
    var latlngHasBeenInput = false;
    var nameHasBeenInput = false;
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
    button.on("click", function() {
      alert("Site added");
      location.reload();
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

    siteName.on("input", function() {
      nameHasBeenInput = true;
    });
  }

  //Adds marker to map, shows 'Create' button, fill 'Site Name' field
  function addMarker(lat, lng) {
    if (marker) {
      geoSearchMap.removeLayer(marker);
    }
    marker = L.marker(new L.LatLng(lat, lng));
    marker.addTo(geoSearchMap);
    getLocation(lat, lng);
  }

  function getLocation(lat, lng) {
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lng + "," + lat + ".json?access_token=" + privateToken;
    $.getJSON(url, function(json) {
      if (!nameHasBeenInput) {
        siteName.val(json.features[0].place_name); //Fill site name field
      }
      siteLat.val(lat);
      siteLng.val(lng);
    });
  }


  //++++++++++++++++ markersMap +++++++++++++++++//
  //Overall drill site with multiple markers, centered around them

  //TODO
  //Zoom level isn't quite right when markers are close together.

  if ($('#markers-map').length > 0) {
    var markersMap = L.mapbox.map('markers-map', 'mapbox.outdoors');
    var myLayer = L.mapbox.featureLayer().addTo(markersMap);

    var latlng = [];
    var markerGeoJSON = [];
    var markerUrl = [];

    $('.drill-row').each(function(i) {
      var drillHoleDetails = $(this).data('dh-details');
      var name = drillHoleDetails.name;
      var depth = drillHoleDetails.depth;
      var location = drillHoleDetails.site_name;
      var lat = drillHoleDetails.dh_lat;
      var lng = drillHoleDetails.dh_lng;
      latlng[i] = L.latLng(lat, lng);
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
      var latitude = $(this).find('.site-lat').data('site-lat');
      var longitude = $(this).find('.site-lng').data('site-lng');

      var staticImageString =
        'https://api.mapbox.com/v4/mapbox.outdoors/' + //map style
        'pin-l(' + longitude + ',' + latitude + ')/' + //Pin location
        longitude + "," + latitude + //Map location
        ",17/400x300@2x.png?access_token=" + //Zoom level, res
        privateToken; //api auth token

      $(this).find('.static-map').append("<img src = " + staticImageString + " width='400' alt='Map of Site'>");
    });
  }
});
