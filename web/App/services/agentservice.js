define([
    
    'consulApp'
    
    ],function(consulApp){
      
    consulApp.service("AgentService", function ($http) {
        
         this.GetSelfInfo = function (successCallBack, failedCallBack) {
            $http.get("/v1/agent/self").success(function (data) {
                if (successCallBack != undefined) {
                    successCallBack(data);
                }
            }).error(function (data) {
                if (failedCallBack != undefined) {
                    failedCallBack(data);
                }
            });
        };
        
         this.RegisterService = function (model, successCallBack, failedCallBack) {
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
        
        this.DeregisterService = function (id, successCallBack, failedCallBack) {
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
        
       

    });
})