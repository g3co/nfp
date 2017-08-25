module.exports = function io(cookie, _cookieParser, session, secret, store) {

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

    var models = {},
        clients = {};

    this.read = read;
    this.write = write;
    this.bindModel = bindModel;
    this.getModel = getModel;
    this.getSession = getSession;
    this.getClient = getClient;
    this.addClient = addClient;
    this.removeClient = removeClient;

    var cookieSplitter = cookie.parse,
        cookieParser = _cookieParser.signedCookie;

    function read(req) {
        if(!!req == false) {
            return
        }

        var query = !!req.query && !!Object.keys(req.query).length == false ? {} : req.query,
            params = !!req.params && !!Object.keys(req.params).length == false ? {} : req.params,
            session = !!req.session && !!req.session.passport ? req.session.passport : null;

        switch(req.method.toLowerCase()) {
            case 'post':
                query = !!req.body && !!Object.keys(req.body).length == false ? {} : req.body;
                break;
            case 'put':
                query = !!req.body && !!Object.keys(req.body).length == false ? {} : req.body;
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

    function bindModel(name, model) {
        if(!!model) {
            models[name] = model
        }
    }

    function getModel(name) {
        if(!!name == false) {
            return false
        }

        return models[name]
    }

    function getSession(id, request) {
        return new Promise(function(resolve, reject) {

            if(!!request == false || !!id == false) {
                console.log('Rejected by request');
                return reject(false)
            }

            var cookies = cookieSplitter(request.headers.cookie),
                sid = cookieParser(cookies[id], secret);

            if(!!sid == false) {
                console.log('Rejected by sid');
                return reject(false)
            }

            var Fighters = getModel('Fighters');

            if(!!Fighters == false) {
                console.log('Rejected by Model');
                return reject(false)
            }

            store.get(sid, function (err, ss) {

                var session = store.createSession(request, ss);

                if(!!session.passport == false || !!session.passport.user == false) {
                    console.log('Rejected by session');
                    return reject(false)
                }

                var user_id = session.passport.user;

                Fighters.findOne({ _id: user_id }, function(err, user) {

                    if(!!err) {
                        console.log('Rejected by Execute model');
                        return reject(false)
                    }

                    if(!!user == false) {
                        console.log('Rejected by user');
                        return reject(false)
                    }

                    return resolve(user)

                })
            });
        })
    }

    function addClient(id, data) {
        if(!!id == false || !!data == false) {
            return false
        }

        var client = getClient(id),
            streams = !!client ? client : [];

        streams.push(data);

        clients[id] = streams;

        return clients[id]
    }

    function getClient(id) {
        if(!!id == false) {
            return false
        }

        return clients[id] || []
    }

    function removeClient(id, data) {
        if(!!id == false || !!data == false) {
            return false
        }

        var client = getClient(id);

        if(!!client == false) {
            delete clients[id];
            return false
        }

        client.forEach(function(o, i) {
            if(o == data) {
                client.splice(i, 1)
            }
        });

        return client

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