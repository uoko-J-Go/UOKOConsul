define([
    
    'consulApp'
    
    ],function(consulApp){
      
    consulApp.service("NodesService", function ($http) {
        this.GetAll = function (dc,successCallBack, failedCallBack) {
            $http.get("/v1/internal/ui/nodes?dc="+dc+"").success(function (data) {
                if (successCallBack != undefined) {
                    successCallBack(data);
                }
            }).error(function (data) {
                if (failedCallBack != undefined) {
                    failedCallBack(data);
                }
            });
        };
        
        this.GetInfoByName = function (dc,name,successCallBack, failedCallBack) {
            $http.get("/v1/internal/ui/node/"+name+"?dc="+dc+"").success(function (data) {
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