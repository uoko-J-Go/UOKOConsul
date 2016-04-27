package config

import (
	"os"
	"strconv"
	"github.com/uoko-J-Go/UOKOConsul/common/config"
)

// 配置文件涉及的默认配置。
const (
	consulhost           string    = "127.0.0.1"        // Consul地址
	consulport           int    = 8500                     // Consul端口
	sitehost           string    = "127.0.0.1"        // Site地址
	siteport           int    = 91                     // Site端口
)

var setting = func() config.ConfigContainer {
	os.MkdirAll(CONFIG_DIR, 0777)
	
	iniconf, err := config.NewConfig("ini", CONFIG)
	if err != nil {
		file, err := os.Create(CONFIG)
		file.Close()
		iniconf, err = config.NewConfig("ini", CONFIG)
		if err != nil {
			panic(err)
		}
		defaultConfig(iniconf)
		iniconf.SaveConfigFile(CONFIG)
	} else {
		trySet(iniconf)
	}

	return iniconf
}()

func defaultConfig(iniconf config.ConfigContainer) {
	
	iniconf.Set("consulhost", consulhost)
	iniconf.Set("consulport", strconv.Itoa(consulport))
	
	iniconf.Set("sitehost", sitehost)
	iniconf.Set("siteport", strconv.Itoa(siteport))
}

func trySet(iniconf config.ConfigContainer) {
	if v := iniconf.String("consulhost"); v == "" {
		iniconf.Set("consulhost", consulhost)
	}
	if v, e := iniconf.Int("consulport"); v <= 0 || e != nil {
		iniconf.Set("consulport", strconv.Itoa(consulport))
	}
	
	if v := iniconf.String("sitehost"); v == "" {
		iniconf.Set("sitehost", sitehost)
	}
	if v, e := iniconf.Int("siteport"); v <= 0 || e != nil {
		iniconf.Set("siteport", strconv.Itoa(siteport))
	}
	iniconf.SaveConfigFile(CONFIG)
}
