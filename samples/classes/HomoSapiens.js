hwc.include([
    "hwc!classes/Name.js",
    "hwc!classes/Animal.js"
]).define(function (Name, Animal) {
    var $ = this;

    var HomoSapiens = $.public.class.extends(Animal).use(Name)([
        $.public.final.static("gender", {
            m: "male",
            f: "female"
        }),
        $.private("sex", null),
        $.public({
            __construct: function (firstName, middleName, lastName, sex, height, weight, birthDate, childrens) {
                this.__super(height, weight, birthDate, childrens);
                this._i.sex = sex;

                this.i.createName(firstName, middleName, lastName);
            },
            printInfo: function () {
                console.log(
                    this.i.getFirstName() + " " + this.i.getMiddleName() + " " + this.i.getLastName() + "\n",
                    "Sex: " + this._i.sex + "\n",
                    // we can access to protected members here
                    "birthDate: " + this.i.getBirthDate() + "\n",
                    "Height: " + this.i.height + "\n",
                    "Weight: " + this.i.weight + "\n",
                    "Childrens: " + this.i.childrens + "\n"
                    );
            }
        })
    ]);

    return HomoSapiens;
});