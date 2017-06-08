;function $dw(sel) {

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

        this.selector = !!s ? !!s.length ? s : this[0].tagName.toLowerCase() : '';
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

                var _el = this[0] || window.document;

                return _el.querySelectorAll(s)
            },

            //add event
            on: function(et, foo, o) {
                if(!!et == false || !!foo == false) {
                    return
                }

                if(!!Object.prototype.toString.call(foo).match(/Function/) == false) {
                    return
                }

                var target = this[0] || window.document;
                target.addEventListener(et, foo, o);

                return this
            },

            //dispatch event
            off: function(et, foo) {
                var target = this[0] || window.document;
                target.removeEventListener(et, foo);

                return this
            },

            //add an event and dispatch it after
            once: function(et, foo, o) {
                if(!!et == false || !!foo == false) {
                    return
                }

                if(!!Object.prototype.toString.call(foo).match(/Function/) == false) {
                    return
                }

                var target = this[0] || window.document;
                target.addEventListener(et, onceFiring);

                function onceFiring(e) {
                    target.removeEventListener(et, onceFiring);
                    foo(e);
                }

                return this
            },

            //pass event
            trigger: function(et, o, custom) {
                if(!!et == false) {
                    return
                }

                o = !!o ? {detail: o} : null;

                custom = !!custom && custom !== false ? !!custom : true;

                var _event = custom ? new CustomEvent(et, o) : new Event(et, o);
                var target = this[0] || window.document;
                target.dispatchEvent(_event);

                return this
            },

            //make an AJAX request
            request: function(o) {

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

                    var _xhr = new window.XMLHttpRequest();//XHR

                    //initializations
                    _xhr.responseType = o.responseType || 'json';

                    //set JSON body for POST
                    if(o.type.match(/post/i)) {
                        o.body = JSON.stringify(o.body);

                        o.requestHeaders = o.requestHeaders || {};

                        o.requestHeaders['Content-Type'] = 'application/json; charset=utf-8';
                    }

                    _xhr.open(
                        o.type,
                        o.url, true
                    );

                    if(!!o.requestHeaders) {
                        for(var h in o.requestHeaders) {
                            if(o.requestHeaders.hasOwnProperty(h)) {
                                _xhr.setRequestHeader(h, o.requestHeaders[h]);
                            }
                        }
                    }

                    _xhr.onload = function() {
                        if(this.status == 200) {
                            resolve(this);
                        } else {
                            var error = new Error(this.statusText);
                            error.code = this.status;
                            reject(error);
                        }
                    };

                    _xhr.onerror = function() {
                        reject(new Error('Network connection failed.'))
                    };

                    console.log('Body: %o', o.body);

                    _xhr.send(o.body);

                })
            }
        };
    }

    //implementation
    $nfp.prototype = new rootDataWorker();
    $nfp.prototype.constructor = rootDataWorker;

    return new $nfp(sel)
}

$dw.prototype = new $dw();
var $ = $dw();