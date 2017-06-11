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
                            }

                            resolve(res);
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

$dw.prototype = new $dw();
var $ = $dw();