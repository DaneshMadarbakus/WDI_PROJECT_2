console.log('where ya need to go homie?');

const Transit = Transit || {};
const google = google;

Transit.init = function(){
  this.apiUrl = 'http://localhost:3000/api';
  this.$main = $('main');
  // $('.globalPhotos').on('click', this.globalPhotos.bind(this));
  $('.mainMap').on('click', this.mainMap.bind(this));
  $('.register').on('click', this.register.bind(this));
  $('.login').on('click', this.login.bind(this));
  $('.logout').on('click', this.logout.bind(this));
  this.$main.on('submit', 'form', this.handleForm);
  this.$main.on('click', '.newPics', this.mainMap.bind(this));
  this.$main.on('click', '.morePics', this.morePics.bind(this));

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
  this.register();
};

Transit.register = function(e) {
  if (e) e.preventDefault();
  this.$main.html(`
    <h2>Register</h2>
    <form method="post" action="/register">
      <div class="form-group">
        <input class="form-control" type="text" name="user[username]" placeholder="Username">
      </div>
      <div class="form-group">
        <input class="form-control" type="email" name="user[email]" placeholder="Email">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="user[password]" placeholder="Password">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="Password Confirmation">
      </div>
      <input class="btn btn-primary" type="submit" value="Register">
    </form>
  `);
};

Transit.login = function(e){
  if (e) e.preventDefault();
  this.$main.html(`
    <h2>Login</h2>
    <form method="post" action="/login">
      <div class="form-group">
        <input class="form-control" type="email" name="email" placeholder="Email">
      </div>
      <div class="form-group">
        <input class="form-control" type="password" name="password" placeholder="Password">
      </div>
      <input class="btn btn-primary" type="submit" value="Login">
    </form>
  `);
};

Transit.mainMap = function(e){
  if (e) e.preventDefault();
  this.$main.html(`
    <div id="map-container">
    </div>
    <button class='newPics'>New Pics</button>
    <button class='morePics'>More Pics</button>
    `);
  const url = `${this.apiUrl}/photos`;

  const canvas = document.getElementById('map-container');
  const mapOptions = {
    zoom: 2,
    center: new google.maps.LatLng(30, 0),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map = new google.maps.Map(canvas, mapOptions);

  return this.ajaxRequest(url, 'get', null, data => {
    $.each(data, (index, photo) => {
      const latlng = new google.maps.LatLng(photo.lat, photo.lng);
      const marker = new google.maps.Marker({ position: latlng, map: this.map});
      google.maps.event.addListener(marker, 'click', () => {
        this.$main.append(`<div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="locationModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
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
    });
  });
};

Transit.morePics = function() {
  const url = `${this.apiUrl}/photos`;

  return this.ajaxRequest(url, 'get', null, data => {
    $.each(data, (index, photo) => {
      const latlng = new google.maps.LatLng(photo.lat, photo.lng);
      const marker = new google.maps.Marker({ position: latlng, map: this.map});
      google.maps.event.addListener(marker, 'click', () => {
        this.$main.append(`<div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="locationModalLabel"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
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
