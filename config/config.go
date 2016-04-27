package config

import (
	
)



// 默认配置。
const (
	CONFIG_DIR     string = "conf"                    // 配置目录名称
	CONFIG         string = CONFIG_DIR + "/appsetting.ini"       // 配置文件路径
)

// 来自配置文件的配置项。
var (

	CONSUL_HOST  string  = setting.DefaultString("consulhost", consulhost)   // Consul地址
	CONSUL_PORT  int    = setting.DefaultInt("consulport", consulport) // Consul端口
	SITE_HOST  string  = setting.DefaultString("sitehost", sitehost)   // Site地址
	SITE_PORT  int    = setting.DefaultInt("siteport", siteport) // Site端口
)

