define([
    
    'consulApp',
    'services/catalogservice',
    'services/healthcheckservice',
    'services/uiservice'
    ],function(consulApp){
      

 consulApp.controller('NodesController', function ($scope,$rootScope,$state,$stateParams,UiService,CatalogService,HealthCheckService) {
     
            $rootScope.headTitle= "节点列表";
            $scope.services=[];
            $scope.NodeName="";
            $scope.nodeId=$stateParams.nodeId

           $scope.GetAll = function () {
                UiService.GetAllNodes($scope.currDataCenter,function (data) {

                     $scope.items=data
                }); 
           };
           
           $scope.getHealthNode=function(name){
              if($scope.NodeName!=name){
                UiService.GetNodeInfoByName($scope.currDataCenter,name,function (data) {
                     $scope.healthService=data;
                }); 
              }
               $scope.NodeName=name;
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