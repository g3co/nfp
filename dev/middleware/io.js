module.exports = function io() {

    var messages = {
        1: 'Unknown error occurred',
        2: 'Unknown method passed',
        3: 'Authorization failed',
        4: 'Access denied',
        5: 'Internal server error'
    };

    this.read = read;
    this.write = write;

    function read(req) {
        if(!!req == false) {
            return
        }

        var query,
            session;

        query = !!req.params == false ? !!req.query == false ? !!req.body == false ? {} : req.body : req.query : req.params;
        session = !!req.session && !!req.session.passport ? req.session.passport : null;

        return {
            query: query,
            session: session
        }
    }

    function write(res, data, o) {
        if(!!res == false) {
            return
        }

        o = o || {
                headers: [],
                status: 200,
                result: 200
            };

        if(o.status) {
            res.status = o.status;
        }

        o.headers = o.headers || [];
        o.type = o.type || 'json';

        switch(o.type) {
            case 'json':
                o.headers.push({ name: 'Content-Type', value: 'application/json' });
                break;
            case 'html':
                o.headers.push({ name: 'Content-Type', value: 'text/html' });
                break;
            case 'text':
                o.headers.push({ name: 'Content-Type', value: 'text/plain' });
                break;
        }

        if(o.headers) {
            var _headers = o.headers;
            for(var h in _headers) {
                var _name = _headers[h].name,
                    _value = _headers[h].value;
                res.setHeader(_name, _value);

                if(!!_value && !!_value.match(/json/i)) {
                    data = {
                        error: o.result,
                        error_description: messages[o.result] || '',
                        result: data
                    }
                }
            }
        }

        res.send(data);
    }
};