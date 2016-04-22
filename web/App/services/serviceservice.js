define([
    
    'consulApp'
    
    ],function(consulApp){
      
    consulApp.service("ServicesService", function ($http) {
        this.Create = function (model, successCallBack, failedCallBack) {
            $http.put("/v1/agent/service/register", {"ID": "test","Name": "redis2","Address": "127.0.0.1","Port": 8000, "Check": {}}).success(function (data) {
                if (successCallBack != undefined) {
                    successCallBack(data);
                }
            }).error(function (data) {
                if (failedCallBack != undefined) {
                    failedCallBack(data);
                }
            });
        };
        
        this.GetAll = function (successCallBack, failedCallBack) {
            $http.get("/v1/agent/services").success(function (data) {
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