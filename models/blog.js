const mongoose = require('mongoose');

module.exports = mongoose.model(
  'Blog',
  new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  }).set('toJSON', {
    transform: (_, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
    }
  })
);
