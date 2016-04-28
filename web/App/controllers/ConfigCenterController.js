define([    
    'consulApp',
    'layer',
    'services/kvservice',
    'directives/configtree'
    ],function(consulApp){
      

 consulApp.controller('ConfigCenterController', function ($scope,$rootScope,$state,$stateParams,KVService) {
           $rootScope.headTitle= "配置中心";
           $scope.ShowModel=0;
           $scope.IsCreateFoloder=false;//是创建键值对 还是目录
           $scope.CurrParentPath="";
           $scope.TreeClick=function(_path,_isParent){
              if($scope.CurrParentPath==_path) return;
               $scope.CurrParentPath=_path;
               $scope.addKV={}
             if(_isParent){
                 $scope.ShowModel=0;
                 $scope.$apply();
             }else{
                  $scope.ShowModel=1;
                 var key=_path.trimEnd("/");
                 KVService.GetKV(key,$scope.currDataCenter,function(data){
                    if(data.length>0){
                        $scope.editKV=data[0];  
                    }
                 })
             }
           }
           $scope.CreateKeyChanged=function(){
               $scope.IsCreateFoloder=$scope.addKV.Key.endWith("/")
           }
           
           $scope.AddKeyOrFolder=function(){
               if($scope.IsCreateFoloder){
                   if(!$scope.CurrParentPath){
                       $scope.CurrParentPath="";
                   }
                   KVService.AddFolder($scope.CurrParentPath+$scope.addKV.Key,$rootScope.CurrAgent.Config.Datacenter,function(data){
                       if(data=="true"){
                           $scope.expand( $scope.selectedNode);
                           $scope.addKV={}
                       }else{
                           layer.alert("创建失败");
                       }
                   })
               }else{
                   $scope.addKV.Key=$scope.CurrParentPath+$scope.addKV.Key;
                   
                    KVService.AddOrUpdateKV($scope.addKV,$rootScope.CurrAgent.Config.Datacenter,function(data){
                       if(data=="true"){
                           $scope.expand($scope.selectedNode);
                           $scope.addKV={}
                       }else{
                           layer.alert("创建失败");
                       }
                   })
               }
           }
           $scope.RemoveFolder=function(){
                layer.confirm("确定要删除该配置目录？", function (index) {
                   layer.close(index);
                   KVService.Remove($scope.CurrParentPath,$rootScope.CurrAgent.Config.Datacenter,function(data){
                      $scope.removeNode($scope.selectedNode);
                   })
                });
           }
           $scope.UpdateKey=function(){
                KVService.AddOrUpdateKV($scope.editKV,$rootScope.CurrAgent.Config.Datacenter,function(data){
                       if(data){
                           $scope.expand($scope.selectedNode);
                       }
               })
           }
           $scope.RemoveKey=function(){
                layer.confirm("确定要删除该配置项？", function (index) {
                    layer.close(index);
                    KVService.Remove($scope.editKV.Key,$rootScope.CurrAgent.Config.Datacenter,function(data){
                      $scope.removeNode($scope.selectedNode);
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
           }
           $scope.init();
          
         });
    });