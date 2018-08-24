    

 Friendly Class Syntax 
-----------------------

Friendly syntax differentiate from basic since it uses a class definition
that resamble common java/php/c++ syntax.

It just adds a layer above basic class, working as an adapter.

You have to use lowercase "class" properties of hw-core instead of capitalized
"Class" of basic syntax.
    

    

###  How to create a final class: 

    var $ = HWCore; // just an alias of HWCore

    var LastName = $.public.final.class([

        // short-style using args instead of object when only 
        // one method is going to be defined

        $.private("lastName", "Bar"),


        // if you have multiple members with same accessors
        // you can define them passing an object

        $.public({
            getLastName: function () {
                return this.i.lastName;
            },
            setLastName: function (lName) {
                this.i.lastName = lName;
            }
        })
    ]);

    

###  How to create an abstract class: 

    var FirstName = $.public.abstract.class([
        
        $.protected({firstName: "Foo"}), // it is visible from this class and its childs

        $.public("getFirstName", function () {
            return this.i.firstName;
        })
    ]);

###  How to create a class that extends "FirstName" and uses "LastName": 

    var MyName = $.public.final.class.extends(FirstName).use(LastName)([
        //$.private("lastName", "Bar"),

        // multiple member declaration under same public accessor ( C/C++ style )
        $.public({
            __construct: function (firstName, lastName, nickName) {
                this.i.firstName = firstName;
                this.i.setLastName(lastName);
                this._s.nickName = nickName;
            },
            // override method of "FirstName" class to add nickname too
            getFirstName: function () {
                // use magic "__super" to access parent method
                return this.__super() + " ( " + this._s.nickName + " )";
            }
        }),

        // override method of "LastName" trait
        $.public("getLastName", function () {
            return "My last name is: " + this.i.lastName;
        }),

        // it's the type-hinting , you can force data-type for this var
        $.private.static("nickName", $.typeHint("string", "baz")),

        // Another way to define type-hint, compatible with multiple members declaration
        $.protected.final({"Date birthDay": new Date('December 17,1990 03:24:00')}),

        // Yet Another way to define type-hint using parameters ( only for single-member declaration)
        $.public.static(String, "getNickName", function () {
            return this._s.nickName;
        })
    ]);

    var myName = new MyName("Hello", "World", "I'm a Class");

    // you can compare your class instance with its base
    console.log(myName instanceof FirstName); // true


    console.log(myName.getFirstName()); // it prints Hello ( I'm a Class )

    console.log(myName.getLastName()); // it prints "World"

    // access to static members from instance using magic method __st
    console.log(myName.__st.getNickName()); // it prints I'm a Class

    // access to static method directly from class name
    console.log(MyName.getNickName()); // it prints I'm a Class

    

#### Another simple example:

    var Expr = $.public.class(
        $.protected({
            x: undefined,
            y: undefined
        }),
        $.public("__construct", function (x, y) {
            this.i.x = x;
            this.i.y = y;
        }),
        $.public.final({
            sum: $.typeHint(Number, function () {
                return this.i.x + this.i.y;
            })
        })
    );

    console.log(new Expr(2, 2).sum()); // 4