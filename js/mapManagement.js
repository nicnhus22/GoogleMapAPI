function initialize(){
	// Create variable for London coordinates
	var londonPos = new google.maps.LatLng(51.508742,-0.120850)

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