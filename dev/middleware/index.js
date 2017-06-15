var express = require('express'),
    expressSession = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    path = require('path'),
    url = require('url'),
    util = require('util'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    serveStatic = require('serve-static'),
    app = express(),
    router = express.Router(),
    Schema = mongoose.Schema;

var AuthVKStrategy = require('passport-vkontakte').Strategy;

var uri = require('./config'),
    OAuthCredentials = require('./OAuthCredentials');

console.log(OAuthCredentials);

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

        require('./app')(passport, mongoose, app, router);

        //defaults
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(passport.initialize());
        app.use(passport.session());

        //Serving Static
        app.use('/', function(req, res, next) {
            return serveStatic(
                path.join(__dirname, 'static', provideLang(req.query.lng), 'public'),
                { 'index': ['index.html', 'index.htm']}
            )(req, res, next);

            function provideLang(lng) {
                var defLng = 'ru';

                lng = !!lng ? lng.slice(0, 2) : defLng;

                return lng.match(/en|ru/i) ? lng : defLng
            }
        });
        //Routing
        app.use('/', router);

        //HTTP Headers
        app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Credentials', true);

            next();
        });
        app.use(expressSession({
            secret: 'test_string',
            resave: true,
            saveUninitialized: true
        }));

        app.listen(3000, function() {
            console.log('Listening on port:3000');
        })
    });



