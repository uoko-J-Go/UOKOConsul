define([
    
    'consulApp',
    'services/catalogservice',
    'services/healthcheckservice',
    'services/uiservice'
    ],function(consulApp){
      

 consulApp.controller('NodesController', function ($scope,$rootScope,$state,$stateParams,UiService,CatalogService,HealthCheckService) {
            $rootScope.headTitle= "节点列表";
            $scope.services=[]

           $scope.GetAll = function () {
                UiService.GetAllNodes($scope.currDataCenter,function (data) {

                     $scope.items=data
                }); 
           };
           
           $scope.getHealthNode=function(name){
              UiService.GetNodeInfoByName($scope.currDataCenter,name,function (data) {
                     $scope.healthService=data;
                }); 
           }
           
           $scope.init=function(){
               if($stateParams["dc"]==""){
                   $scope.currDataCenter=$rootScope.CurrAgent.Config.Datacenter;
               }
               else{
                    $scope.currDataCenter=$stateParams["dc"];
               }
               $scope.GetAll();
           }
           $scope.init();
          
         });
    });