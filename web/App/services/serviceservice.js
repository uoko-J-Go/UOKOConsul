define([
    
    'consulApp'
    
    ],function(consulApp){
      
    consulApp.service("ServicesService", function ($http) {
        
        
        this.Create = function (model, successCallBack, failedCallBack) {
            $http.post("/v1/agent/service/register", JSON.stringify(model)).success(function (data) {
                if (successCallBack != undefined) {
                    successCallBack(data);
                }
            }).error(function (data) {
                if (failedCallBack != undefined) {
                    failedCallBack(data);
                }
            });
        };
        
        this.Delete = function (id, successCallBack, failedCallBack) {
            $http.post("/v1/agent/service/deregister/"+id+"").success(function (data) {
                if (successCallBack != undefined) {
                    successCallBack(data);
                }
            }).error(function (data) {
                if (failedCallBack != undefined) {
                    failedCallBack(data);
                }
            });
        };
        
        this.GetAll = function (dc,successCallBack, failedCallBack) {
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
        
        this.GetInfoByName = function (dc,name,successCallBack, failedCallBack) {
            $http.get("/v1/health/service/"+name+"?dc="+dc+"").success(function (data) {
                if (successCallBack != undefined) {
                    _.each(data,function(item){
                        item.ChecksPassing=_.where(item.Checks,{Status:"passing"}).length
                        item.ChecksCritical=_.where(item.Checks,{Status:"critical"}).length
                    });
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