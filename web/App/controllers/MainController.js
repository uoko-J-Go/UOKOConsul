define([
    'consulApp'

],
function(consulApp){
     //处理单页 主页面相关 
    consulApp.controller('MainController', function ($scope,$rootScope,$http,$state,$stateParams) {
           
            $scope.dataCenters=["DC01","DC02"]
            $scope.currDataCenter=$scope.dataCenters[0];
            $scope.ChangeDC=function name(dc) {
                $scope.currDataCenter=dc;
                $state.go("services");
            }
            
            
    })

})