//RESTful Application

module.exports = function(mongoose, app, router) {

    var API = '/api/v1';

    var models = require('.'.concat(API).concat('/models'))(mongoose),
        Places = models.Places,
        Fighters = models.Fighters,
        Sparrings = models.Sparrings;

    router.use(function(req, res, next) {
        console.log(req.method+req.url);
        next()
    });

    router.get('/', function(req, res) {
        res.send('HomePage')
    });

    //GET
    router.get(API.concat('/places'), function (req, res) {
        res.send('Places')
    });
    router.get(API.concat('/place/:id'), function (req, res) {
        res.send('Place:'+ req.params.id)
    });

    router.get(API.concat('/fighters'), function (req, res) {
        res.send('Fighters')
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

    //POST
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
};