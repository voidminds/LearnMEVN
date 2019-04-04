var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    User = require('./models/user'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');
routes = require('./routes');

// Connect to database
mongoose.connect('mongodb://localhost/auth_demo', {
    useNewUrlParser: true
});

var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
// Adding express-session
app.use(require('express-session')({
    secret: "We are using express session",
    resave: false,
    saveUninitialized: false
}));



// It will add password to the app and used everytime we needed passport.
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
/* Taking data from session and encode and 
decode that data */
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(routes);

app.listen(9000, (req, res) => {
    console.log("Server started at 9000");
});