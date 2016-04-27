define([    
    'consulApp',
    'layer',
    'services/kvservice',
    'directives/configtree'
    ],function(consulApp){
      

 consulApp.controller('ConfigCenterController', function ($scope,$rootScope,$state,$stateParams,KVService) {
           $rootScope.headTitle= "配置中心";
        
           $scope.TreeClick=function(key){
             KVService.GetKV(key,$scope.currDataCenter,function(data){
                 if(data.length>0){
                    $scope.currKV=data[0];  
                 }
             })
           }
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