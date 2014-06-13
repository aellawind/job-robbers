var mongoose = require ('mongoose');

var userSchema = mongoose.Schema({
  asana : {
    id    : String,
    name  : String,
    email : String
  }
});

var User = mongoose.model('User', userSchema);

module.exports = User;