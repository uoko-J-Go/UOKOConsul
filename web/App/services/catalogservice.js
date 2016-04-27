define([
    
    'consulApp'
    
    ],function(consulApp){
      
    consulApp.service("CatalogService", function ($http) {   
         
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

    });
})