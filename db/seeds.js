const mongoose = require('mongoose');
const rp       = require('request-promise');
const config   = require('../config/config');

mongoose.connect(config.db);

const Photo = require('../models/photo');

// Photo.collection.drop();

const unsplashapi = 'https://api.unsplash.com/photos/random?client_id=52850a2c4a66531dc6bc3cbc8e3791304867bf27f1ffad1d33238821bf993868';

const options = {
  uri: unsplashapi,
  headers: {
    'Accept-Version': 'v1'
  },
  json: true
};

for (var i = 0; i < 30; i++) {

  rp(options)
  .then(data => {
    // console.log('general data', {
    //   title: data.categories[0].title,
    //   imageOriginal: data.urls.raw,
    //   imageBig: data.urls.full,
    //   imageSmall: data.urls.small,
    //   locationName: data.location.title,
    //   lat: data.location.position.latitude,
    //   lng: data.location.position.longitude,
    //   createdAt: data.created_at,
    //   uploader: data.user.username,
    //   uploaderPic: data.user.profile_image.large,
    //   portfolioUrl: data.user.links.html
    // });

    if (data.location && data.categories.length && data.user && data.location.position.latitude && data.location.position.longitude){
      Photo.create({
        title: data.categories[0].title,
        imageOriginal: data.urls.raw,
        imageBig: data.urls.full,
        imageSmall: data.urls.small,
        locationName: data.location.title,
        lat: data.location.position.latitude,
        lng: data.location.position.longitude,
        createdAt: data.created_at,
        uploader: data.user.username,
        uploaderPic: data.user.profile_image.large,
        portfolioUrl: data.user.links.html
      }, (err, photo) => {
        if (err) return console.log(err);
        return console.log(photo.uploader + 's photo was saved.');
      }).catch(err => {
        console.log(err);
      });
    } else console.log('data wasn\'t right');
  });

}
