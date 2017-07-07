var request = require('request');

function Deferred() {

    var bind = this;

    this.when = when;
    this.req = req;

    function when(singleArg) {

        var order = arguments,
            count = order.length,
            size = count-1,
            iterations = count,
            _resolved = 0,
            result = [];

        return new Promise(function(resolve, reject) {

            while(iterations--) {
                (function(promise) {
                    promise
                        .then(function(arg) {

                            result.push(arg);

                            if(_resolve() == size) {
                                return resolve(result)
                            }

                            return arg
                        })
                        .catch(function (err) {
                            reject(err)
                        })
                })(order[iterations])
            }
        });

        function _resolve() {
            return _resolved++
        }
    }

    function req(options) {
        return new Promise(function(resolve, reject) {

            request(options, function(error, response, body) {

                if(!!error) {
                    return reject(new Error(error))
                }

                if(!!body == false) {
                    return reject(new Error('Null requested'))
                }

                return resolve(body)

            });

        })
    }
}

module.exports = Deferred;