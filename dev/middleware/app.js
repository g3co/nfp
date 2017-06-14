//RESTful Application

module.exports = function(passport, mongoose, app, router) {

    var API = '/api/v1';

    var models = require('.'.concat(API).concat('/models'))(mongoose),
        controllers = require('.'.concat(API).concat('/controllers'))(models);

    router.use(function(req, res, next) {
        console.log(req.method+req.url);
        next()
    });

    router.get('/', function(req, res) {
        res.send('HomePage')
    });

    //AUTHORIZATION
    router.get(
        API.concat('/auth/vk'),
        passport.authenticate('vkontakte', { scope: ['email'], display: 'mobile' }),
        function(req, res) {
            console.log(req);
            res.send('done');
        }
    );
    router.get(API.concat('/auth/vk/cb'),
        passport.authenticate('vkontakte', {
            successRedirect: '/',
            failureRedirect: '/auth/vk'
        })
    );

    //SIGN OUT
    router.get(API.concat('/logout'), function (req, res) {
        req.logout();
        res.send('{"result": "Success logged out"}');
    });

    //CREATE
    router.post(API.concat('/fighter'), function(req, res) {
        console.log(req.body);

        var fighter = new Fighters({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            avatar: req.body.avatar,
            sex: req.body.sex,
            email: req.body.email
        });

        fighter.save(function(err) {
            if(err) {
                return res.send(err.name)
            }

            return res.send({fighter: fighter})
        })
    });

    //READ
    router.get(API.concat('/places'), function (req, res) {
        res.send('Places')
    });
    router.get(API.concat('/place/:id'), function (req, res) {
        res.send('Place:'+ req.params.id)
    });

    router.get(API.concat('/fighters'), checkAuth, function (req, res) {
        res.send('{"result": "Fighters"}')
    });
    router.get(API.concat('/fighter/:id'), function (req, res) {
        return Fighters.findById(req.params.id, function(err, fighter) {
            if(err) {
                return res.send(err.name)
            }

            if(!fighter) {
                res.statusCode = 404;
                return res.send({ error: 'Fighter Not found' })
            }

            return res.send({fighter: fighter})
        })
    });

    router.get(API.concat('/sparrings'), function(req, res) {
        res.send('Sparrings')
    });
    router.get(API.concat('/sparring/:id'), function (req, res) {
        res.send('Sparring:'+ req.params.id)
    });

    //UPDATE

    //DELETE

    function checkAuth(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/')
    }
};