var express = require('express'),
    mongoose = require('mongoose'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    router = express.Router(),
    Schema = mongoose.Schema;

var uri = require('./config');

app.use(bodyParser.urlencoded({ extended: true }));

//get started
mongoose
    .connect(uri);

var net_fight_promotion = mongoose.connection;

net_fight_promotion
    .on('error', function(err) {
        console.log(err);
    });

net_fight_promotion
    .once('open', function () {
        console.log('Connected to mLab');

        require('./app')(app, router);

        //defaults
        app.use('/', express.static(path.join(__dirname, 'public')));
        app.use('/', router);

        app.listen(3000, function() {
            console.log('Listening on port:3000');
        })
    });



