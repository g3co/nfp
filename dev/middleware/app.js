//RESTful Application
module.exports = function(app, router) {

    var API = '/api/v1';

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
        res.send('Fighter:'+ req.params.id)
    });

    router.get(API.concat('/sparrings'), function(req, res) {
        res.send('Sparrings')
    });
    router.get(API.concat('/sparring/:id'), function (req, res) {
        res.send('Sparring:'+ req.params.id)
    });
};