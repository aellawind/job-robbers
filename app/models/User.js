var mongoose = require ('mongoose');

var userSchema = mongoose.Schema({
  _id     : String,
  asana   : {
    token : String,
    name  : String,
    email : String
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;