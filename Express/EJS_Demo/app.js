var express = require('express');
var app = express();

// Root Route (home)
app.get("/",function(req,res){
    res.render("home.ejs");
    // res.send("<h1>Welcome to Home Page</h1>");
});

app.get("/avengers",function(req,res){
    res.render("avengers.ejs");
});

// Passing parameter in render()
app.get("/avenger/:names",function(req,res){
    var name = req.params.names;
    res.render("avenger.ejs",{avname:name});
    // res.send("Avenger Name : "+name);
});










// Unvalid routes 
app.get("*",function(req,res){
    res.render("error.ejs");
});


//Listening at port 3000
app.listen(3000,function(){
    console.log("Server starting at port 3000 ....");
});