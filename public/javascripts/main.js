/**
 * This object holds the data upon which the business logic is performed.
 */
var App = {

  locations: [
    {id: 12, votes: 0, lat: 39.4926944, lng: -0.4007434, title: 'Oficina en Congresos', link: 'http://www.fotocasa.es/oficina/valencia-capital/valencia-ciudad-aire-acondicionado-calefaccion-parking-ascensor-barrio-de-benicalap-134609181?opi=140&tti=3&ppi=3&pagination=1&RowGrid=12&tta=8', img: 'http://images.inmofactory.com/inmofactory/documents/1/83926/7009271/41816599.jpg/w_0/c_690x518/p_1/'}
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
      var myLink   = this.locations[i].link;
      var marker    = new google.maps.Marker({
                        position: myLatlng,
                        title: myTitle
                      });

      // To add the marker to the map, call setMap();
      marker.setMap(map);
      marker.contentString  = this.markerInfoTemplate(this.locations[i]);
      
      google.maps.event.addListener(marker, 'click', function() {
        var infowindow = new google.maps.InfoWindow({
          content: this.contentString
        });
        infowindow.open(map,this);
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
  App.loadMarkerInfoTemplate();
  App.paintMarkers(map);
}
google.maps.event.addDomListener(window, 'load', initialize);

function voteFor(id) {
  $.post( "locations/" + id + "/vote", function() {
    //alert( "success" );
  })
  .done(function() {
    alert( "second success" );
  })
  .fail(function() {
    alert( "error" );
  });
}
