var map;
var style_array =
// [{"featureType": "landscape", "stylers": [{"hue": "#6600ff"}, {"saturation": -11 } ] }, {"featureType": "poi", "stylers": [{"hue": "#6600ff"}, {"saturation": -78 }, {"lightness": -47 }, {"visibility": "off"} ] }, {"featureType": "road", "stylers": [{"hue": "#5e00ff"}, {"saturation": -79 } ] }, {"featureType": "road.local", "stylers": [{"lightness": 30 }, {"weight": 1.5 } ] }, {"featureType": "road.local", "elementType": "labels.icon", "stylers": [{"visibility": "off"} ] }, {"featureType": "transit", "stylers": [{"hue": "#5e00ff"}, {"saturation": -16 }, {"visibility": "simplified"} ] }, {"featureType": "transit.line", "stylers": [{"saturation": -72 } ] }, {"featureType": "water", "stylers": [{"hue": "#1900ff"}, {"saturation": -65 }, {"lightness": 8 } ] } ]
[{"featureType": "administrative", "elementType": "all", "stylers": [{"saturation": "-100"} ] }, {"featureType": "administrative.province", "elementType": "all", "stylers": [{"visibility": "off"} ] }, {"featureType": "landscape", "elementType": "all", "stylers": [{"saturation": -100 }, {"lightness": 65 }, {"visibility": "on"} ] }, {"featureType": "poi", "elementType": "all", "stylers": [{"saturation": -100 }, {"lightness": "50"}, {"visibility": "simplified"} ] }, {"featureType": "road", "elementType": "all", "stylers": [{"saturation": "-100"} ] }, {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"} ] }, {"featureType": "road.arterial", "elementType": "all", "stylers": [{"lightness": "30"} ] }, {"featureType": "road.local", "elementType": "all", "stylers": [{"lightness": "40"} ] }, {"featureType": "transit", "elementType": "all", "stylers": [{"saturation": -100 }, {"visibility": "simplified"} ] }, {"featureType": "water", "elementType": "geometry", "stylers": [{"hue": "#ffff00"}, {"lightness": -25 }, {"saturation": -97 } ] }, {"featureType": "water", "elementType": "labels", "stylers": [{"lightness": -25 }, {"saturation": -100 } ] } ]

function initialize() {
	var map_canvas = document.getElementById('map-canvas');
	var map_position = new google.maps.LatLng(55.753410, 37.612289);

	var map_options = {
		zoom: 17,
		center: map_position,
		styles: style_array,
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: false
	};

	map = new google.maps.Map(map_canvas, map_options);

	[].forEach.call(document.getElementsByClassName('location_item'), function(elem) {
		var elem_lat = elem.getAttribute('data-lat');
		var elem_long = elem.getAttribute('data-long');

		var marker_position = new google.maps.LatLng(+elem_lat, +elem_long);
		var marker_name = elem.getAttribute('data-name');

		var infowindow = new google.maps.InfoWindow({
				content: marker_name
		});

		var marker = new google.maps.Marker({
				position: marker_position,
				map: map,
				title: marker_name
		});

		google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map, marker);
		});

	});
}

google.maps.event.addDomListener(window, 'load', initialize);