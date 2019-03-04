var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/avenger');   // connecting mongodb

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

// Defining the schema for the collection
var avengerSchema = new mongoose.Schema({
    name: String,
    img_src: String
});
// Compiling the schema avenger
var Avenger = mongoose.model('Avenger', avengerSchema);


// var avenger = ["Ironman","Captain America","Hulk","Thor"];
app.get("/",function(req,res){
    res.render("home");
});

app.post("/addavenger",function(req,res){
    var newavenger = req.body.newavenger;
    var newavenger_img = req.body.newavenger_img;
    var avenger = {name:newavenger,img_src:newavenger_img};
    Avenger.create(avenger,function(err,avenger){
        if(err){
            console.log("Error in saving");
        }else{
            console.log(avenger);
        }
    });
    res.redirect("/avengers");
});

app.get("/avengers",function(req,res){
    Avenger.find({},function(err,avenger){
        if(err){
            console.log(err);
        }else{
            // var result = JSON.parse(avenger)
            // console.log(avenger.name);
            res.render("avengers",{avengers:avenger});
        }
    })
});


// Listening server on port 3000 
app.listen(3000,function(){
    console.log("Starting server at 3000 ....");
});