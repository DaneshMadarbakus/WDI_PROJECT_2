const Photo = require('../models/photo');

function photosIndex(req, res) {
  Photo.find((err, photos) => {
    if (err) return res.status(500).send();
    return res.status(200).json(photos);
  });
}

module.exports = {
  index: photosIndex
};
