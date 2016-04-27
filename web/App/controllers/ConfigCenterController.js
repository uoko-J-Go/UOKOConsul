define([    
    'consulApp',
    'layer',
    'services/kvservice'
    ],function(consulApp){
      

 consulApp.controller('ConfigCenterController', function ($scope,$rootScope,$state,$stateParams,KVService) {
           $rootScope.headTitle= "配置中心";
        
        
        
           $scope.init=function(){
               if($stateParams["dc"]==""){
                   $scope.currDataCenter=$rootScope.CurrAgent.Config.Datacenter;
               }
               else{
                    $scope.currDataCenter=$stateParams["dc"];
               }
           }
           $scope.init();
          
         });
    });