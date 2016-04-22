define([
    "consulApp"
], function (consulApp) {

    consulApp.filter("status", function () {

        return function (status) {
            switch (status) {
                case "0":
                    return "可用";
                case "1":
                    return "不可用";
                default:

            }
        }

    })
});