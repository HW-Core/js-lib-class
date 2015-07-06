hwc.include([
    "hwc!{PATH_JS_LIB}class/fSyntax.js" // loading the friendly syntax for class
]).define(function () {
    var $ = this;
    // use an abstract class that cannot be instanced
    var Animal = $.public.abstract.class([
        $.protected({
            height: null,
            weight: null,
            birthDate: null,
            childrens: 0
        }),
        $.public({
            __construct: function (height, weight, birthDate, childrens) {
                this.i.height = height;
                this.i.weight = weight;
                this.i.birthDate = birthDate;
                this.i.childrens = childrens;
            },
            __destruct: function () {
                // we don't need to delete anything manually
                // in this case
            },
            getHeight: function () {
                return this.i.height;
            },
            setHeight: function (height) {
                this.i.height = height;
            },
            getWeight: function () {
                return this.i.weight;
            },
            setWeight: function (weight) {
                this.i.weight = weight;
            },
            getChildrens: function () {
                return this.i.childrens;
            },
            setChildrens: function (childrens) {
                this.i.childrens = childrens;
            }
        }),
        // if you want define return type via parameter, you can use this syntax
        $.public(Date, "getBirthDate", function () {
            return this.i.birthDate;
        })
    ]);

    return Animal;
});
