const mongoose = require('mongoose');
const rp       = require('request-promise');

const databaseURL = process.env.MONGOLAB_URL || 'mongodb://localhost:27017/photos';
mongoose.connect(databaseURL);

const Photo = require('../models/photo');

const unsplashapi = 'https://api.unsplash.com/photos/random?client_id=52850a2c4a66531dc6bc3cbc8e3791304867bf27f1ffad1d33238821bf993868';


const options = {
  uri: unsplashapi,
  headers: {
    'Accept-Version': 'v1'
  },
  json: true
};

// for(var i = 0; i < 50; i++){
rp(options)
  .then(data => {
    console.log('general data', {
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
    });
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
      console.log(photo.uploader + 's photo was saved.');
    });
  }).catch(err => {
    console.log(err);
  });
// }
