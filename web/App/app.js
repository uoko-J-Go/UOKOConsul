
define([
    "angular",
    "angularAnimate",
    "angularUIRouter",
    "angularUiBootstrap"
], function (angular, angularRoute) {

    var app = angular.module("consulApp", [
        "ngAnimate","ui.router","ui.bootstrap"
    ]);
    var apiBaseAddress="http://127.0.0.1:8500";
    app.config(['$stateProvider', '$urlRouterProvider','$httpProvider', function($stateProvider, $urlRouterProvider,$httpProvider) {
    /*Http请求处理*/ 
    $httpProvider.interceptors.push('apiBaseAddressHandler');
    /*Http请求处理 */  
    /*路由配置 */ 
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('home', {
            url:'/',
            templateUrl: 'App/views/home.html',
            controller: function($scope,$rootScope) {
               $rootScope.headTitle= "首页";
            }
        });
    
     $stateProvider.state('services', {
            url:'/services',
            templateUrl: 'App/views/service/list.html',
            controller:"ServicesController"
        });
    /*路由配置 */   
    }]);
    /**拦截器 */
     app.factory('apiBaseAddressHandler', function () {
        return {
            request: function (config) {
                if (!/https?:\/\/(.*?)+/.test(config.url)&&config.url.indexOf("v1/") >= 0) {
                    config.url = apiUrl + config.url;
                }
                return config;
            }
        };
    });
    /**拦截器 */
    return app;

});