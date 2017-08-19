var App = require('./app'),
    Credentials = require('./Credentials'),
    _io = require('./io'),
    wsConfig = require('./wsConfig'),
    express = require('express'),
    passport = require('passport'),
    mongoose = require('mongoose'),
    connect = require('connect'),
    path = require('path'),
    url = require('url'),
    util = require('util'),
    cookie = require('cookie'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    serveStatic = require('serve-static'),
    expressSession = require('express-session'),
    mongoStore = require('connect-mongo')(expressSession),
    ws = require('express-ws'),
    app = express(),
    router = express.Router(),
    Schema = mongoose.Schema;

var AuthVKStrategy = require('passport-vkontakte').Strategy;

var uri = require('./config');

//get started
mongoose
    .connect(uri);

var net_fight_promotion = mongoose.connection,
    Store = new mongoStore({
        mongooseConnection: net_fight_promotion
    });

net_fight_promotion
    .on('error', function(err) {
        console.log(err);
    });

net_fight_promotion
    .once('open', function () {
        console.log('Connected to mLab');

        var io = new _io(
                cookie,
                cookieParser,
                expressSession,
                Credentials.secret,
                Store
            ),
            expressWebSocket = ws(app, null, {
                wsOptions: wsConfig(io)
            });

        App(
            io,
            expressSession,
            Store,
            expressWebSocket,
            passport,
            mongoose,
            app,
            router,
            {
                VK: AuthVKStrategy
            });

        //defaults
        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(cookieParser());
        app.use(bodyParser.json());
        app.use(function(req, res, next) {
            //res.header('Access-Control-Allow-Origin', 'http://172.20.10.2:8080');
            res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
            //res.header('Access-Control-Allow-Origin', 'http://nfpromo.com');
            //res.header('Access-Control-Allow-Origin', 'https://rshtg.github.io/');
            res.header('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            res.header('Access-Control-Allow-Credentials', true);

            next();
        });

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

        app.listen(3000, function() {
            console.log('Listening on port:3000');
        });
    });



