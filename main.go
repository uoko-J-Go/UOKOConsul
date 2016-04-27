package main

import (
	"log"
	"net/http"
	"net/http/httputil"
    "net/url"
	"fmt"
	"strings"
)
type ProxyInfo struct {
    host string
    port string
}
func ProxyHandler(h http.Handler,proxyInfo ProxyInfo) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    reqUrl:=fmt.Sprintf("%v",r.URL)
	if strings.Contains(reqUrl,"/v1/") {
		remote, err := url.Parse("http://" + proxyInfo.host + ":" + proxyInfo.port)
		if err != nil {
			panic(err)
		}
		proxy := httputil.NewSingleHostReverseProxy(remote)
		proxy.ServeHTTP(w, r)
	}else
	{
		 h.ServeHTTP(w, r)
	}
	
  })
}
func main() {
	// 路由绑定函数
	log.Printf("server boot:%s ", "127.0.0.1:91")
	fileHandler := http.FileServer(http.Dir("./web"))
	proxy:=ProxyInfo{host: "127.0.0.1", port: "8500"}
    proxyHand := ProxyHandler(fileHandler,proxy)
	
	err := http.ListenAndServe(":91", proxyHand) 
	//设置监听的端口
	if err != nil {
		log.Fatal("ListenAndServer: ", err)
	}
}

