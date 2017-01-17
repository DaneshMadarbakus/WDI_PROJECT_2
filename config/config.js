module.exports = {
  port: process.env.PORT || 3000,
  db: 'mongodb://localhost:27017/photos',
  secret: process.env.SECRET || 'this is secret'
};
