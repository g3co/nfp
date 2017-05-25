;function $dw(sel) {

    'use strict';

    if(!!sel == false) {
        throw new Error('The selector should not be empty')
    }

    //initialization
    function $nfp(sel) {

        function getDOMElement(sel) {
            if(!!Object.prototype.toString.call(sel).match(/Window|HTML/)) {
                return sel
            }

            return document.querySelectorAll(sel)
        }

        var collection = getDOMElement(sel);

        if(!!collection.length) {
            for(var _el in collection) {
                this[_el] = collection[_el];
            }
        } else {//?!
            this[0] = collection;
        }

        this.selector = !!sel.length ? sel : this[0].tagName.toLowerCase();
    }

    //base functionality
    function rootDataWorker() {

        var _el = this[0],//root:Element
            _xhr = new window.XMLHttpRequest();//XHR

        return {

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

            get: function(i) {

                if(!!i == false) {
                    return
                }

                return this[i]
            },

            xhr: function(o) {

            }
        };

        function initXHR(xhr) {

            xhr.upload.addEventListener('progress', function(e) {

                if(e.lengthComputable) {

                }

            }, false);

        }
    }

    //implementation
    $nfp.prototype = new rootDataWorker();
    $nfp.prototype.constructor = rootDataWorker;

    return new $nfp(sel)
}

$dw.prototype = new $dw;