var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/avenger');   // connecting mongodb
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Database conected");
});

// Defining the schema for the collection
var avengerSchema = new mongoose.Schema({
    name: String
});

// Compiling the schema avenger
var Avenger = mongoose.model('Avenger', avengerSchema);

Avenger.create({name: 'Captain America'},function(err,avenger){
    if(err){
        console.log("Error in saving");
    }else{
        console.log(avenger);
    }
});

Avenger.find({},function(err,Avenger){
    if(err){
        console.log("Cannot found any collection");
    }else{
        console.log("Found");
        console.log(Avenger);
    }
});


