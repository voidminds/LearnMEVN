var express = require('express');
var router = express.Router({mergeParams:true});
var passport = require('passport');
var User = require('./models/user');
// All Routes

router.get('/',(req,res) =>{
    res.render("home");
});

router.get('/secret',isLoggedIn,(req,res) =>{
    res.render("secret")
});

// Auth Routes

router.get('/register',(req,res) =>{
    res.render('register');
});
// Handling user sign up
router.post('/register',(req,res) =>{
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}),req.body.password, (err,user) =>{
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate('local')(req,res, ()=>{
            res.redirect("/secret",{user:user});
        });
    });
});

// Login route
router.get('/login',(req,res)=>{
    res.render("login");
});
// Handling user login
router.post('/login',passport.authenticate("local",{
    successRedirect: "/secret",
    failureRedirect: "/login"
}), (req,res)=>{
});

// Logout route
router.get('/logout',(req,res)=>{
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
router.get("*",(req,res)=>{
    res.render("error");
});

module.exports = router;