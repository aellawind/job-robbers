var mongoose = require ('mongoose');

var userSchema = mongoose.Schema({
  _id       : Number,
  asana     : {
    token   : String,
    name    : String,
    email   : String
  },
  projectId : Number,
  progress  : Array
});

var User = mongoose.model('User', userSchema);

module.exports = User;