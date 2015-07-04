/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

// list of test files
hwc.define(function () {
    var $ = this;
    return {
        dep: [
            $.const.PATH_JS_LIB + "class/index.js"
        ],
        test: [
            $.const.PATH_JS_LIB + "class/tests/tests/class.js",
        ]
    };
});
