/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

hw2.exports = function () {
    var $ = this;
    $.Loader.load(["../../../kernel/doc/js/navigation.js"],function() {
        var pages = ["home", "class", "class-friendly", "class-basic", "installation"];
        var nav = new Navigation(pages);
        nav.init();
    });
};