__global = typeof window === 'object' ? window : global;

var p = require("path");
var current_path = __dirname || "./";

var kernel_file = current_path + "/../js-kernel/webpack.config.js";
var kernel_module = require(kernel_file);

var hwc_conf = __global.hwc_conf;

hwc_conf.paths.hwc_js_lib_class_index = hwc_conf.path_core + "js-lib-class/index";
hwc_conf.paths.hwc_js_lib_class_include = hwc_conf.path_core + "js-lib-class/include";
hwc_conf.paths.hwc_js_lib_class_class = hwc_conf.path_core + "js-lib-class/Class";
hwc_conf.paths.hwc_js_lib_class_fsyntax = hwc_conf.path_core + "js-lib-class/fSyntax";
hwc_conf.paths.hwc_js_lib_class_bootstrap = hwc_conf.path_core + "js-lib-class/bootstrap";

if (typeof module !== 'undefined' && module.exports) {
    // for nodejs environments
    var exports = kernel_module;

    exports.entry = [
        hwc_conf.paths.hwc_js_lib_class_index + ".js"
    ];

    exports.output = {
        path: current_path + '/dist',
        filename: 'hwc-class.min.js'
    };

    exports.resolve = {
        alias: hwc_conf.paths
    };

    exports.resolveLoader = {
        modules: [
            p.resolve(__dirname, "node_modules"),
            "node_modules"
        ],
    };

    module.exports = exports;
}
