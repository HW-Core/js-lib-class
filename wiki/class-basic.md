 

 Basic Class Syntax 
--------------------

   

####  Note you can use a shorten version of members definitions that is the following:
            {
                // in order: 
                // attributes, return type, property name, property value
                a: "protected static", r: "string", n: "myFunc",v: function() { 
                    return "sample string";
                }
            },
            
But in following examples we will use the full syntax for a better understanding
       

###  How to create an abstract class: 

    var $ = HWCore; // just an alias of HWCore

    var FirstName = $.Class({
        // specify class modifiers
        // it can also be a string separated by spaces: "public abstract"
        // NOTE: public could also be omitted in this case
        type: ["public", "abstract"],
        members: [
            {
                name: "firstName",
                val: "Foo",
                attributes: "protected"
            },
            {
                name: "getFirstName",
                val: function () {
                    return this.i.firstName;
                },
                attributes: "public"  // you could omit , public is default
            }
        ]});

###  How to create a final class: 

    var LastName = $.Class({type: "final", members: [
            {
                name: "lastName",
                val: "Bar",
                attributes: "private"
            },
            {
                name: "getLastName",
                val: function () {
                    return this.i.lastName;
                }
            },
            {
                name: "setLastName",
                val: function (lName) {
                    this.i.lastName = lName;
                }
            }
        ]});

###  How to create a class that extends "FirstName" and use "LastName": 

    var MyName = $.Class({
        type: "final",
        base: FirstName,
        use: LastName, // it can be also an array of classes
        members: [
            {
                name: "nickName",
                val: "baz",
                retType: String,  // it's the type-hinting , you can force data-type for this var
                attributes: ["private", "static"] // you can also use a space-separated string
            },
            {
                name: "__construct",
                val: function (firstName, lastName, nickName) {
                    this.i.firstName = firstName;
                    this.i.setLastName(lastName);
                    this._s.nickName = nickName;
                },
                attributes: "public"
            },
            {
                // override FirstName method to add nickname too
                name: "getFirstName",
                val: function () {
                    return this.__super() + " ( " + this._s.nickName + " )";
                }
            },
            {
                name: "getNickName",
                val: function () {
                    return this._s.nickName;
                },
                attributes: ["public", "static"],
                retType: "string" // you can force a specified data-type to be returned
            }
        ]});

    var myName = new MyName("Hello", "World", "I'm a Class");

    // you can compare your class instance with its base
        console.log(myName instanceof FirstName); // true

        console.log(myName.getFirstName()); // it prints Hello ( I'm a Class )

        console.log(myName.getLastName()); // it prints "World"

    // access to static members from instance using magic method __st
        console.log(myName.__st.getNickName());  // it prints I'm a Class

    // access to static method directly from class name
        console.log(MyName.getNickName()); // it prints I'm a Class