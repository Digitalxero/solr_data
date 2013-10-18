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
        config:{}
    };

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

    _private.listeners = {
        setup: function setup() {

        }
    };

    _private.selectors = {
        base: '.solr_data'
    };

    //Init on DOM ready
    $(_private.init);
}(jQuery));
