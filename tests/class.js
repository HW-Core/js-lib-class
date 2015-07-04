hwc.defTests(function () {
    var $ = this;

    describe('Class', function () {

        var nativeClass = (function () {
            function __Class () {

            }

            __Class.prototype.pubTest = function () {
                return "test";
            };

            __Class.pubStTest = function () {
                return "stTest";
            };

            return __Class;
        })();


        // CREATE A FINAL CLASS
        var FinalCl = $.Class({type: "final", members: [
                {
                    name: "test", val: function () {
                        return "t";
                    }
                },
                {
                    name: "test2", val: function () {
                        return "t2";
                    }
                },
                {
                    name: "test3", val: function () {
                        return "t3";
                    }
                }
            ]});

        var Trait = $.Class({type: "final", members: [
                {
                    a: "private", r: "Number", n: "intVal", v: 3
                },
                {
                    a: "protected", n: "__construct", v: function () {
                        //return this.__super();
                    }
                },
                {
                    a: "public static", n: "getInstance", v: function () {
                        return new this.s();
                    }
                },
                {
                    n: "test2", v: function () {
                        return "t2-trait+" + this._i.privVar;
                    }
                },
                {
                    n: "getIntVal", v: function () {
                        return this._i.intVal;
                    }
                }
            ]});

        var Trait2 = $.Class({type: "final", members: [
                {
                    a: "private", r: "Number", n: "intVal", v: 4
                },
                {
                    n: "getIntVal", v: function () {
                        return this._i.intVal;
                    }
                },
                {
                    n: "getStringVal", r: "string", v: function () {
                        return "this is a string";
                    }
                }
            ]});

        // CREATE AN ABSTRACT CLASS ( with short keys )
        var AbstractCl = $.Class({
            base: $.Object,
            type: "abstract",
            members: [
                {
                    a: "public", n: "pubVar", v: "a public var"
                },
                {
                    a: "protected", n: "objList", v: []
                },
                {
                    a: "private", n: "abstractPrivVal", v: "a private value"
                },
                {
                    a: "public", n: "getPubVar", v: function () {
                        return this.i.pubVar;
                    }
                },
                {
                    a: "public", n: "getAbsPrivVal", v: function () {
                        return this._i.abstractPrivVal;
                    }
                },
                {
                    a: "private", n: "privMethod", v: function () {
                        return "privMethod";
                    }
                },
                {
                    a: "protected", n: "test1", v: function () {
                        return "t1";
                    }
                },
                {
                    n: "test5", v: function () {
                        return "t4";
                    }
                }
            ]
        });

        var SimpleCl = $.Class({base: AbstractCl, use: [FinalCl, Trait], members: [
                {
                    a: "public", n: "__construct", v: function () {
                        this.i.objList = [];
                    }
                },
                {
                    n: "cleanList", v: function () {
                        return this.i.objList = [];
                    }
                }
            ]});

        var toDestroy = {};

        // CREATE A FULL CLASS
        var FullCl = $.Class({base: AbstractCl, use: [FinalCl, Trait, Trait2], members: [
                {
                    name: "__construct",
                    val: function () {
                        //return this.__super();
                    },
                    attributes: "public"
                },
                {
                    name: "__destruct",
                    val: function () {
                        toDestroy = null;
                        this.__super();
                    },
                    attributes: "public"
                },
                {
                    name: "testScopeConflict",
                    val: function () {
                        this.i.objList = ["a", "b", "c"];
                        var a = this.i.objList[2];
                        new SimpleCl().cleanList();
                        return this.i.objList[2];
                    },
                    attributes: "public"
                },
                {
                    a: "public", n: "getPubVar", v: function () {
                        return this.__super();
                    }
                },
                {
                    name: "privMethod",
                    val: function () {
                        return "it's private";
                    },
                    attributes: "private"
                },
                {
                    name: "privStaticMethod",
                    val: function () {
                        return "it's private and static";
                    },
                    attributes: ["static", "private"] // using array instead space
                },
                {
                    name: "privVar",
                    val: true,
                    attributes: "private"
                },
                {
                    name: "protectedVar",
                    val: "i'm protected",
                    attributes: "protected"
                },
                {
                    name: "protectedStatic",
                    val: "i'm protected static",
                    attributes: "protected static"
                },
                {
                    name: "getProtectedVar",
                    val: function () {
                        return this.i.protectedVar + "-" + this.s.getProtectedStatic();
                    },
                    attributes: "public"
                },
                {
                    name: "getProtectedStatic",
                    val: function () {
                        return this.s.protectedStatic;
                    },
                    attributes: "protected static"
                },
                {
                    a: "public", n: "setProtectedVar", v: function (val) {
                        this.i.protectedVar = val;
                    }
                },
                {
                    a: "public", n: "setProtectedStatic", v: function (val) {
                        this.i.protectedStatic = val;
                    }
                },
                {
                    // overwrite FinalCl class method
                    name: "test3",
                    val: function () {
                        return this._i.privMethod();
                    }
                },
                {
                    name: "test4",
                    val: function () {
                        return this._s.privStaticMethod();
                    },
                    retType: "string"
                },
                {
                    name: "test5",
                    val: function () {
                        return this.__super();//this.__s.privStaticMethod() + this.pub_i.test3();
                    },
                    attributes: "public"
                },
                {
                    a: "private", n: "InternalClass", v: $.class.extends(SimpleCl)([
                        $.public({
                            testLimitedAccess: function () {
                                return this.i.protectedVar + " " + this._i.privVar;
                            }
                        })
                    ])
                },
                {
                    a: ["public", "static"], n: "InternalStClass", v: $.class.extends(AbstractCl)([
                        $.public({
                            createInternalClass: function () {
                                return new this._i.InternalClass();
                            },
                            testLimitedAccess: function () {
                                return this.i.protectedVar + " " + this._i.privVar;
                            }
                        })
                    ])
                },
                {
                    a: ["public", "static"], n: "AnonymousClass", v: function () {
                        return $.class([
                            $.public({
                                testPriv: function () {
                                    return this._i.privVar;
                                },
                                testProt: function () {
                                    return this.i.protectedVar;
                                }
                            })
                        ]);
                    }
                }
            ]
        });

        var GChild = $.class.extends(FullCl).define(
            );

        // CREATE AN EMPTY CLASS
        var EmptyCl = $.Class();

        /*
         * Create some classes using c-like style
         * 
         */
        var StClass = $.static.class(
            // short declaration with single member
            $.public.static("test2", function () {
                return this._s.foo();
            }),
            $.public.static.final({
                hello: "world",
                how: $.typeHint(String, "how"),
                test: function () {
                    return this._s.foo();
                }
            }),
            $.private.static({
                foo: function () {
                    return "hey";
                },
                bar: function () {
                    return "wow";
                }
            })
            );

        var NumericCl = $.public.class(
            $.protected({
                "Number x": undefined,
                "Number y": undefined
            }),
            $.public("__construct", function (x, y) {
                this.i.x = x;
                this.i.y = y;
            }),
            $.public.final(Number, "add", function () {
                return this.i.x + this.i.y;
            })
            );

        var Template = $.class(
            $.private({
                selector: null,
                html: null,
                css: null
            }),
            $.public({
                nullVal: null,
                falseVal: false,
                undefinedVal: undefined,
                zeroVal: 0,
                __construct: function (selector, html, css) {
                    this._i.selector = selector;
                    this._i.html = html;
                    this._i.css = css;
                },
                getHtml: function () {
                    return this._i.html;
                },
                getCss: function () {
                    return this._i.css;
                },
                getSelector: function () {
                    return this._i.selector;
                }
            }));

        var Singleton = $.class([
            $.public({
                getValue: function () {
                    return this._i.value;
                }
            }),
            $.private({
                value: null,
                __construct: function () {
                    this._i.value = "test";
                }
            }),
            $.private.static({
                instance: null
            }),
            $.public.static({
                I: function () {
                    if (!this.s.instance)
                        return this.s.instance = new this.s();

                    return this.s.instance;
                }
            })
        ]);


        var Name = $.public.abstract.class(
            $.private({
                name: null
            }),
            $.public({
                getName: function () {
                    return this._i.name;
                },
                setName: function (name) {
                    this._i.name = name;
                }
            })
            );

        // classes from documentation
        var LastName = $.public.final.class.extends(Name)(
            // short-style using args instead of object when only 
            // one method is going to be defined

            $.private("lastName", $.typeHint("string", "Bar")),
            // if you have multiple members with same accessors
            // you can define them passing an object

            $.public({
                "String getLastName": function () {
                    return this.i.getName();
                },
                setLastName: function (lName) {
                    return this.i.setName(lName);
                }
            })
            );

        var FirstName = $.public.abstract.class.extends(Name)(
            $.protected({firstName: "Foo"}), // it is visible from this class and its childs


            $.public("getFirstName", function () {
                return this.i.firstName;
            })
            );

        // use LastName class as a "trait" and extends FirstName
        var MyName = $.public.final.class.extends(FirstName).use(LastName)(
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
                return "My last name is: " + this.__super();
            }),
            // it's the type-hinting , you can force data-type for this var
            $.private.static("nickName", $.typeHint("string", "baz")),
            // Another way to define type-hint, compatible with multiple members declaration
            $.protected.final({"Date birthDay": new Date('December 17,1990 03:24:00')}),
            // Yet Another way to define type-hint using parameters ( only for single-member declaration)
            $.public.static(String, "getNickName", function () {
                return this._s.nickName;
            }));

        // RUN TESTS

        describe('constructor', function () {
            it('should create the instance', function () {
                assert.typeOf(new EmptyCl(), "object", "Class not created");
                assert.typeOf(new FinalCl(), "object", "Class not created");
            });
        });

        describe('vars', function () {
            it('variable should have correct values', function () {
                var tmpl = new Template();
                var final = new FullCl();
                assert.ok(tmpl.nullVal === null, "nullValue is not null");
                assert.ok(tmpl.falseVal === false, "falseVal is not false");
                assert.ok(tmpl.undefinedVal === undefined, "undefinedVal is not undefined");
                assert.ok(tmpl.zeroVal === 0, "zeroVal is not zero");
                assert.ok(final.testScopeConflict() === "c", "there's a conflict with scopes");
                assert.ok(final.getPubVar() === "a public var", "can't we access to public var?");
            });
        });

        describe('inheritance', function () {
            it('should be respected the vertical inheritance', function () {
                assert.ok(GChild.__isChildOf(AbstractCl), "should be a prototype of AbstractCL");
                assert.ok(GChild.__isChildOf(FullCl), "should be also a prototype of FullCl");
                assert.notOk(GChild.__isChildOf(FinalCl), "should not be also a prototype of FinalCl");
                assert.instanceOf(new GChild(), AbstractCl, "should be an instance of AbstractCL");
                assert.instanceOf(new GChild(), FullCl, "should also be an instance of FullCl");
                assert.notInstanceOf(new GChild(), FinalCl, "should not be an instance of FinalCl");
            });
        });

        describe('abstract constructor', function () {
            it('abstract class should not be instantiated', function () {
                assert.throw(function () {
                    new AbstractCl();
                }, Error, "Abstract class may not be constructed");
            });
        });

        describe('final', function () {
            it('final class cannot be extended', function () {
                assert.throw(function () {
                    var c = $.Class({base: FinalCl});
                    new c;
                }, Error, "final class cannot be extended!");
            });

            it('final class cannot be dynamically changed', function () {
                assert.throw(function () {
                    var f = new FinalCl();
                    f.newMethod = function () {
                        alert("created");
                    };
                    f.newMethod();
                }, Error);
            });
        });

        describe('extend abstract', function () {
            it('abstract class must be extended', function () {
                var c = $.Class({base: AbstractCl, members: [
                        {
                            // overwrite AbstractCl class method
                            name: "test1",
                            val: function () {
                                return this.__super() + "t1plus";
                            },
                            attributes: "public"
                        }
                    ]});
                c = new c();
                assert.ok(c.getAbsPrivVal() === "a private value", "get method returns abstract value");
                assert.ok(c.test1() === "t1t1plus", "test method returns t1t1plus calling __super");
                assert.instanceOf(c, AbstractCl, 'class is an instance of AbstractCl');
            });
        });

        describe('instantiate FullCl', function () {
            it('should be created successfully', function () {
                var c = new FullCl();
                assert.instanceOf(c, AbstractCl, "FullCl is an instance of AbstractCl");
                assert.notInstanceOf(c, FinalCl, "FullCl isn't an instance of FinalCl");
                console.log(c.test2());
                assert.ok(c.test2() === "t2-trait+true", "Trait.test2 should override Final.test2 because of LIFO ordering");
            });
        });

        describe('private members', function () {
            it('private members shouldn\'t be visible', function () {
                var c = new FullCl();
                assert.ok(c.test3() === "it's private", "private var should be accessible from internal");
                assert.ok(c.test4() === "it's private and static", "private static var should be accessible from internal");
                assert.typeOf(c.privMethod, "undefined", "private method must be undefined");
                assert.typeOf(c.privVar, "undefined", "private member must be undefined");
                assert.typeOf(c._s, "undefined", "private __s accessor must be undefined");
            });
        });

        describe('protected members', function () {
            it('protected members shouldn\'t be visible outside', function () {
                var c = new FullCl();
                assert.throw(function () {
                    c.protectedVar;
                }, Error, "Cannot access protected property");

                assert.throw(function () {
                    FullCl.getProtectedStatic();
                }, Error, "Cannot access protected property");

                assert.throw(function () {
                    FullCl.protectedStatic;
                }, Error, "Cannot access protected property");

                c.setProtectedVar("changed protected");
                assert.ok(c.getProtectedVar() === "changed protected-i'm protected static", "should return the protected value");
                c.setProtectedVar("new change"); // to test protected redefinition
                assert.ok(c.getProtectedVar() === "new change-i'm protected static", "should return the protected value");
            });
        });

        describe('restrictive constructors', function () {
            it('private constructor', function () {
                assert.throw(function () {
                    new Trait();
                }, Error, "Cannot access protected property");
                assert.instanceOf(Trait.getInstance(), Trait, "getInstance should return an instance of Trait");
            });
        });


        describe('destruct', function () {
            it('should destruct instance without errors', function () {
                assert.ok(toDestroy !== null, "shouldn't be null");
                var c = new FullCl();
                c.__destruct(); // assignment is required on production: c=c.__destruct();
                //assert.typeOf(c.__isClass, "undefined", "all methods should be deleted");
                assert.ok(toDestroy === null, "should be nullified");
            });
        });

        describe('numeric class', function () {
            it('should instantiate and call methods without errors', function () {
                assert.ok(new NumericCl(3, 4).add() === 7, "should return 7");
                assert.ok(new NumericCl(10, 1).add() === 11, "should return 11");
            });
        });

        describe('template class', function () {
            it('method of other classes defined before shouldn\'t be unexpectedly inherited', function () {
                assert.typeOf(new Template().add, "undefined", "add method should be undefined");
            });
            it('should instantiate and call methods without errors', function () {
                var tmpl1 = new Template("#div1", "page.html", "page.css");
                var tmpl2 = new Template("#div2", "page2.html", "page2.css");
                assert.ok(tmpl1.getHtml() === "page.html", "should return page.html");
                assert.ok(tmpl2.getCss() === "page2.css", "should return page2.css");
            });
        });

        describe('styled static class', function () {
            it('shouldn\'t be instantiated but can call methods without errors', function () {
                assert.throw(function () {
                    new StClass();
                }, Error, "Static class may not be instantiated");
                assert.ok(StClass.test() === "hey", "should return hello");
            });
        });

        describe('test singleton', function () {
            it('should create the singleton', function () {
                var s = Singleton.I();
                assert.instanceOf(s, Singleton, "should be an instance of Singleton");
                assert.ok(s.getValue() === "test", "getValue should return test");
            });
        });

        describe('test inner classes', function () {
            var iSt = new GChild.InternalStClass();
            it('should instantiate internal classes', function () {
                assert.instanceOf(iSt, GChild.InternalStClass, "should be an instance of FullCl.InternalStClass");
            });

            /*var i = iSt.createInternalClass();
             
             it('should respect the visibility', function () {
             assert.ok(i.testLimitedAccess() === "i'm protected true", "should be able to access private and protected outer properties");
             assert.ok(iSt.testLimitedAccess() === "i'm protected true", "should be able to access private and protected outer properties");
             }); */

            var a = new (GChild.AnonymousClass());

            it('should create anonymous class', function () {
                assert.ok(a.__isClass, "This should be a class");
                assert.typeOf(a.testPriv(), "undefined", "private method shouldn't be accessed by inner anonymous class");
                assert.typeOf(a.testProt(), "undefined", "protected method shouldn't be accessed by inner anonymous class");
            });
        });

        describe('test class wrapper', function () {
            it('should wrap a native class', function () {
                var cl = $.Class(nativeClass);
                assert.ok(cl.pubStTest() == "stTest", "should return stTest");
                var inst = new cl();
                assert.ok(inst.pubTest() == "test", "should return Test");
            });
        });

        describe('test some friendly-style class', function () {
            it("we shouldn't have any exception in declaration, definition and instantiation", function () {
                var myName = new MyName("Hello", "World", "I'm a Class");

                var myFirstName = myName.getFirstName();

                assert.ok(myName.getName() === "World", "myName.getName() returns uncorrect value");
                assert.ok(myFirstName === "Hello ( I'm a Class )", "myFirstName contains uncorrect value");
                assert.ok(myName.getLastName() === "My last name is: World", "myName.getLastName() returns uncorrect value");
            });
        });

        describe('some deeper Trait tests', function () {
            it('should call trait methods without errors', function () {
                var cl = new FullCl();
                assert.ok(cl.getStringVal() == "this is a string", "should return the correct string");
                assert.ok(cl.getIntVal() == 4, "should return 4");
            });
        });

        describe('test typeHint feature', function () {
            it('should correctly handle type-hinting', function () {
                assert.throw(function () {
                    new NumericCl("a", "b");
                }, Error, "Incompatible type: string , excepted Number");

                var myName = new MyName("Hello", "World", "I'm a Class");
                assert.throw(function () {
                    myName.setLastName(1);
                    myName.getLastName();
                }, Error, "Incompatible type: number , excepted String");
            });
        });
    });

});