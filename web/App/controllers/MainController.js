define([
    'consulApp'

],
function(consulApp){
     //处理单页 主页面相关 
    consulApp.controller('MainController', function ($scope,$rootScope,$http,$state,$stateParams) {
           
            $rootScope.dataCenters=["dc01","dc02"]
            $scope.currDataCenter=$rootScope.dataCenters[0];
            $scope.ChangeDC=function name(dc) {
                $scope.currDataCenter=dc;
                $state.go("services",{dc:dc},{inherit:false});
           
                // $http.post('/v1/agent/service/register',JSON.stringify({Name:"Test006",Address:"127.0.0.1",Port:8000})).success(function (data) {
                //     var aa=data;
                // }).error(function (data) {
                //     var aa=data;
                // });
            }
            
            
    })

})