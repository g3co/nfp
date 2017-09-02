//RESTful Application
var path = require('path'),
    Credentials = require('./Credentials');

module.exports = function(io, session, store, socketIO, passport, mongoose, app, router, Strategy) {

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
        include('auth', 'vk')(Fighters, io, profile, done)
    }));

    //Account
    router.get(API.concat('/account'), function (req, res) {
        include('get', 'account')(io, req, res, Fighters)
    });

    //Log OUT
    router.get(API.concat('/logout'), checkAuth, function (req, res) {
        include('get', 'logout')(io, req, res, Fighters)
    });

    //CREATE
    router.post(API.concat('/place'), function (req, res) {
        include('post', 'place')(io, req, res, Places)
    });
    router.post(API.concat('/event/:id'),/* checkAuth, */function (req, res) {
        include('post', 'event')(io, req, res, Tournaments, Fighters)
    });

    //READ
    router.get(API.concat('/places'), function (req, res) {
        include('get', 'places')(io, req, res, MapSynchronization, Fighters, Places)
    });
    router.get(API.concat('/place/:id'), function (req, res) {
        include('get', 'place')(io, req, res, Places)
    });

    router.get(API.concat('/fighters'), checkAuth, function (req, res) {
        include('get', 'fighters')(io, req, res, Fighters)
    });
    router.get(API.concat('/fighter/:id'), checkAuth, function (req, res) {
        include('get', 'fighter')(io, req, res, Fighters)
    });

    router.get(API.concat('/events'), checkAuth, function(req, res) {
        include('get', 'events')(Tournaments, io, req, res)
    });
    router.get(API.concat('/event/:id'), checkAuth, function (req, res) {
        include('get', 'event')(Tournaments, io, req, res)
    });

    //UPDATE
    router.put(API.concat('/account'), checkAuth, function (req, res) {
        include('put', 'account')(io, req, res, Fighters)
    });
    router.put(API.concat('/fighter/:id'), checkAuth, function (req, res) {
        include('put', 'fighter')(io, req, res, Places, Fighters)
    });

    //DELETE

    //WebSocket
    socketIO.on('connection', function (socket) {

        io.getSession('connect.sid', socket.request)
            .then(function(user) {

                console.log('WS: Auth Successful!');

                var userId =  user._id;

                //place current connection for User
                io.addClient(userId, socket);

                socket.on('disconnect', function() {
                    //remove current connection or destroy all for stored User
                    io.removeClient(userId, socket)
                });

                include('ws', 'event')(io, socket, {
                    name: 'event',
                    userId: userId
                });
            })
            .catch(function(e) {
                console.log('WS: Auth Failed!');
                socket.disconnect();
            })

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
    function include(type, entity) {
        return require(path.join(__dirname, API, type, entity))
    }

    function checkAuth(req, res, next) {

        if(req.isAuthenticated())
        {
            return next()
        }

        return io.write(res, null, { result: 0 })
    }
};