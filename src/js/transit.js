
const Transit = Transit || {};
const google = google;

Transit.init = function(){
  this.apiUrl = '/api';
  this.$main = $('main');
  $('.globalPhotos').on('click', this.globalPhotos.bind(this));
  $('.mainMap').on('click', this.mainMap.bind(this));
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  this.$main.on('submit', 'form', this.handleForm);
  $('.newPics').on('click', this.mainMap.bind(this));
  $('.morePics').on('click', this.morePics.bind(this));

  if (this.getToken()) {
    this.loggedInState();
  } else {
    this.loggedOutState();
  }
};

$(Transit.init.bind(Transit));

Transit.loggedInState = function() {
  $('.loggedIn').show();
  $('.loggedOut').hide();
  this.mainMap();
};

Transit.loggedOutState = function() {
  $('.loggedOut').show();
  $('.loggedIn').hide();
  this.globalPhotos();
};

Transit.globalPhotos = function(e) {
  if (e) e.preventDefault();
  this.$main.html(`
    <h1 id="homeHeader">photos from across the globe</h1>
    `);
};

Transit.register = function(e) {
  if (e) e.preventDefault();
  this.$main.html(`
    <h2></h2>
    <form method="post" action="/register">
      <div class="form-group">
        <input class="form-control" type="text" name="user[username]" placeholder="username">
      </div>
      <div class="form-group">
        <input class="form-control" type="email" name="user[email]" placeholder="e-mail">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="user[password]" placeholder="password">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="password confirmation">
      </div>
      <input class="btn btn-primary" type="submit" id="registerButton" value="Register">
    </form>
  `);
};

Transit.login = function(e){
  if (e) e.preventDefault();
  this.$main.html(`
    <h2></h2>
    <form method="post" action="/login">
      <div class="form-group">
        <input class="form-control" type="email" name="email" placeholder="e-mail">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="password" placeholder="password">
      </div>
      <input class="btn btn-primary" type="submit" id="loginButton" value="Login">
    </form>
  `);
};

Transit.mainMap = function(e){
  if (e) e.preventDefault();
  this.$main.html(`
    <div id="map-container">
    </div>
    `);
  const url = `${this.apiUrl}/photos`;

  const mapStyles = [
    {'featureType': 'all', 'elementType': 'labels', 'stylers': [{ 'visibility': 'off' }]},
    {'featureType': 'administrative', 'elementType': 'geometry.stroke', 'stylers': [{'visibility': 'off'}]},
    {'featureType': 'administrative','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'administrative.country','elementType': 'geometry.stroke','stylers': [{'visibility': 'off'}]},
    {'featureType': 'administrative.country','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'administrative.country','elementType': 'labels.icon','stylers': [{'visibility': 'off'}]},
    {'featureType': 'administrative.province','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'administrative.province','elementType': 'labels.text','stylers': [{'visibility': 'off'}]},
    {'featureType': 'administrative.locality','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'administrative.neighborhood','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'administrative.land_parcel','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'landscape','elementType': 'geometry.fill','stylers': [{'color': '#c8c8c8'}]},
    {'featureType': 'landscape','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'landscape.man_made','elementType': 'all','stylers': [{'visibility': 'off'}]},
    {'featureType': 'landscape.man_made','elementType': 'geometry','stylers': [{'visibility': 'off'}]},
    {'featureType': 'landscape.man_made','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'poi','elementType': 'all','stylers': [{'visibility': 'off'}]},
    {'featureType': 'poi.park', 'elementType': 'labels', 'stylers': [{'visibility': 'off'}]},
    {'featureType': 'poi.place_of_worship','elementType': 'labels','stylers': [{ 'visibility': 'off' }]},
    {'featureType': 'poi.place_of_worship','elementType': 'labels.icon','stylers': [ { 'visibility': 'off' }]},
    {'featureType': 'poi.school','elementType': 'labels','stylers': [ { 'visibility': 'off' }]},
    {'featureType': 'poi.school','elementType': 'labels.icon','stylers': [{'visibility': 'off'}]},
    {'featureType': 'poi.sports_complex','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'poi.sports_complex','elementType': 'labels.icon','stylers': [{'visibility': 'off'}]},
    {'featureType': 'road','elementType': 'all','stylers': [{'saturation': -100},{'lightness': 45},
    {'visibility': 'off'}]},
    {'featureType': 'road','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'road','elementType': 'labels.text','stylers': [{'visibility': 'off'}]},
    {'featureType': 'road','elementType': 'labels.icon','stylers': [{'visibility': 'off'}]},
    {'featureType': 'road.highway','elementType': 'all','stylers': [{'visibility': 'off'}]},
    {'featureType': 'road.highway','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'road.highway','elementType': 'labels.icon','stylers': [{'visibility': 'off'}]},
    {'featureType': 'road.highway.controlled_access','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'road.arterial','elementType': 'all','stylers': [{'visibility': 'off' } ]},
    { 'featureType': 'road.arterial', 'elementType': 'labels','stylers': [{'visibility': 'off'}]},
    { 'featureType': 'road.arterial','elementType': 'labels.icon','stylers': [{'visibility': 'off'}]},
    {'featureType': 'road.local','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'road.local','elementType': 'labels.icon','stylers': [{'visibility': 'off'}]},
    {'featureType': 'transit.line','elementType': 'all','stylers': [{'visibility': 'off'}]},
    {'featureType': 'transit.line','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'transit.station','elementType': 'all','stylers': [{'visibility': 'off'}]},
    {'featureType': 'transit.station','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'transit.station.airport','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'transit.station.bus','elementType': 'labels','stylers': [{'visibility': 'off'}]},
    {'featureType': 'transit.station.rail','elementType': 'labels', 'stylers': [{'visibility': 'off'}]},
    {'featureType': 'water', 'elementType': 'all', 'stylers': [ { 'color': '#ffffff' }, {'visibility': 'on' }]},
    {'featureType': 'water', 'elementType': 'geometry.fill', 'stylers': [ { 'color': '#ffffff'}]},
    {'featureType': 'water', 'elementType': 'labels',  'stylers': [{ 'visibility': 'off'}]}];
  const canvas = document.getElementById('map-container');
  const mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(30, 0),
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: mapStyles
  };
  this.map = new google.maps.Map(canvas, mapOptions);

  return this.ajaxRequest(url, 'get', null, data => {
    $.each(data, (index, photo) => {
      setTimeout(() => {
        const latlng = new google.maps.LatLng(photo.lat, photo.lng);
        const marker = new google.maps.Marker({
          position: latlng,
          map: this.map,
          animation: google.maps.Animation.BOUNCE,
          icon: { url: '../images/gbm.png', scaledSize: new google.maps.Size(22,38)}
        });
        google.maps.event.addListener(marker, 'click', () => {
          this.$main.append(`<div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="locationModalLabel"></h5>
              </div>
              <div class="modal-body">
                  <div class = "info-window">
                    <img id="photoImage" src=>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"> Close </button>
              </div>
            </div>
          </div>
        </div>`);
          $('#locationModalLabel').html(`${photo.locationName}`);
          $('#photoImage').attr('src', `${photo.imageOriginal}`);
          $('#infoModal').modal('show');
        });
        setTimeout(() => {
          marker.setAnimation(null);
        }, 750);
      }, index * 200);
    });
  });
};

Transit.morePics = function() {
  const url = `${this.apiUrl}/photos`;

  return this.ajaxRequest(url, 'get', null, data => {
    $.each(data, (index, photo) => {
      setTimeout(() => {
        const latlng = new google.maps.LatLng(photo.lat, photo.lng);
        const marker = new google.maps.Marker({
          position: latlng,
          map: this.map,
          animation: google.maps.Animation.BOUNCE,
          icon: { url: '../images/gbm.png', scaledSize: new google.maps.Size(22,38)}
        });
        google.maps.event.addListener(marker, 'click', () => {
          this.$main.append(`<div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="locationModalLabel"></h5>
              </div>
              <div class="modal-body">
                  <div class = "info-window">
                    <img id="photoImage" src=>
                  </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal"> Close </button>
              </div>
            </div>
          </div>
        </div>`);
          $('#locationModalLabel').html(`${photo.locationName}`);
          $('#photoImage').attr('src', `${photo.imageOriginal}`);
          $('#infoModal').modal('show');
        });
        setTimeout(() => {
          marker.setAnimation(null);
        }, 750);
      }, index * 200);
    });
  });
};

Transit.logout = function(e){
  e.preventDefault();
  Transit.removeToken();
  Transit.loggedOutState();
};

Transit.handleForm = function(e){
  if (e) e.preventDefault();
  const url    = `${Transit.apiUrl}${$(this).attr('action')}`;
  const method = $(this).attr('method');
  const data   = $(this).serialize();

  return Transit.ajaxRequest(url, method, data, data => {
    if (data.token) Transit.setToken(data.token);
    Transit.loggedInState();
  });
};

Transit.ajaxRequest = function(url, method, data, callback) {
  return $.ajax({
    url,
    method,
    data,
    beforeSend: this.setRequestHeader.bind(this)
  }).done(callback)
  .fail(data => {
    console.log(data);
  });
};

Transit.setRequestHeader = function(xhr){
  return xhr.setRequestHeader('Authorization', `Bearer ${this.getToken()}`);
};

Transit.setToken = function(token){
  return window.localStorage.setItem('token', token);
};

Transit.getToken = function(){
  return window.localStorage.getItem('token');
};

Transit.removeToken = function(){
  return window.localStorage.clear();
};
