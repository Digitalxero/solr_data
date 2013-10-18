/**
The MIT License (MIT)

Copyright (c) 2013 Dj Gilcrease <digitalxero@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
/* jshint strict: true, undef: true, unused: true */
/* global window: true, browser: true, document: true, jQuery: true, JSON: true */

 (function filter_base($) {
    "use strict";

    var _private = {
        config:{
            solr: {
                indent: 'off',
                hl: 'off',
                facet: false,
                version: 2.2,
                wt:'json',
                fl:'*,score',
                start:0,
                rows:1000,
                sort:'score desc'
            },
            escaped: [
                [/%20/g, ' '],
                [/%28/g, '('],
                [/%29/g, ')'],
                [/%5B/g, '['],
                [/%5D/g, ']'],
                [/%7B/g, '{'],
                [/%7D/g, '}'],
                [/%5C/g, '\\'],
                [/%7C/g, '|']
            ]
        }
    };

    // Ajax queue, this will abort old requests so they dont get processed
    // and ensure proper order if people activate filters quickly
    _private.ajax = $.manageAjax.create(Math.uuidFast(), {
        queue: 'clear',
        abortOld: true,
        maxRequests: 1
    });

    _private.init = function init() {
        _private.dom.setup();
        _private.events.setup();
        _private.listeners.setup();
    };

    _private.dom = {
        setup: function setup() {
            var $base = $(_private.selectors.base);
            _private.config.storage_key = $base.attr('data-storage-key');
            _private.config.channel = $base.attr('data-channel');
            _private.config.url = $base.attr('data-url');
            _private.config.plugin = $base.attr('data-dal-plugin');
            _private.config.solr.rows = $base.attr('data-limit') || 1000;
            _private.config.solr.sort = $base.attr('data-default-sort') || 'score desc';
            _private.config.solr.facet = $base.attr('data-filter-type') == 'facet';
        }
    };

    _private.events = {
        setup: function setup() {
            $(window).on('unload', _private.events.cleanup);
        },
        cleanup: function cleanup() {
            for (var obj in _private) {
                if (_private.hasOwnProperty(obj)) {
                    _private[obj] = null;
                }
            }
        }
    };

    _private.solr = {

    }

    _private.listeners = {
        setup: function setup() {
            var chan = _private.config.channel + '.dal.';
            $.pubsub.subscribe(chan + 'query', _private.listeners.query);
            $.pubsub.subscribe(chan + 'sort', _private.listeners.sort);
            $.pubsub.subscribe(chan + 'chunk', _private.listeners.chunk);

            //Internal communication
            $.pubsub.subscribe('solr_data.dal.build_query', _private.listeners.internal.build_query);
        },
        query: function query() {

        },
        sort: function sort() {

        },
        chunk: function chunk() {

        },
        internal: {
            build_query: function(topic, deferred, query_object) {
                var query = _private.build_query(build_query);
                if(query) {
                    deferred.resolve(query);
                } else {
                    deferred.reject();
                }
            }
        }
    };

    _private.selectors = {
        base: '.solr_data'
    };

    //Init on DOM ready
    $(_private.init);
}(jQuery));
