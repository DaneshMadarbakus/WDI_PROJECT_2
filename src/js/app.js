// console.log('working ');
//
//
// const App = App || {};
// const google = google;
//
// App.mapSetup = function(){
//   const canvas = document.getElementById('map-container');
//
//   const mapOptions = {
//     zoom: 2,
//     center: new google.maps.LatLng(30, 0),
//     mapTypeId: google.maps.MapTypeId.ROADMAP
//   };
//
//   this.map = new google.maps.Map(canvas, mapOptions);
//   this.getPhotos();
// };
//
// App.getPhotos = function() {
//   console.log('this is', this);
//   $.get('http://localhost:3000/api/photos').done(this.loopThroughArray);
// };
//
// App.loopThroughArray = function(data) {
//   console.log('loopThroughArray func', data);
//   $.each(data, (index, photo) => {
//     console.log('insideloopthrough array', index, photo);
//     App.addMarkerForPhoto(photo);
//   });
// };
//
// App.addMarkerForPhoto = function(photo) {
//   console.log('addMarkerForPhoto func', photo);
//   const latlng = new google.maps.LatLng(photo.lat, photo.lng);
//   const marker = new google.maps.Marker({
//     position: latlng,
//     map: this.map
//   });
//
//   this.addInfoWindowForPhoto(photo, marker);
// };
//
// App.addInfoWindowForPhoto = function(photo, marker) {
//   google.maps.event.addListener(marker, 'click', () => {
//     if (typeof this.infoWindow !== 'undefined') this.infoWindow.close();
//
//     this.infoWindow = new google.maps.InfoWindow({
//       content: `
//       <div class = "info-window">
//         <img src=${ photo.imageBig}><p>${photo.locationName}</p>
//       </div>
//       `
//     });
//
//     this.infoWindow.open(this.map, marker);
//   });
// };
//
// $(App.mapSetup.bind(App));
