var HWCore = require("../hwcore/modules/js/src/kernel/index.js")();

hwc.include([
    "hwc!{PATH_JS_LIB}class/index.js"
]).defineFn(function () {
    var $ = this;
    /**
     * check if Class library is loaded ( It must be so )
     */
    if ($.Class) {
        console.log("\033[32m", "== Class library loaded! ==", "\x1b[0m");
    }
});

console.log("\033[34m", "It's an example file of how-to include jsclass in your project ( this is the same approach of browser ), please check file sources!", "\x1b[0m");