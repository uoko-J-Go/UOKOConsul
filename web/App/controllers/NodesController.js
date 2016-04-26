define([
    
    'consulApp',
    'services/nodesservice'
    ],function(consulApp){
      

 consulApp.controller('NodesController', function ($scope,$rootScope,$http,$state,$stateParams,NodesService) {
            $rootScope.headTitle= "节点列表";
            $scope.services=[]

           $scope.GetAll = function () {
                NodesService.GetAll($scope.currDataCenter,function (data) {

                     $scope.items=data
                }); 
           };
           
           $scope.getHealthNode=function(name){
              NodesService.GetInfoByName($scope.currDataCenter,name,function (data) {
                     $scope.healthService=data;
                }); 
           }
           
           $scope.init=function(){
               if($stateParams["dc"]==""){
                   $scope.currDataCenter=$rootScope.dataCenters[0];
               }
               else{
                    $scope.currDataCenter=$stateParams["dc"];
               }
               $scope.GetAll();
           }
           $scope.init();
          
         });
    });