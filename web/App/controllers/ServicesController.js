define([
    'consulApp'
    
    ],function(consulApp){
      
    consulApp.controller('ServicesController', function ($scope,$rootScope,$http,$state,$stateParams) {
            $rootScope.headTitle= "服务列表";
            
            $scope.services=[];
            $scope.dc=$stateParams["dc"]? $stateParams["dc"]:$rootScope.dataCenters[0];

    })

})