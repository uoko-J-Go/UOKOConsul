define([
    
    'consulApp',
    'services/serviceservice'
    ],function(consulApp){
      

 consulApp.controller('ServicesController', function ($scope,$rootScope,$http,ServicesService) {
            $rootScope.headTitle= "服务列表";
            $scope.services=[]
            $scope.SubmitFrom = function (model) {
                ServicesService.Create(model, function (data) {
                  $('#myModal').modal('hide')
                }); 
           };
           
           $scope.GetAll = function () {
                ServicesService.GetAll(function (data) {
                     $scope.items=data
                }); 
           };
           
           $scope.init=function(){
               $scope.GetAll();
           }
           $scope.init();
          
          $scope.delServices=function(id){
              ServicesService.Delete(id, function (data) {
                   $scope.GetAll();
                }); 
           }
          
          
         });
    });