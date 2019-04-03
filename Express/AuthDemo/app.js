var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    User = require('./models/user'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

// Connect to database
mongoose.connect('mongodb://localhost/auth_demo',{useNewUrlParser:true});

var app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
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

// All Routes

app.get('/',(req,res) =>{
    res.render("home");
});

app.get('/secret',isLoggedIn,(req,res) =>{
    res.render("secret")
});

// Auth Routes

app.get('/register',(req,res) =>{
    res.render('register');
});
// Handling user sign up
app.post('/register',(req,res) =>{
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}),req.body.password, (err,user) =>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate('local')(req,res, ()=>{
            res.redirect("/secret");
        });
    });
});

// Login route
app.get('/login',(req,res)=>{
    res.render("login");
});
// Handling user login
app.post('/login', passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req,res)=>{
});

// Logout route
app.get('/logout',(req,res)=>{
    req.logout();
    res.redirect("/");
});

// Middleware to check user isloggedIn 
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

// all other route handling
app.get("*",(req,res)=>{
    res.render("error");
});


app.listen(9000,(req,res) => {
    console.log("Server started");
});