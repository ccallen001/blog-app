const mongoose = require('mongoose');

module.exports = mongoose.model(
  'User',
  new mongoose.Schema({
    username: String,
    passwordHash: String,
    name: String,
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
      }
    ]
  }).set('toJSON', {
    transform: (_, returnedObject) => {
      returnedObject.id = returnedObject._id.toString();
      delete returnedObject._id;
      delete returnedObject.__v;
      // the passwordHash should not be revealed
      delete returnedObject.passwordHash;
    }
  })
);
