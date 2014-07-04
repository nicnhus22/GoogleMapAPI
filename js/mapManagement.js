// URL TO ADDRESS API: http://maps.google.com/maps/api/geocode/json?address=[address here]&sens.

var map;
var markers = [];

/*
 *  Intialize map with proper options
 */
function initialize() {

  var mapOptions = {
    zoom: 3,
    center: new google.maps.LatLng(0, 0)
  };

  map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);

  // Add listeners
  google.maps.event.addListener(map, 'click', addPoint);
}

/*
 *  @Event Add a marker to the map
 */
function addPoint(event) { 

    var marker = new google.maps.Marker({
        position: event.latLng,
        map: map,
        draggable: true
    });
    markers.push(marker);

    addNode(marker.position.lng(), marker.position.lat());

    google.maps.event.addListener(marker, 'click', function() {
        marker.setMap(null);
        for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
        markers.splice(i, 1);
    });
    google.maps.event.addListener(marker, 'dragend', function() {
        // By default works
    });
}

// Load map on the page
google.maps.event.addDomListener(window, 'load', initialize);
