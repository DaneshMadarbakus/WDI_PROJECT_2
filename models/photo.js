const mongoose = require('mongoose');

const photoSchema = mongoose.Schema({
  title: {type: String},
  imageOriginal: {type: String, required: true, unique: true },
  imageBig: {type: String, required: true, unique: true},
  imageSmall: {type: String, required: true, unique: true},
  locationName: {type: String, required: true},
  lng: {type: Number, required: true},
  lat: {type: Number, required: true},
  createdAt: {type: String, required: true},
  uploader: {type: String, required: true, trim: true},
  uploaderPic: {type: String},
  portfolioUrl: {type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('Photo', photoSchema);


// Use the rquest promise e
// $.get(unsplahsapi)
//   .done(data => {
//     Photo.create({
//       username: data.username
//       profileUrl: data.unsplash_usr_url
//     })
//   })
