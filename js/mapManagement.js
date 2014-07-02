// URL TO ADDRESS API: http://maps.google.com/maps/api/geocode/json?address=[address here]&sens.

var randomLoc = [new google.maps.LatLng(35.21657099999999,54.799075999999999)];

for (var key in cities) {
  if (cities.hasOwnProperty(key)) {
    randomLoc.push(new google.maps.LatLng(cities[key].lat,cities[key].lon));
  }
}

var markers = [];

function initialize(){
	// Create variable for Grenoble coordinates
	var grenoblePos = new google.maps.LatLng(45.21657099999999,5.799075999999999)

	var mapProp = {
	  center:grenoblePos,
	  zoom:5,
	  mapTypeId:google.maps.MapTypeId.TERRAIN
	  };
	
	randomLoc.forEach(function(loc){
		markers.push(new google.maps.Marker({
		  position:loc,
		  animation:google.maps.Animation.BOUNCE
	  }));
	});
	// Create map
	var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
	
	// Add markers to it
	markers.forEach(function(marker){
		marker.setMap(map);
		name:"City"
	});

}

google.maps.event.addDomListener(window, 'load', initialize);