module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/photos',
  secret: process.env.SECRET || 'this is secret'
};
