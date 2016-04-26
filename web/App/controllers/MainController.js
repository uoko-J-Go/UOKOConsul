define([
    'consulApp',
    'layer'
],
function(consulApp){
     //处理单页 主页面相关 
    consulApp.controller('MainController', function ($scope,$rootScope,$http,$state,$stateParams) {
            $scope.ChangeDC=function(dc) {
                $scope.currDataCenter=dc;
                $state.go("services",{dc:dc},{inherit:false});
           
                // $http.post('/v1/agent/service/register',JSON.stringify({Name:"Test006",Address:"127.0.0.1",Port:8000})).success(function (data) {
                //     var aa=data;
                // }).error(function (data) {
                //     var aa=data;
                // });
            }
           
            $scope.Init=function() {
                $http.get("/v1/catalog/datacenters").success(function (data) {
                    $rootScope.dataCenters=data;
                    $scope.currDataCenter=$rootScope.dataCenters[0];
                }).error(function (data) {
                   layer.msg(data)
                });
            }
            
            $scope.Init();
    })

})