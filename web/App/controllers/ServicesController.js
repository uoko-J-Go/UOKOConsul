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
                
                var tags=model.Service.Tags.split(",");
                if(tags.length>0){
                    model.Service.Tags=tags;
                }
                else{
                    model.Service.Tags=[];
                }
                
                AgentService.RegisterService(model, function (data) {
                  $('#myModal').modal('hide')
                }); 
           };
           
           $scope.GetAll = function () {
                UiService.GetAllServices($scope.currDataCenter,function (data) {
                     $scope.items=data
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
                    var _params={
                        Datacenter: $scope.currDataCenter,
                        Node: node,
                        ServiceID: serviceId
                    }
                    CatalogService.Deregister(_params,function (data) {
                        if(data){
                             $scope.GetAll();
                        }
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
           }
           $scope.init();

         });
    });