var p = require("path");
var current_path = __dirname || "./";

var kernel_file = current_path + "/../js-kernel/webpack.paths.js";

global.hwc_conf = require(kernel_file);

hwc_conf.paths.hwc_js_lib_class_index = hwc_conf.path_core + "js-lib-class/index";
hwc_conf.paths.hwc_js_lib_class_include = hwc_conf.path_core + "js-lib-class/include";
hwc_conf.paths.hwc_js_lib_class_class = hwc_conf.path_core + "js-lib-class/Class";
hwc_conf.paths.hwc_js_lib_class_fsyntax = hwc_conf.path_core + "js-lib-class/fSyntax";
hwc_conf.paths.hwc_js_lib_class_bootstrap = hwc_conf.path_core + "js-lib-class/bootstrap";

module.exports = hwc_conf;