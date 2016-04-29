

require.config({
    paths: {
        //ng
        angular: "../Assets/plugins/angular/angular",
        angularAnimate: "../Assets/plugins/angular/angular-animate.min",
        angularUIRouter:"../Assets/plugins/angular-ui/angular-ui-router.min",
        angularUiBootstrap: "../Assets/plugins/angular-ui/ui-bootstrap-tpls-1.3.2.min",
        

        //plugin
        jquery: "../Assets/plugins/jquery/jquery-1.12.3.min",
        underscore:"../Assets/plugins/underscore/underscore-min",
        bootstrap: "../Assets/plugins/bootstrap/js/bootstrap.min",
        layer: "../Assets/plugins/layer/layer",
        ztree:"../Assets/plugins/ztree/js/jquery.ztree.all.min",
        base64:"../Assets/plugins/base64/base64.min",
        //js
        consulApp: "app",
        common: "../Assets/js/common",
        
        //controller
        MainController:"controllers/MainController",
        ServicesController:"controllers/ServicesController",
        NodesController:"controllers/NodesController",
        ConfigCenterController:"controllers/ConfigCenterController",
    },
    shim: {
        "angular": { deps: ["jquery"], exports: "angular" },

        "angularAnimate": ["angular"],
        "angularUIRouter": ["angular"],
        "angularUiBootstrap": ["angular"],
        "underscore": ["jquery"],
        "bootstrap": ["jquery"],
        "layer": ["jquery"],
        "common": ["jquery"]
    },
    priority: [
        "angular", "jquery"
    ],
    urlArgs: "v=" + (new Date()).getTime()  //开发阶段不使用  方便调试
});


require([
    "jquery",
    "angular",
    "bootstrap",
    "underscore",
    "common",
    "consulApp",
    "MainController",
    "ServicesController",
    "NodesController",
    "ConfigCenterController"
], function (jquery, angular) {
    jquery(function () {
        angular.bootstrap(document, ["consulApp"]);
    });
});