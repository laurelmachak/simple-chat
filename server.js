const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

// tell express to make public folder accesible
// to the public by using built-in middleware called 'static'

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
var db;

MongoClient.connect(process.env.MONGO_URI, function(err, database){
    if (err) return console.log(err);
    db = database;
    app.listen(3000, function(){
        console.log('listening on 3000');
    });
});


//console.log("This agression will not stand, man");

app.get('/', function(req,res){
    var cursor = db.collection('sent').find().toArray(function(err, result){
        if (err) return console.log(err);
        res.render('index.ejs', {sent: result});
        console.log(result);
    });
});

app.post('/sent', function(req,res){
    // create sent collection
    db.collection('sent').save(req.body, function(err, result){
        if (err) return console.log(err);
        console.log('saved to database');
        // redirect to home as response from server, once saved
        res.redirect('/')
    });

});

// UPDATE
app.put('/sent', function(req,res){
    // handle put request
    db.collection('sent').findOneAndUpdate({name: 'Replace'},{
        $set: {
            name: req.body.name,
            message: req.body.message
        }
        }, {
        sort: {_id:-1},
        upsert: true

    }, function(err,result){
        if (err) return res.send(err);
        res.send(result);

    });
});


// DELETE
app.delete('/sent', function(req, res){
    db.collection('sent').findOneAndDelete({name: req.body.name},
    function(err, result){
        if (err) return res.send(500, err);
        res.send({message: 'test deletion'});
    });
});
