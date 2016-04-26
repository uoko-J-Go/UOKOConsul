define([
    
    'consulApp',
    'services/serviceservice'
    ],function(consulApp){
      

 consulApp.controller('ServicesController', function ($scope,$rootScope,$http,$state,$stateParams,ServicesService) {
            $rootScope.headTitle= "服务列表";
            $scope.services=[]
            $scope.SubmitFrom = function (model) {
                ServicesService.Create(model, function (data) {
                  $('#myModal').modal('hide')
                }); 
           };
           
           $scope.GetAll = function () {
                ServicesService.GetAll($scope.currDataCenter,function (data) {

                     $scope.items=data
                }); 
           };
           
           $scope.getHealthService=function(name){
              ServicesService.GetInfoByName($scope.currDataCenter,name,function (data) {
                     $scope.healthService=data;
                }); 
           }
           $scope.delService=function(id){
              ServicesService.Delete(id, function (data) {
                   $scope.GetAll();
                }, function (data) {
                  layer.alert(data)
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