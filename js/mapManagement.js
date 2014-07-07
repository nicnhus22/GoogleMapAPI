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

  _getClosestCountry(marker, function(country){
      if(country.name){
        _getCountryPopulation(country.name, function(population){
          console.log("Population of "+country.name+" is "+population);
          console.log("Node size is then: "+Math.floor(population/100000));
          if(population > -1){
            country.population = Math.floor(population/100000);
            _addNode(country, marker, marker.position.lng(), marker.position.lat());
          }else{
            country.population = 1;
            _addNode(country, marker, marker.position.lng(), marker.position.lat());
          }
        });
      }else{
        _addNode({"name":"Unknown","popuplation":"1"}, marker, marker.position.lng(), marker.position.lat());
      }
  });
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
      _moveNodeWithoutUpdating(marker, event.latLng.lng(), event.latLng.lat());
  });

  google.maps.event.addListener(marker,'dragend',function(event) {
      _getClosestCountry(marker, function(country){
        if(country.name){
          // Will change
          country.population = 1;
          _moveNode(country, marker, event.latLng.lng(), event.latLng.lat());
        }else{
          _moveNode({"name":"Unknown","population":"1"}, marker, event.latLng.lng(), event.latLng.lat());
        }
      });
  });

  return marker;
}

/*
 *  Returns the country that hosts the marker
 *  Failure: Returns undefined.
 */
function _getClosestCountry(marker, callback){
  $.ajax({
      url: "https://maps.googleapis.com/maps/api/geocode/json?latlng="+marker.position.lat()+","+marker.position.lng()+"",  
      dataType: 'json',
      success: function(data, textStatus, request) {
        if(data.results[0]){
          var country = {};
          data.results[0].address_components.forEach(function(addrComp){
            if(addrComp.types[0] == 'country'){
                country.name = addrComp.long_name;
            }
          });
          callback(country);
        }
        
      }
  });
}

/*
 *  Returns the latest country population using the country code
 *  Failure: Returns -1.
 */
function _getCountryPopulation(country, callback){
  $.ajax({
      url: "http://www.quandl.com/api/v1/datasets/WORLDBANK/"+countryCode[country]+"_SP_POP_TOTL.json",  
      dataType: 'json',
      success: function(data, textStatus, request) {
        // Return latest population data
        callback(data.data[0][1] ? data.data[0][1] : -1);
      },
      error: function (xhr, ajaxOptions, thrownError) {
        callback(-1);
      }
  });
}

// Load map on the page
google.maps.event.addDomListener(window, 'load', initialize);
