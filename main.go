package main

import (
	"log"
	"net/http"
	"net/http/httputil"
    "net/url"
	"fmt"
	"strings"
	"github.com/uoko-J-Go/UOKOConsul/config"
)
type ProxyInfo struct {
    host string
    port int
}
func ProxyHandler(h http.Handler,proxyInfo ProxyInfo) http.Handler {
  return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
    reqUrl:=fmt.Sprintf("%v",r.URL)
	if strings.Contains(reqUrl,"/v1/") {
		remote, err := url.Parse(fmt.Sprintf("http://%s:%d",proxyInfo.host,proxyInfo.port))
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
	
	fileHandler := http.FileServer(http.Dir("./web"))
	proxy:=ProxyInfo{host: config.CONSUL_HOST, port:config.CONSUL_PORT}
    proxyHand := ProxyHandler(fileHandler,proxy)
	log.Printf("server boot:%s ", fmt.Sprintf("%s:%d",config.SITE_HOST,config.SITE_PORT))
	err := http.ListenAndServe(fmt.Sprintf("%s:%d",config.SITE_HOST,config.SITE_PORT), proxyHand) 
	//设置监听的端口
	if err != nil {
		log.Fatal("ListenAndServer: ", err)
	}
}

