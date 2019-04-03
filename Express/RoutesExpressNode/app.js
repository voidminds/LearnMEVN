var express = require('express');
var app = express();

//Root Route with '/' 
app.get("/",function(req,res){
    res.send("Hii, There Welcome to assignment of Express and Node");
});

// Visiting '/speak/pig should print "The pig says 'Oink'"
app.get("/speak/pig",function(req,res){ 
    res.send("The pig says 'Oink'");
});

// Visiting '/speak/cow should print "The cow says 'Moo'"
app.get("/speak/cow",function(req,res){ 
    res.send("The Cow says 'Moo'");
});

// Visiting '/speak/dog should print "The dog says 'Woof Woof'"
app.get("/speak/dog",function(req,res){ 
    res.send("The Dog says 'Woof Woof'");
});

//Refactor code for above routes '/speak/animals'
app.get("/speak/:animals",function(req,res){
    var animal = req.params.animals.toLowerCase();
    var sounds = {
        pig:"Oink",
        cow:"Moo",
        dog:"Woof Woof"
    }
    var sound = sounds[animal];
    res.send("The "+animal+" speak "+sound);
});

// Visiting '/repeat/hello/3' should print "hello hello hello"
app.get("/repeat/:greet/:no_of_times",function(req,res){
    var greeting = req.params.greet;
    var no_of_time = req.params.no_of_times;
    var result ="";
    for(var i=0;i<=no_of_time;i++){
        result +=" "+greeting;
    }
    res.send(result);
});


// Route for unvalid route 
app.get("*",function(req,res){
    res.send("404: Page Not Found.....");
});


// Listening at Port 3000

app.listen(3000,function(){
    console.log("Server staring at port 3000 ....");
});