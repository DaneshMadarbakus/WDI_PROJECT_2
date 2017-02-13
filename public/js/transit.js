"use strict";var Transit=Transit||{},google=google;Transit.init=function(){this.apiUrl="http://localhost:3000/api",this.$main=$("main"),$(".globalPhotos").on("click",this.globalPhotos.bind(this)),$(".mainMap").on("click",this.mainMap.bind(this)),$(".register").on("click",this.register.bind(this)),$(".login").on("click",this.login.bind(this)),$(".logout").on("click",this.logout.bind(this)),this.$main.on("submit","form",this.handleForm),$(".newPics").on("click",this.mainMap.bind(this)),$(".morePics").on("click",this.morePics.bind(this)),this.getToken()?this.loggedInState():this.loggedOutState()},$(Transit.init.bind(Transit)),Transit.loggedInState=function(){$(".loggedIn").show(),$(".loggedOut").hide(),this.mainMap()},Transit.loggedOutState=function(){$(".loggedOut").show(),$(".loggedIn").hide(),this.globalPhotos()},Transit.globalPhotos=function(e){e&&e.preventDefault(),this.$main.html('\n    <h1 id="homeHeader">photos from across the globe</h1>\n    ')},Transit.register=function(e){e&&e.preventDefault(),this.$main.html('\n    <h2></h2>\n    <form method="post" action="/register">\n      <div class="form-group">\n        <input class="form-control" type="text" name="user[username]" placeholder="username">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="email" name="user[email]" placeholder="e-mail">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="user[password]" placeholder="password">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="user[passwordConfirmation]" placeholder="password confirmation">\n      </div>\n      <input class="btn btn-primary" type="submit" id="registerButton" value="Register">\n    </form>\n  ')},Transit.login=function(e){e&&e.preventDefault(),this.$main.html('\n    <h2></h2>\n    <form method="post" action="/login">\n      <div class="form-group">\n        <input class="form-control" type="email" name="email" placeholder="e-mail">\n      </div>\n      <div class="form-group">\n        <input class="form-control" type="password" name="password" placeholder="password">\n      </div>\n      <input class="btn btn-primary" type="submit" id="loginButton" value="Login">\n    </form>\n  ')},Transit.mainMap=function(e){var t=this;e&&e.preventDefault(),this.$main.html('\n    <div id="map-container">\n    </div>\n    ');var i=this.apiUrl+"/photos",a=[{featureType:"all",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"administrative",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.country",elementType:"geometry.stroke",stylers:[{visibility:"off"}]},{featureType:"administrative.country",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.country",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"administrative.province",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.province",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"administrative.locality",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.neighborhood",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"administrative.land_parcel",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"landscape",elementType:"geometry.fill",stylers:[{color:"#c8c8c8"}]},{featureType:"landscape",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"landscape.man_made",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"landscape.man_made",elementType:"geometry",stylers:[{visibility:"off"}]},{featureType:"landscape.man_made",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"poi.park",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi.place_of_worship",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi.place_of_worship",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"poi.school",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi.school",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"poi.sports_complex",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"poi.sports_complex",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"all",stylers:[{saturation:-100},{lightness:45},{visibility:"off"}]},{featureType:"road",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels.text",stylers:[{visibility:"off"}]},{featureType:"road",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.highway",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.highway.controlled_access",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.arterial",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"road.local",elementType:"labels.icon",stylers:[{visibility:"off"}]},{featureType:"transit.line",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"transit.line",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"transit.station",elementType:"all",stylers:[{visibility:"off"}]},{featureType:"transit.station",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"transit.station.airport",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"transit.station.bus",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"transit.station.rail",elementType:"labels",stylers:[{visibility:"off"}]},{featureType:"water",elementType:"all",stylers:[{color:"#ffffff"},{visibility:"on"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#ffffff"}]},{featureType:"water",elementType:"labels",stylers:[{visibility:"off"}]}],l=document.getElementById("map-container"),s={zoom:2,center:new google.maps.LatLng(30,0),mapTypeId:google.maps.MapTypeId.ROADMAP,styles:a};return this.map=new google.maps.Map(l,s),this.ajaxRequest(i,"get",null,function(e){$.each(e,function(e,i){setTimeout(function(){var e=new google.maps.LatLng(i.lat,i.lng),a=new google.maps.Marker({position:e,map:t.map,animation:google.maps.Animation.BOUNCE,icon:{url:"../images/gbm.png",scaledSize:new google.maps.Size(22,38)}});google.maps.event.addListener(a,"click",function(){t.$main.append('<div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n          <div class="modal-dialog" role="document">\n            <div class="modal-content">\n              <div class="modal-header">\n                <h5 class="modal-title" id="locationModalLabel"></h5>\n              </div>\n              <div class="modal-body">\n                  <div class = "info-window">\n                    <img id="photoImage" src=>\n                  </div>\n              </div>\n              <div class="modal-footer">\n                <button type="button" class="btn btn-secondary" data-dismiss="modal"> Close </button>\n              </div>\n            </div>\n          </div>\n        </div>'),$("#locationModalLabel").html(""+i.locationName),$("#photoImage").attr("src",""+i.imageOriginal),$("#infoModal").modal("show")}),setTimeout(function(){a.setAnimation(null)},750)},200*e)})})},Transit.morePics=function(){var e=this,t=this.apiUrl+"/photos";return this.ajaxRequest(t,"get",null,function(t){$.each(t,function(t,i){setTimeout(function(){var t=new google.maps.LatLng(i.lat,i.lng),a=new google.maps.Marker({position:t,map:e.map,animation:google.maps.Animation.BOUNCE,icon:{url:"../images/gbm.png",scaledSize:new google.maps.Size(22,38)}});google.maps.event.addListener(a,"click",function(){e.$main.append('<div class="modal fade" id="infoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">\n          <div class="modal-dialog" role="document">\n            <div class="modal-content">\n              <div class="modal-header">\n                <h5 class="modal-title" id="locationModalLabel"></h5>\n              </div>\n              <div class="modal-body">\n                  <div class = "info-window">\n                    <img id="photoImage" src=>\n                  </div>\n              </div>\n              <div class="modal-footer">\n                <button type="button" class="btn btn-secondary" data-dismiss="modal"> Close </button>\n              </div>\n            </div>\n          </div>\n        </div>'),$("#locationModalLabel").html(""+i.locationName),$("#photoImage").attr("src",""+i.imageOriginal),$("#infoModal").modal("show")}),setTimeout(function(){a.setAnimation(null)},750)},200*t)})})},Transit.logout=function(e){e.preventDefault(),Transit.removeToken(),Transit.loggedOutState()},Transit.handleForm=function(e){e&&e.preventDefault();var t=""+Transit.apiUrl+$(this).attr("action"),i=$(this).attr("method"),a=$(this).serialize();return Transit.ajaxRequest(t,i,a,function(e){e.token&&Transit.setToken(e.token),Transit.loggedInState()})},Transit.ajaxRequest=function(e,t,i,a){return $.ajax({url:e,method:t,data:i,beforeSend:this.setRequestHeader.bind(this)}).done(a).fail(function(e){console.log(e)})},Transit.setRequestHeader=function(e){return e.setRequestHeader("Authorization","Bearer "+this.getToken())},Transit.setToken=function(e){return window.localStorage.setItem("token",e)},Transit.getToken=function(){return window.localStorage.getItem("token")},Transit.removeToken=function(){return window.localStorage.clear()};