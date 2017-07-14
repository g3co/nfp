;(function(window, $dw) {

    $dw.prototype = new $dw();

    window.$dw = $dw;
})(window, $dw);

function $dw(sel) {

    'use strict';

    //initialization
    function $nfp(s) {

        function getDOMElement(s) {
            if(!!Object.prototype.toString.call(sel).match(/Window|HTML/)) {
                return s
            }

            return document.querySelectorAll(s)
        }

        var collection = getDOMElement(s);

        if(!!collection.length) {
            for(var _el in collection) {
                this[_el] = collection[_el];
            }
        } else {//?!
            this[0] = collection;
        }

        this.middleware = 'http://localhost:3000';
        this.selector = !!s ? !!s.length ? s : this[0].tagName && this[0].tagName.toLowerCase() : '';
        this.length = this.length || 1;
    }

    //base functionality
    function rootDataWorker() {
        return {

            //exclude all except {n}
            eq: function(n) {

                var el = this[n];

                if(!!el == false) {
                    return
                }

                this.forEach(function(o, i) {
                    delete this[i];
                    this.length = this.length - 1;//reduce length manually
                }.bind(this));

                this[0] = el;

                return this
            },

            //get NodeElement
            get: function(i) {

                if(!!i == false && i != 0) {
                    return
                }

                return this[i]
            },

            create: function(tag, o) {
                if(!!tag == false) {
                    return
                }

                var el = this[0] || window.document,
                    _new = document.createElement(tag);

                if(!!o) {
                    for(var _o in o) {
                        _new[_o] = o[_o];
                    }
                }

                el.appendChild(_new);

                return $dw(_new)
            },

            //attributes worker
            attr: function(name, value) {
                if(!!name == false) {
                    return
                }

                var el = this[0],
                    attribute = '';

                if(!!value && value !== false && value !== 0) {
                    el.setAttribute(name, value);

                    return this
                }

                return el.getAttribute(name)
            },

            setClass: function(s) {
                if(!!s == false) {
                    return
                }

                var el = this[0];

                el.className = s;

                return this
            },

            addClass: function(s) {
                if(!!s == false) {
                    return
                }

                var el = this[0],
                    _className = el.className;

                if(!!_className.match(new RegExp(s, 'ig'))) {
                    return this
                }

                el.className = _className +' '+ s;

                return this
            },

            removeClass: function(s) {
                s = s || '';

                var el = this[0],
                    _className = el.className;

                _className = _className.replace(s, '').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

                el.className = _className;

                return this
            },

            //find element inside
            find: function(s) {
                if(!!s == false) {
                    return
                }

                return this[0].querySelectorAll(s)
            },

            append: function(node) {
                if(!!node == false) {
                    return this
                }

                this[0].appendChild(node);

                return this
            },

            remove: function() {
                return getInstance(this)
                    .remove()
            },

            //add event
            on: function(et, foo, o) {
                if(!!et == false || !!foo == false) {
                    return
                }

                if(!!Object.prototype.toString.call(foo).match(/Function/) == false) {
                    return
                }

                getInstance(this).forEach(function(t) {
                    t.addEventListener(et, foo, o);
                });

                return this
            },

            //remove event
            off: function(et, foo) {

                getInstance(this).forEach(function(t) {
                    t.removeEventListener(et, foo);
                });

                return this
            },

            //dispatch event only once
            once: function(et, foo, o) {
                if(!!et == false || !!foo == false) {
                    return
                }

                if(!!Object.prototype.toString.call(foo).match(/Function/) == false) {
                    return
                }

                getInstance(this).forEach(function(t) {
                    t.addEventListener(et, onceFiring);

                    function onceFiring(e) {
                        this.removeEventListener(et, onceFiring);
                        foo.call(this, e);
                    }
                });

                return this
            },

            //dispatch an event
            trigger: function(et, o, custom) {
                if(!!et == false) {
                    return
                }

                o = !!o ? {detail: o} : null;

                custom = !!custom && custom !== false ? !!custom : true;

                var _event = custom ? new CustomEvent(et, o) : new Event(et, o);

                getInstance(this).forEach(function(t) {
                    t.dispatchEvent(_event);
                });

                return this
            },

            //localStorage worker
            localStorage: function(name, value) {

                var localStorage = window.localStorage;

                if(!!name == false) {
                    return false
                }

                name = 'NFP-'.concat(name);

                if(!!value) {
                    return localStorage.setItem(name, value)
                }

                return localStorage.getItem(name)

            },

            //make an AJAX request
            request: function(o) {

                var base = this.middleware;

                return new Promise(function(resolve, reject) {

                    if(!!o == false) {
                        reject(new Error('Wrong parameters'))
                    }

                    //if string passed convert to Object.url = String
                    if(!!Object.prototype.toString.call(o).match(/String/)) {
                        o = {
                            url: o
                        }
                    }

                    //defaults
                    o.type = o.type || 'GET';
                    o.body = o.body || null;
                    o.requestHeaders = o.requestHeaders || {};

                    var _xhr = new window.XMLHttpRequest();//XHR

                    o.url = !!o.url.match(/:*\/\/+/i) ? o.url : (base + o.url);

                    //initializations
                    _xhr.responseType = o.responseType || 'json';

                    //set URLEncoded body for POST
                    if(o.type.match(/post/i)) {

                        if(!!o.body && !!o.body.jsonRequest) {
                            o.body = {
                                jsonRequest: JSON.stringify(o.body.jsonRequest)
                            }
                        }

                        var urlencoded = [],
                            _len;

                        if(!!o.body && !o.body.length) {
                            var body = o.body;
                            for(var key in body) {
                                if(body.hasOwnProperty(key)) {
                                    var value = body[key];

                                    urlencoded.push(key +'='+ value);
                                }
                            }
                        }
                        _len = urlencoded.length;

                        urlencoded = urlencoded.join('&');

                        o.body = _len > 1 ? urlencoded.slice(0, -1) : urlencoded;

                        o.requestHeaders['Content-Type'] = 'application/x-www-form-urlencoded';
                    }
                    //set JSON body for PUT
                    if(o.type.match(/put/i)) {
                        o.body = JSON.stringify(o.body);
                        o.requestHeaders['Content-Type'] = 'application/json';
                    }

                    _xhr.open(
                        o.type,
                        o.url, true
                    );

                    _xhr.withCredentials = true;

                    if(!!o.requestHeaders) {
                        for(var h in o.requestHeaders) {
                            if(o.requestHeaders.hasOwnProperty(h)) {
                                _xhr.setRequestHeader(h, o.requestHeaders[h]);
                            }
                        }
                    }

                    _xhr.onload = function() {
                        if(this.status == 200 || this.status == 304 || this.status == 301) {

                            var res = this;

                            if(!!res.response && !!Object.prototype.toString.call(res.response).match(/HTMLDocument/i)) {
                                var document = res.response,
                                    body = res.response.body,
                                    _div = document.createElement('div');

                                removeTagList(document.getElementsByTagName('script'));
                                removeTagList(document.getElementsByTagName('iframe'));
                                removeTagList(document.getElementsByTagName('frame'));
                                removeTagList(document.getElementsByTagName('object'));

                                if(body.childNodes.length) {
                                    for(var c in body.childNodes) {
                                        if(body.childNodes.hasOwnProperty(c)) {
                                            var _element = body.childNodes[c];
                                            !!_element && _div.appendChild(_element);
                                        }
                                    }
                                }

                                res.responseHTML = _div;
                                resolve(_div)
                            }

                            if(!!res.response) {
                                var response = res.response;

                                if(response.error < 200 && response.error !== 0) {
                                    reject(new Error(response.error_description))
                                }

                                resolve(response.result)
                            }

                            resolve(res)
                        } else {
                            var error = new Error(this.statusText);
                            error.code = this.status;
                            reject(error);
                        }
                    };

                    _xhr.onerror = function() {
                        reject(new Error('Network connection failed.'))
                    };

                    _xhr.send(o.body);

                    //closure helper
                    function removeTagList(list) {
                        for(var l in list) {
                            if(list.hasOwnProperty(l)) {
                                !!list[l] && list[l].remove();
                            }
                        }
                    }
                })
            }
        };

        function getInstance(collection) {
            var instance = [collection];

            if(!!collection == false) {
                instance = [window.document]
            }

            if(collection.length == 1) {
                instance = [collection[0]];
            }

            return instance
        }
    }

    //implementation
    $nfp.prototype = new rootDataWorker();
    $nfp.prototype.constructor = rootDataWorker;

    return new $nfp(sel)
}

module.exports = $dw;