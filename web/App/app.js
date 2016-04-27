
define([
    "angular",
    "angularAnimate",
    "angularUIRouter",
    "angularUiBootstrap"
], function (angular, angularRoute) {

    var app = angular.module("consulApp", [
        "ngAnimate","ui.router","ui.bootstrap"
    ]);
    app.config(['$stateProvider', '$urlRouterProvider','$httpProvider', function($stateProvider, $urlRouterProvider,$httpProvider) {
    /*Http请求处理*/ 
    //$httpProvider.interceptors.push('HttpProviderInterceptor');
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
     * @param {Object} obj
     * @return {String}
     */ 
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
        
        for(name in obj) {
        value = obj[name];
            
        if(value instanceof Array) {
            for(i=0; i<value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
            }
        }
        else if(value instanceof Object) {
            for(subName in value) {
            subValue = value[subName];
            fullSubName = name + '[' + subName + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
            }
        }
        else if(value !== undefined && value !== null)
            query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
        
        return query.length ? query.substr(0, query.length - 1) : query;
    };
    
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
    }];
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
            url:'/services/:dc',
            templateUrl: 'App/views/service/list.html',
            controller:"ServicesController"
        });
    $stateProvider.state('nodes', {
        url:'/nodes/:dc',
        templateUrl: 'App/views/nodes/list.html',
        controller:"NodesController"
    });   
    /*路由配置 */   
    }]);
    /**拦截器 */
     app.factory('HttpProviderInterceptor', function () {
        return {
            request: function (config) {
                return config;
            }
        };
    });
    /**拦截器 */
    return app;

});