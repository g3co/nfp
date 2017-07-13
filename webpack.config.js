var env = process.argv.find(
    function(argv) {
        return !!argv.match(/ENV/i)
    });

env = !!env ? env.split('=')[1] : 'dev';

if(!!env) {
    module.exports = require('./webpack.'+ env +'.js');
}