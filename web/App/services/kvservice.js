define([
    
    'consulApp'
    
    ],function(consulApp){
      
    consulApp.service("KVService", function ($http) {  
        
         
        this.GetKeys = function (fullpath,dc,successCallBack, failedCallBack) {
            $http.get("/v1/kv/"+fullpath+"?keys&seperator=/&dc="+dc).success(function (data) {
                if (successCallBack != undefined) {
                    successCallBack(data);
                }
            }).error(function (data) {
                if (failedCallBack != undefined) {
                    failedCallBack(data);
                }
            });
        }
        this.GetKV = function (key,dc,successCallBack, failedCallBack) {
            $http.get("/v1/kv/"+key+"?dc="+dc).success(function (data) {
                if (successCallBack != undefined) {
                    successCallBack(data);
                }
            }).error(function (data) {
                if (failedCallBack != undefined) {
                    failedCallBack(data);
                }
            });
        }
        this.AddOrUpdateKV = function (kvModel,dc,successCallBack, failedCallBack) {
            $http.put("/v1/kv/"+kvModel.Key+"?dc="+dc,kvModel.Value).success(function (data) {
                if (successCallBack != undefined) {
                    successCallBack(data);
                }
            }).error(function (data) {
                if (failedCallBack != undefined) {
                    failedCallBack(data);
                }
            });
        }
        this.AddFolder = function (path,dc,successCallBack, failedCallBack) {
            $http.put("/v1/kv/"+path+"?dc="+dc).success(function (data) {
                if (successCallBack != undefined) {
                    successCallBack(data);
                }
            }).error(function (data) {
                if (failedCallBack != undefined) {
                    failedCallBack(data);
                }
            });
        }
        this.Remove = function (path,dc,successCallBack, failedCallBack) {
            $http.delete("/v1/kv/"+path+"?dc="+dc).success(function (data) {
                if (successCallBack != undefined) {
                    successCallBack(data);
                }
            }).error(function (data) {
                if (failedCallBack != undefined) {
                    failedCallBack(data);
                }
            });
        }
    });
})