module.exports = function io(dep, Fighters) {

    var messages = {
        0: 'Not authorized',
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
    this.getSession = getSession;

    var request = null,
        cookieSplitter = dep.cookie.split.parse,
        cookieParser = dep.cookie.cookieParser.signedCookie,
        secret = dep.secret,
        store = dep.store;

    function read(req) {
        if(!!req == false) {
            return
        }

        request = req;

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

        if(o.status && !!res.status) {
            res.status = o.status;
        }

        o.headers = o.headers || [];
        o.type = o.type || 'json';

        switch(o.type) {
            case 'json':
                o.headers.push({ name: 'Content-Type', value: 'application/json' });

                data = {
                    error: (o.result < 200) ? o.result : 0,
                    error_description: messages[o.result] || '',
                    result: data
                };
                break;
            case 'html':
                o.headers.push({ name: 'Content-Type', value: 'text/html' });
                break;
            case 'text':
                o.headers.push({ name: 'Content-Type', value: 'text/plain' });
                break;
        }

        if(o.headers && !!res.setHeaders) {
            o.headers.forEach(function(item, key) {
                res.setHeader(item.name, item.value);
            })
        }

        if(!!res.setHeaders == false) {
            data = JSON.stringify(data)
        }

        return res.send(data)
    }

    function getSession(id) {
        return new Promise(function(resolve, reject) {
            if(!!request == false || !!id == false) {
                return reject(false)
            }

            var cookies = cookieSplitter(request.headers.cookie),
                sid = cookieParser(cookies[id], secret);

            if(!!sid == false) {
                return reject(false)
            }

            store.get(sid, function (err, ss) {

                var session = store.createSession(request, ss);
                
                if(!!session.passport == false || !!session.passport.user == false) {
                    return reject(false)
                }

                var user_id = session.passport.user;

                Fighters.findOne({ _id: user_id }, function(err, user) {

                    if(!!err) {
                        return reject(false)
                    }

                    if(!!user == false) {
                        return reject(false)
                    }

                    return resolve(user)

                })
            });
        })
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