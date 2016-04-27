define([
    'consulApp',
    'layer',
    'services/catalogservice',
    'services/agentservice'
],
function(consulApp){
     //处理单页 主页面相关 
    consulApp.controller('MainController', function ($scope,$rootScope,$http,$state,$stateParams,CatalogService,AgentService) {
            $scope.ChangeDC=function(dc) {
                $scope.currDataCenter=dc;
                $state.go("services",{dc:dc},{inherit:false});
            }
           
            $scope.Init=function() {
                //获取数据中心
                CatalogService.GetAllDataCenters(function (data) {
                    $rootScope.dataCenters=data;
                },function (data) {
                   layer.msg(data)
                })
                //获取当前Agent信息
                AgentService.GetSelfInfo(function (data) {
                    $rootScope.CurrAgent=data;
                    $scope.currDataCenter=$rootScope.CurrAgent.Config.Datacenter;
                },function (data) {
                   layer.msg(data)
                })
                
            }
            
            $scope.Init();
    })

})