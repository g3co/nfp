//RESTful Application
var path = require('path'),
    Credentials = require('./Credentials');

module.exports = function(io, session, store, expressWebSocket, passport, mongoose, app, router, Strategy) {

    console.log("CREDENTIALS: ", Credentials);

    /*
    * @base:
    * API version, secret key
    * */
    var API = '/api/v1',
        secret = Credentials.secret;

    var models = require('.'.concat(API).concat('/models'))(mongoose);

    /*
    * @models:
    * MapSynchronization
    * Places
    * Fighter
    * Tournaments
    * Pairs
    * */
    var MapSynchronization = models.MapSynchronization,
        Places = models.Places,
        Fighters = models.Fighters,
        Tournaments = models.Tournaments,
        Pairs = models.Pairs;

    //IO bindings
    io.bindModel('Fighters', Fighters);

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
    router.get(API.concat('/logout'), checkAuth, function (req, res) {
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

    router.get(API.concat('/sparrings'), checkAuth, function(req, res) {
        require(pathTo('get', 'sparrings'))(Sparrings, io, req, res)
    });
    router.get(API.concat('/sparring/:id'), checkAuth, function (req, res) {
        require(pathTo('get', 'sparring'))(Sparrings, io, req, res)
    });

    //UPDATE
    router.put(API.concat('/account'), checkAuth, function (req, res) {
        require(pathTo('put', 'account'))(Fighters, io, req, res)
    });
    router.put(API.concat('/fighter/:id'), checkAuth, function (req, res) {
        require(pathTo('put', 'fighter'))(Places, Fighters, io, req, res)
    });

    //DELETE

    //WebSocket CRUD
    //READ
    app.ws(API.concat('/event'), function (ws, req) {
        require(pathTo('ws', 'event'))(expressWebSocket.getWss('/event'), ws, io, req)
    });

    //settings
    app.use(session({
        secret: secret,
        resave: true,
        saveUninitialized: true,
        store: store
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

        return io.write(res, null, { result: 0 })
    }
};