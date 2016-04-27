define([
    
    'consulApp'
    
    ],function(consulApp){
      
    consulApp.service("UiService", function ($http) {
        
        
       
        
    this.GetAllServices = function (dc,successCallBack, failedCallBack) {
            $http.get("/v1/internal/ui/services?dc="+dc+"").success(function (data) {
                if (successCallBack != undefined) {
                    successCallBack(data);
                }
            }).error(function (data) {
                if (failedCallBack != undefined) {
                    failedCallBack(data);
                }
            });
        };
        
    this.GetAllNodes= function (dc,successCallBack, failedCallBack) {
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
        
    this.GetNodeInfoByName = function (dc,name,successCallBack, failedCallBack) {
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