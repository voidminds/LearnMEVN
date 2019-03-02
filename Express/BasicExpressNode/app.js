var express = require("express");
var app = express();

app.get("/",function(req,res){
    res.send("Hi,There!!!");
});

app.get("/bye",function(req,res){
    res.send("GoodBye...");
});

// app.get("*",function(req,res){
//     res.send("Can go anywhere...");
// });

app.get("/r/:subRoutine",function(req,res){
    var subRoute = req.params.subRoutine;
    res.send("Welcome to "+subRoute+" subRoutine");
});

app.get("/r/:subRoutine/comments/:id/:title",function(req,res){
    var subRoute = req.params.subRoutine;
    var id = req.params.id;
    var title = req.params.title;
    res.send("Welcome To "+subRoute.toUpperCase()+" subRoutine with id "+id+" and title "+title);
});




app.listen(3000,function(){
    console.log("Server started at port 3000 ....");
});