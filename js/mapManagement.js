// URL TO ADDRESS API: http://maps.google.com/maps/api/geocode/json?address=[address here]&sens.

function initialize(){
	// Create variable for London coordinates
	var londonPos = new google.maps.LatLng(45.21657099999999,5.799075999999999)

	var mapProp = {
	  center:londonPos,
	  zoom:15,
	  mapTypeId:google.maps.MapTypeId.TERRAIN
	  };
	  
	var marker=new google.maps.Marker({
	  position:londonPos,
	  animation:google.maps.Animation.BOUNCE
	  });

	// Create map
	var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
	// Add marker to it
	marker.setMap(map);
}

google.maps.event.addDomListener(window, 'load', initialize);