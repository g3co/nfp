var express = require('express'),
    expressSession = require('express-session'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    path = require('path'),
    util = require('util'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
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
        app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Credentials', true);

            next();
        });
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(expressSession({
            secret: 'test_string',
            resave: true,
            saveUninitialized: true
        }));
        app.use(passport.initialize());
        app.use(passport.session());

        //authorization VK
        passport.use(new AuthVKStrategy({
            clientID: OAuthCredentials.vk.appId,
            clientSecret: OAuthCredentials.vk.secureKey,
            callbackURL: OAuthCredentials.vk.callbackRoute,
            scope: ['email'],
            profileFields: ['email', 'city', 'bdate']
        }, function(accessToken, refreshToken, params, profile, done) {
            console.log('Access Token: %o,\r\n Refresh Token: %o,\r\n Params: %o\r\n,Profile: %o,\r\n', accessToken, refreshToken, params, profile);

            process.nextTick(function () {
                return done(null, profile);
            });
        }));

        passport.serializeUser(function(user, done) {
            console.log('USER: %o', user);
            done(null, user.id);
        });

        passport.deserializeUser(function(id, done) {
            done(null, id);
        });

        app.use('/', express.static(path.join(__dirname, 'public')));
        app.use('/', router);

        app.listen(3000, function() {
            console.log('Listening on port:3000');
        })
    });



