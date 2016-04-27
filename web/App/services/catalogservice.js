define([
    
    'consulApp'
    
    ],function(consulApp){
      
    consulApp.service("CatalogService", function ($http) {   
         //获取数据中心
        this.GetAllDataCenters = function (successCallBack, failedCallBack) {
            $http.get("/v1/catalog/datacenters").success(function (data) {
                if (successCallBack != undefined) {
                    successCallBack(data);
                }
            }).error(function (data) {
                if (failedCallBack != undefined) {
                    failedCallBack(data);
                }
            });
        };
        //注销服务 节点等
        this.Deregister = function (params,successCallBack, failedCallBack) {
            $http.put("/v1/catalog/deregister",JSON.stringify(params)).success(function (data) {
                if (successCallBack != undefined) {
                    successCallBack(data);
                }
            }).error(function (data) {
                if (failedCallBack != undefined) {
                    failedCallBack(data);
                }
            });
        };
    });
})