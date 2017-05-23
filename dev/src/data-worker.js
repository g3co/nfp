function dataWorker(sel) {

    if(!!sel == false) {
        throw new Error('The selector should not be empty')
    }

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

    function rootDataWorker() {
        return {
            add: function(s) {
                console.log('Object: %o', this);
                console.log( s )
            }
        };
    }

    //implementation
    $nfp.prototype = new rootDataWorker();
    $nfp.prototype.constructor = rootDataWorker;

    return new $nfp(sel)
}

dataWorker.prototype = new dataWorker;