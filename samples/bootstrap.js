hwc.include([
    "hwc!classes/HomoSapiens.js"
]).define(function (HomoSapiens) {
    var cDarwin = new HomoSapiens(
        "Charles", "Robert", "Darwin",
        HomoSapiens.gender.m,
        "1.82m",
        "90kg",
        new Date("February 12,1809 00:00:00"),
        10);

    cDarwin.printInfo();
});