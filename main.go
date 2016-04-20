package main

import (
	_ "github.com/uoko-J-Go/UOKOConsul/routers"
	"log"
	"net/http"
)

func main() {
	// 路由绑定函数
	log.Printf("server boot:%s ", "127.0.0.1:91")
	err := http.ListenAndServe(":91", nil) 
	//设置监听的端口
	if err != nil {
		log.Fatal("ListenAndServer: ", err)
	}
}

