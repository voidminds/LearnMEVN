var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

/* It will add passport-local-mongoose to userschema 
to provide different method and functionality. */

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",UserSchema);