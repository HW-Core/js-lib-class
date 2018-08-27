 == [Class](https://github.com/hw-core/js-library-class/blob/master/Class.js) ==

## Getting started: Include JSClass library in your project

### Method 1: all-in-one minified bundle

Note: This kind of usage is the easies but breaks the modularity of hw-core framework. 
If you are really sure that you need this library only from hw-core collection, then this method is recommended

**Browser**

    <script src="path-to-minified-file/hwc-class.min.js"><script>
    
**Nodejs**

    var hwc=require("path-to-minified-file/hwc-class.min");

### Method 2: Modular loading

You've to configure your environment to run HWCore framework and then load the js-lib-class module ( take a look at kernel [documentation](https://github.com/hw-core/js-kernel) )

## Work with classes

After you've configured your environments, Your are ready to work with classes!

There are 2 ways to define a class:

[Basic syntax](#class-basic) ( faster performance but verbose and a little more complex )

[Friendly syntax](#class-friendly) ( slower performance but less verbose and very friendly )

This is an example using friendly syntax. Use links above for more details.  

![Code](https://lh4.googleusercontent.com/-Aq5KBz3V5f8/VH4u116weHI/AAAAAAAAAeQ/jch0BxfyEzU/w901-h692-no/js-class-typehint.png) 

### Current supported features

*   **Abstract class:** Cannot be instantiated
*   **Static class:** A class that has only static members and cannot be instantiated
*   **Final class:** Cannot be extended
*   **Base/Extension:** your object inherits all methods of extended class and they shares
        prototype that allows you to cast the instanceof succesfully
    
*   **Use:** it's the mechanism of traits used also by other languages 
        that enables horizontal composition of behavior. in few words: 
        you can use methods from other objects. 
    


*   **Protected members:** accessible only from its original class and childs
*   **Private members**
*   **Public members**

*   **Static members**
*   **Final members:** its value cannot be changed
*   **Type-hinted members**

### Work in progress features

*   Abstract methods
*   methods override
*   extend support for inner/nested classes
*   Friend class: [wikipedia](http://en.wikipedia.org/wiki/Friend_class)
*   Interfaces and templates to consider

### Reserved words and "magic" methods

All magic methods starts with __ prefix, so don't use this prefix for your variables name

 **Class public instance methods:**

*   __isClass
*   __construct: called at class instantiation
*   __destruct: this is just a pattern that calls all destroyers in chain. 
        It's not called at GC object deletion. It's not possible with javascript at the moment
*   __st: to call static methods from an instance
*   __inherit
*   __addMembers

 **Class public static methods**

*   __isClass
*   __getBase
*   __isChildOf
*   __addMembers
*   __getMembers
*   __isAbstract
*   __isStatic
*   __isFinal

 **Class methods scope reserved variables**

*   this.i : to access public/protected instance members
*   this.s : to access public/protected static members
*   this._i : to access private instance members
*   this._s : to access private static members
*   this.__super : to call parent method
*   this.__scope : the scope of function, internally used 

### Some class examples can be found here:

*   [Sample files](https://github.com/hw-core/js-library-class/tree/gh-pages/samples)
*   [Test file](https://github.com/hw-core/js-library-class/blob/tests/tests/class.js)
