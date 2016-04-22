define([
    'consulApp'

],
function(consulApp){
     //处理单页 主页面相关 
    consulApp.controller('MainController', function ($scope,$rootScope,$http,$state,$stateParams) {
           
            $rootScope.dataCenters=["DC01","DC02"]
            $scope.currDataCenter=$rootScope.dataCenters[0];
            $scope.ChangeDC=function name(dc) {
                $scope.currDataCenter=dc;
                $state.go("services",{dc:dc},{inherit:false});
            }
            
            
    })

})