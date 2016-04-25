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