$(function() {
  //Personal access token, store in db/ENV var
  privateToken = 'pk.eyJ1Ijoic2NvdHRjYWxkd2VsbCIsImEiOiJjaWxsNGw1Mno1bXhldmFtY3JmYnF6OTIxIn0.Ar9lh4fImWj6UvHwEe15jQ';
  L.mapbox.accessToken = privateToken;

  //++++++++++++++++ geoSearchMap ++++++++++++//
  //Geo-search map, allows user to initialize site location

  //TODO
  var siteDetails = $('#project-details').data('site'),
      geoSearchMap,
      geocoderControl,
      marker,
      nameHasBeenInput = false,
      siteName = $('#site_site_name'),
      siteLat = $('#site_center_lat'),
      siteLng = $('#site_center_lng'),
      divId,
      initialLat,
      initialLng,
      zoom;

  var helpers = {
    generateMap: function(divId, lat, lng, zoom) {
      // latitude, longitude, zoom level WHERE SHOULD THIS DEFULT TO??
      geoSearchMap = L.mapbox.map(divId, 'mapbox.outdoors').setView([lat, lng], zoom);
      geoSearchMap.scrollWheelZoom.disable();
    },
    addSearchBar: function () {
      geocoderControl = L.mapbox.geocoderControl('mapbox.places', {
        autocomplete: true,
        keepOpen: true
      });
      geocoderControl.addTo(geoSearchMap);
    },
    setMarkerViaSearch: function () {
      var coordinates = res.feature.geometry.coordinates;
      helpers.addMarker(coordinates[1], coordinates[0]);
    },
    setMarkerOnClick: function (evt) {
      var lat = evt.latlng.lat;
      var lng = evt.latlng.lng;
      helpers.addMarker(lat, lng);
    },
    nameHasBeenInputByUser: function () {
      nameHasBeenInput = true;
    },
    siteLatOrLngHasBeenInputByUser: function () {
      helpers.addMarker(siteLat.val(), siteLng.val());
    },
    //Adds marker to map, calls getLocation()
    addMarker: function (lat, lng) {
      if (marker) {
        geoSearchMap.removeLayer(marker);
      }
      marker = L.marker(new L.LatLng(lat, lng));
      marker.addTo(geoSearchMap);
      helpers.getLocation(lat, lng);
    },
    //Reverse geocoding, grabs JSON info about location based on Lat/Lng
    //Fills in form fields when marker is moved(unless user has enetered custom site name)
    getLocation: function (lat, lng) {
      var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lng + "," + lat + ".json?access_token=" + privateToken;
      $.getJSON(url, function(result) {
        if (!nameHasBeenInput) {
          siteName.val(result.features[0].place_name); //Fill site name field
        }
        siteLat.val(lat);
        siteLng.val(lng);
      });
    },
    timeoutModal: function() {
      //hack solution, but without delay it won't work.
      //I also tried to .invalidateSize() on other events like show, but they didn't work.
      setTimeout(func, 10);
      function func() {
        geoSearchMap.invalidateSize();
      }
    }
  };

  //If geo-search-map is in HTML, run js
  if ($('#geo-search-map').length > 0) {
    
    divId = 'geo-search-map';
    initialLat = 50;
    initialLng = -123.1;
    zoom = 5;

    //Create map
    helpers.generateMap(divId, initialLat, initialLng, zoom);
    //Add search bar
    helpers.addSearchBar();
    
  }

  //If geo-search-map is in HTML, run js
  if ($('#drill-hole-geo-search-map').length > 0) {
    
    divId = 'drill-hole-geo-search-map';
    initialLat = siteDetails.center_lat;
    initialLng = siteDetails.center_lng;
    zoom = 8;

    //Create map
    helpers.generateMap(divId, initialLat, initialLng, zoom);
    //Add search bar
    helpers.addSearchBar();  
  }
  if ($('#drill-hole-geo-search-map').length > 0 || $('#geo-search-map').length > 0) {
    //When location is selected(via search or click), add marker and show button
    geocoderControl.on('select', helpers.setMarkerViaSearch);
    //When map is clicked, addMarker()
    geoSearchMap.on('click', helpers.setMarkerOnClick);
    //Fixes modal bug for map. Without this, Map tiles don't load entirely
    $("#add-site-button").on('click', helpers.timeoutModal);
    $("#add-new-drill-hole-button").on('click', helpers.timeoutModal);
    //When user edits Site name field, sets flag so getLocation doesn't refill form when marker is moved
    siteName.on("input", helpers.nameHasBeenInputByUser);
    //When user changes lat/lng, move marker to this new location
    siteLat.on("input", helpers.siteLatOrLngHasBeenInputByUser);
    siteLng.on("input", helpers.siteLatOrLngHasBeenInputByUser);
  }


  //++++++++++++++++ markersMap +++++++++++++++++//
  //Overall drill site with multiple markers, centered around them

  //TODO
  //Zoom level isn't quite right when markers are close together.
  //What does it do if there are no drill sites?

  //If markers-map is on page and there is at least one drill hole on site
  if ($('#markers-map').length > 0 ) {
    //var siteCoords=grab data attr to get coordinates. The put them in setView to center map.
    var markersMap = L.mapbox.map('markers-map', 'mapbox.outdoors').setView([50, -123.1], 5);
    var myLayer = L.mapbox.featureLayer().addTo(markersMap);

    var latlng = [];
    var markerGeoJSON = [];
    var markerUrl = [];
    var myIcon = L.icon({
    	iconUrl: '/assets/drill-hole-icon.png',
    	// iconRetinaUrl: 'drill-hole-icon@2x.png',
    	 iconSize: [80, 80]
    	// popupAnchor: [-3, -76]
    });

    //For each drill-hole, grab data from HTML
    $('.drill-row').each(function(i) {
      var drillHoleDetails = $(this).data('dh-details').drill_hole;
      var siteDetail = $('#project-details').data('site');
      var name = drillHoleDetails.name;
      var depth = drillHoleDetails.depth;
      var location = siteDetail.site_name;
      var lat = drillHoleDetails.dh_lat;
      var lng = drillHoleDetails.dh_lng;
      //Generate array of Lat and Lng for each drill hole, used to center map
      latlng[i] = L.latLng(lat, lng);
      //Generate array of URLs used to redirect from marker popup to drill pages
      markerUrl[i] = '/sites/'+ siteDetail.id + '/drill_holes/' + (i + 1);
      //Generate markers in GeoJSON format
      markerGeoJSON[i] = {
        type: 'Feature',
        properties: {
          name: name,
          depth: depth,
          location: location,
          url: markerUrl[i],
          icon: {
            "iconUrl": "/mapbox.js/assets/images/astronaut1.png",
            "iconSize": [50, 50], // size of the icon
          }
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


    if($('.drill-row').length > 0){
      //Add markers to map
      myLayer.setGeoJSON(geojson);

      //Add hole data to marker Popup
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
    }
    markersMap.scrollWheelZoom.disable();
  }

  //++++++++++++++++ staticMap +++++++++++++++++++//
  //Static map to show single site location

  //TODO:
  //add Mapbox/OpenMaps attribution somewhere on page

  //If static map div is in DOM and there is at least one card
  if ($('.static-map').length > 0 && $('.drill-card').length > 0) {

    $('.drill-card').each(function(j) {
      var latitude = $(this).find('.site-lat').data('site-lat');
      var longitude = $(this).find('.site-lng').data('site-lng');

      //Generate url to generate static map
      var staticImageString =
        'https://api.mapbox.com/v4/mapbox.outdoors/' + //map style
        'pin-l(' + longitude + ',' + latitude + ')/' + //Pin location
        longitude + "," + latitude + //Map location
        ",17/400x300@2x.png?access_token=" + //Zoom level, res
        privateToken; //api auth token

      //Add map to card
      $(this).find('.static-map').append("<img src = " + staticImageString + " width='400' alt='Map of Site'>");
    });
  }

  //If static map div is in DOM and drill-hole header is on page, aka on Drill Hole page
  if ($('.static-map').length > 0 && $('#drill-hole').length > 0) {
    console.log("on drill page, should insert static map");

      var latitude = $(this).find('#drill_hole_dh_lat').val();
      var longitude = $(this).find('#drill_hole_dh_lng').val();
      var pageWidth = $(window).width();
      //Generate url to generate static map
      var staticImageString =
        'https://api.mapbox.com/v4/mapbox.outdoors/' + //map style
        'pin-l(' + longitude + ',' + latitude + ')/' + //Pin location
        longitude + "," + latitude + //Map location
        ",12/1280x250@2x.png?access_token=" + //Zoom level, res
        privateToken; //api auth token

      //Add map to header
      $('.static-map').css("background", "url('" +staticImageString + "') center");
  }
});
