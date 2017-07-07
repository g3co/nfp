//RESTful Application
var path = require('path'),
    expressSession = require('express-session');

module.exports = function(passport, mongoose, app, router, Strategy) {

    var API = '/api/v1';

    var models = require('.'.concat(API).concat('/models'))(mongoose),
        io = new (require('./io.js'))();

    var MapSynchronization = models.MapSynchronization,
        Places = models.Places,
        Fighters = models.Fighters,
        Tournaments = models.Tournaments,
        Pairs = models.Pairs;

    var Credentials = require('./Credentials');

    router.use(function(req, res, next) {
        console.log(req.method+req.url);
        next()
    });

    router.get('/', function(req, res) {
        res.send('HomePage')
    });

    //authorization VK
    router.get(
        API.concat('/auth/vk'),
        passport.authenticate('vkontakte', { scope: ['email'], display: 'mobile' }),
        function(req, res) {
            //none
        }
    );
    router.get(API.concat('/auth/vk/cb'),
        passport.authenticate('vkontakte', {
            successRedirect: '/auth/vk',
            failureRedirect: '/auth'
        })
    );


    passport.use(new Strategy.VK({
        clientID: Credentials.vk.appId,
        clientSecret: Credentials.vk.secureKey,
        callbackURL: Credentials.vk.callbackRoute,
        scope: ['email'],
        profileFields: ['email', 'city', 'bdate']
    }, function(accessToken, refreshToken, params, profile, done) {
        require(pathTo('auth', 'vk'))(Fighters, io, profile, done)
    }));

    //Account
    router.get(API.concat('/account'), function (req, res) {
        require(pathTo('get', 'account'))(Fighters, io, req, res)
    });

    //Log OUT
    router.get(API.concat('/logout'), function (req, res) {
        require(pathTo('get', 'logout'))(Fighters, io, req, res)
    });

    //CREATE
    router.post(API.concat('/place'), function (req, res) {
        require(pathTo('post', 'place'))(Places, io, req, res)
    });

    //READ
    router.get(API.concat('/places'), function (req, res) {
        require(pathTo('get', 'places'))(MapSynchronization, Fighters, Places, io, req, res)
    });
    router.get(API.concat('/place/:id'), function (req, res) {
        require(pathTo('get', 'place'))(Places, io, req, res)
    });

    router.get(API.concat('/fighters'), checkAuth, function (req, res) {
        require(pathTo('get', 'fighters'))(Fighters, io, req, res)
    });
    router.get(API.concat('/fighter/:id'), checkAuth, function (req, res) {
        require(pathTo('get', 'fighter'))(Fighters, io, req, res)
    });

    router.get(API.concat('/sparrings'), function(req, res) {
        require(pathTo('get', 'sparrings'))(Sparrings, io, req, res)
    });
    router.get(API.concat('/sparring/:id'), function (req, res) {
        require(pathTo('get', 'sparring'))(Sparrings, io, req, res)
    });

    //UPDATE
    router.put(API.concat('/account'), function (req, res) {
        require(pathTo('put', 'account'))(Fighters, io, req, res)
    });

    //DELETE

    //settings
    app.use(expressSession({
        secret: 'test_string',
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    //Passport
    passport.serializeUser(function(user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        Fighters.findById(id, function(err, user) {
            if(!!err) {
                return done(err, null)
            }

            return done(null, user)
        })
    });

    //helpers
    function pathTo(type, entity) {
        return path.join(__dirname, API, type, entity)
    }

    function checkAuth(req, res, next) {

        if(req.isAuthenticated())
        {
            return next()
        }

        return res.redirect('/')
    }
};