hw2.include([
    "hw2!{PATH_JS_LIB}class/fSyntax.js" // loading the friendly syntax for class
]).define(function () {
    var $ = this;

    var Name = $.public.abstract.class([
        $.private({
            // type-hinting variables
            "String firstName": "",
            "String middleName": ""
        }),
        // another way to define the type-hint 
        $.private("lastName",$.typeHint("string", "")),
        $.public({
            createName: function (firstName, middleName, lastName) {
                this._i.firstName = firstName;
                this._i.middleName = middleName;
                this._i.lastName = lastName;
            },
            getFirstName: function () {
                return this._i.firstName;
            },
            getMiddleName: function () {
                return this._i.middleName;
            },
            // we're typeHinting the getLastName just for example
            // but it's useless in this case since lastName property
            // is already typeHinted
            "string getLastName": function () {
                return this._i.lastName;
            }
        })
    ]);

    return Name;
});