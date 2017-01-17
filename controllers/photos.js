const Photo = require('../models/photo');

function photosIndex(req, res) {
  Photo.find((err, photos) => {
    if (err) return res.status(500).send();
    var photosToReturn = [];
    for (var i = 0; i < 10; i++) {
      var random = Math.floor(Math.random() * photos.length);
      console.log(random);
      photosToReturn.push(photos.splice(random, 1)[0]);
    }
    return res.status(200).json(photosToReturn);
  });
}

module.exports = {
  index: photosIndex
};
