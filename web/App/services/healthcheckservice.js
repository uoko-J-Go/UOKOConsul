define([
    
    'consulApp'
    
    ],function(consulApp){
      
    consulApp.service("HealthCheckService", function ($http) {
        
        
        this.GetServiceInfoByName = function (dc,name,successCallBack, failedCallBack) {
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