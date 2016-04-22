define([
    
    'consulApp',
    'services/serviceservice'
    ],function(consulApp){
      

 consulApp.controller('ServicesController', function ($scope,$rootScope,$http,ServicesService) {
            $rootScope.headTitle= "服务列表";
            $scope.services=[]
            $scope.SubmitFrom = function (model) {
               
                ServicesService.Create(model, function (data) {
                    formSubmitSuccessClick();
                }); 
           };
           
           $scope.GetAll = function () {
                ServicesService.GetAll(function (data) {
                    
                     $scope.services=data
                }); 
           };
           
         })
    });