var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

var avenger = ["Ironman","Captain America","Hulk","Thor"];
app.get("/",function(req,res){
    res.render("home");
});

app.post("/addavenger",function(req,res){
    var newavenger = req.body.newavenger;
    avenger.push(newavenger);
    res.redirect("/avengers");
});

app.get("/avengers",function(req,res){
    res.render("avengers",{avengers:avenger});
});


// Listening server on port 3000 
app.listen(3000,function(){
    console.log("Starting server at 3000 ....");
});