/*
 * Copyright (C) 2007 - 2014 Hyperweb2 All rights reserved.
 * GNU General Public License version 3; see www.hyperweb2.com/terms/
 */

'use strict';
var hwc_conf = typeof window === 'object' ? window.hwc_conf : global.hwc_conf;

hwc_conf.paths.hwc_js_lib_class_fsyntax = hwc_conf.path_core + "js-lib-class/fSyntax";
requirejs.config({paths: hwc_conf.paths});

define([
    "hwc_js_lib_class_fsyntax"
],function ($) {
    return $;
});