
define([
    "angular",
    "angularAnimate",
    "angularUIRouter",
    "angularUiBootstrap"
], function (angular, angularRoute) {

    var app = angular.module("consulApp", [
        "ngAnimate","ui.router","ui.bootstrap"
    ]);

    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
            url:'/',
            templateUrl: 'App/views/home.html',
            controller: function($scope,$rootScope) {
               $rootScope.headTitle= "首页";
            }
        });
    
     $stateProvider.state('services', {
            url:'/',
            templateUrl: 'App/views/service/list.html',
            controller:"ServicesController"
        });
        
    }]);

    return app;

});