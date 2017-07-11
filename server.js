var express = require('express'),
    path = require('path'),
    app = express();

app.set('port', 8080);
app.use('/', express.static(path.join(__dirname + '/dev')));


var server = app.listen(app.get('port'), function() {
    console.log('Webserver started')
});