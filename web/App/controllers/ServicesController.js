define([
    
    'consulApp',
    'layer',
    'services/catalogservice',
    'services/agentservice',
    'services/healthcheckservice',
    'services/uiservice'
    ],function(consulApp){
      

 consulApp.controller('ServicesController', function ($scope,$rootScope,$state,$stateParams,UiService,AgentService,CatalogService,HealthCheckService) {
            $rootScope.headTitle= "服务列表";
            $scope.services=[];
            $scope.ServiceName="";
            $scope.SubmitFrom = function (model) {

                if (typeof model.Tags != "undefined") {
                    var tags=model.Tags.split(",");
                    if(tags.length>0){
                        model.Tags=tags;
                    }
                    else{
                        model.Tags=[];
                    }
                }
                
                AgentService.RegisterService(model, function (data) {
                  $scope.GetAll();
                  $('#myModal').modal('hide');
                 
                }); 
           };
           
           $scope.GetAll = function () {
                UiService.GetAllServices($scope.currDataCenter,function (data) {
                     $scope.items=data
                }); 
           };
           
           $scope.GetAllNode = function () {
                CatalogService.GetAllNode(function (data) {
                     $scope.nodeData=data;
                }); 
           };
           
           $scope.getHealthService=function(name){
              if($scope.ServiceName!=name){
                HealthCheckService.GetServiceInfoByName($scope.currDataCenter,name,function (data) {
                     $scope.healthService=data;
                }); 
              }
              $scope.ServiceName=name;
           }
           $scope.delService=function(node,serviceId){
                layer.confirm("确定要注销该服务？", function (index) {
                    layer.close(index);
                    CatalogService.Deregister(serviceId,function (data) {
                         $scope.GetAll();
                    })
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
               $scope.GetAllNode();
               $scope.localNodeName= $rootScope.CurrAgent.Config.NodeName;
           }
           $scope.init();

         });
    });