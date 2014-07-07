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

  map = new google.maps.Map(document.getElementById('map_container'), mapOptions);

  // Add listeners
  google.maps.event.addListener(map, 'click', addPoint);
}

/*
 *  @Event Add a marker to the map
 */
function addPoint(event) { 

  var marker = _createMarker(map,{
    "location":event.latLng,
    "draggable":true
  });

 _getClosestCountry(marker);

}

/*
 *  Helper function that takes a map and options to
 *  create a marker
 *  Also add the event listeners for the created marker
 */
function _createMarker(map, options){
  
  var marker = new google.maps.Marker({
        position: options.location,
        map: map,
        draggable: options.draggable
    });
  markers.push(marker);

  // Add click event to delete the marker onClick
  google.maps.event.addListener(marker, 'click', function() {
      marker.setMap(null);
      for (var i = 0, I = markers.length; i < I && markers[i] != marker; ++i);
      markers.splice(i, 1);
      _removeNode(marker);
  });

  google.maps.event.addListener(marker,'drag',function(event) {
      _moveNode(marker, event.latLng.lng(), event.latLng.lat());
  });

  google.maps.event.addListener(marker,'dragend',function(event) {
      var updatedCountry;

      updatedCountry = _getClosestCountry(marker);

      _moveNode(updatedCountry, marker, event.latLng.lng(), event.latLng.lat());
  });

  return marker;
}

function _getClosestCountry(marker){
  $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+marker.position.lat()+","+marker.position.lng()+"",  
      dataType: 'json',
      success: function(data, textStatus, request) {
        var country = _fetchCountry(data);

        if(country){
          _addNode(country, marker, marker.position.lng(), marker.position.lat());
        }
        
      }
  });
}


function _fetchCountry(data){
  var country;
  data.results[0].address_components.forEach(function(addrComp){
    if(addrComp.types[0] == 'country'){
        country = addrComp.long_name;
    }
  });
  return country;
}

// Load map on the page
google.maps.event.addDomListener(window, 'load', initialize);
