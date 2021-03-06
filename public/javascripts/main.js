
$(function() {


});


/**
 * This object holds the data upon which the business logic is performed.
 */
var App = {

  locations: [
  ],

  markerInfoTemplate: null,

  loadMarkerInfoTemplate: function() {
    this.markerInfoTemplate = Handlebars.compile($('#marker-content-info-template').html());
  },


   /**
   * Visualize the locations as Markers in the Map.
   * @see https://developers.google.com/maps/documentation/javascript/markers
   */
  paintMarkers: function(map) {
    for (var i=0; i<this.locations.length; i++) {
      
      var lat = this.locations[i].lat;
      var lng = this.locations[i].lng;
      var myLatlng  = new google.maps.LatLng(lat,lng);
      var myTitle   = this.locations[i].title;
      var marker    = new google.maps.Marker({
                        position: myLatlng,
                        title: myTitle,
                        locationId: this.locations[i].id
                      });

      // To add the marker to the map, call setMap();
      marker.setMap(map);
      
      google.maps.event.addListener(marker, 'click', function() {
        var that = this;
        $.get("/locations/" + this.locationId)
          .done(function(res) {
            var markerInfoTemplate = Handlebars.compile($('#marker-content-info-template').html());
            var contentString  = markerInfoTemplate(res);
            var infowindow = new google.maps.InfoWindow({
              content: contentString
            });
            infowindow.open(map,that);
          });
      });
    }
  }
}

/**
 * Load the Map using Google Maps API
 * @see https://developers.google.com/maps/documentation/javascript/tutorial
 */
function initialize() {
  // Center and Zoom the Map
  var mapOptions = {
    center: new google.maps.LatLng(39.476827,-0.3775905),
    zoom: 14
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
  $.get("locations")
    .done(function(res) {
      console.log(res);
      App.locations = res;
      App.loadMarkerInfoTemplate();
      App.paintMarkers(map);
    });
}
google.maps.event.addDomListener(window, 'load', initialize);

function voteFor(id, button) {
  $.post( "locations/" + id + "/vote", function() {
    //alert( "success" );
  })
  .done(function(res) {
    console.log(res);
    $(button).closest(".location-info").find(".vote-count").text(res.votes);
  })
  .fail(function(res) {
    alert(res.responseText);
  });
}

