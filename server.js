var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');


var server = new WebpackDevServer(webpack(config), {
    contentBase: config.devServer.contentBase,
    publicPath: config.output.publicPath,
    hot: true,
    inline: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
});


server
    .listen(8080, 'localhost', function (err, result) {
        if(err) {
            return console.log(err);
        }

        console.log('Listening at http://localhost:8080/');
    });

server.middleware
    .waitUntilValid(function() {
        console.log('APSKMD SA(IUFASYFASB&F NSA(ASF*J<MA_S IFNHMASF')
    });

console.log(server.app.on);
process.exit(1);