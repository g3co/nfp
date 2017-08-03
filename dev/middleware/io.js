module.exports = function io() {

    var messages = {
        1: 'Unknown error occurred',
        2: 'Unknown method passed',
        3: 'Authorization failed',
        4: 'Access denied',
        5: 'Internal server error',
        6: 'Invalid body request',
        7: 'Object is unavailable'
    };

    this.read = read;
    this.write = write;

    function read(req) {
        if(!!req == false) {
            return
        }

        var query = !!Object.keys(req.query).length == false ? {} : req.query,
            params = !!Object.keys(req.params).length == false ? {} : req.params,
            session = !!req.session && !!req.session.passport ? req.session.passport : null;

        switch(req.method.toLowerCase()) {
            case 'post':
                query = !!Object.keys(req.body).length == false ? {} : req.body;
                break;
            case 'put':
                query = !!Object.keys(req.body).length == false ? {} : req.body;
                break;
        }

        return {
            query: filterData(query),
            params: params,
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
                        error: (o.result < 200) ? o.result : 0,
                        error_description: messages[o.result] || '',
                        result: data
                    }
                }
            }
        }

        res.send(data);
    }
};

function filterData(data) {

    data = !!data == false ? {} : data;

    Object.keys(data).forEach(function(i) {
        var item = data[i];

        try {
            item = JSON.parse(item);
        } catch(e){}

        data[i] = item
    });

    return data
}