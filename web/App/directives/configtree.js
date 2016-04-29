define([
    "consulApp",
    "ztree",
    'services/kvservice'
], function (consulApp) {

    consulApp.directive("configtree", function (KVService) {
        return {
            restrict: "A",
            link: function (scope, element, attr) {
                var self = this;
                
                scope.selectedNode = null;

                self.$ = jQuery(element);
                self.tree = null;
                self.rootNode = null;

                self.treeSetting = {
                    view: {
                        selectedMulti: false
                    },
                   
                    callback: {
                        beforeExpand: nodeBeforeExpand,
                        onClick: function () {
                            scope.selectedNode = self.getSingleSelected();
                            if( scope.selectedNode){
                               var _path=self.convertPath(scope.selectedNode.getPath());
                               scope.TreeClick(_path,scope.selectedNode.isParent) 
                            }
                            
                        }
                    }
                };

                //加载配置项
                self.LoadConfigTree = function (fullPath, pId) {
                    _path=fullPath;
                    KVService.GetKeys(_path,scope.currDataCenter,function(data){
                       var parnet = null;
                        if (pId != null) {
                            parnet = self.tree.getNodeByTId(pId);
                            var nodes = parnet.children;
                            if (nodes!=undefined&&nodes != null) {
                                while (nodes.length !== 0) {
                                    self.tree.removeNode(nodes[0]);
                                }
                            }                    
                        }
                        for (var i =0;i<data.length; i++) {
                            var _isParent=data[i].endWith("/")
                            var _name=data[i].trimStart(_path).trimEnd("/")
                           if(_name!=undefined&&_name!=""){
                            var node = { name: _name, isParent: _isParent };
                            self.tree.addNodes(parnet, node);
                           }
                           
                        } 
                        
                    });
                }
                 //获取单个选择节点
                self.getSingleSelected = function () {
                    var nodes = self.tree.getSelectedNodes();
                    if (nodes != null && nodes.length > 0)
                        return nodes[0];
                    return null;
                };
                 //转换路径
                self.convertPath = function(nodes) {
                    //去掉根节点
                    nodes=_.filter(nodes,function(item){
                        return item.name!="/"
                    });
                    var paths="";
                    _.each(nodes,function(item){
                       paths+=item.name+"/";
                    })
                    return paths
                }
                
                
                //获取选择节点
                scope.getSelected = function () {
                    var nodes = self.tree.getSelectedNodes();
                    return nodes;
                };
               
                //初始化
                scope.init = function () {
                    self.tree = jQuery.fn.zTree.init(self.$, self.treeSetting);
                    self.tree.addNodes(null, { name: "/", isParent: true });
                    self.rootNode = self.tree.getNodes()[0];
                    self.tree.selectNode(self.rootNode)
                    self.tree.expandNode(self.rootNode, true, false, true, true);
                }
                //指定展开
                scope.expand = function (node) {
                    self.tree.expandNode(node, true, false, true, true);
                }
                //选中
                scope.selectNode = function (node) {
                    self.tree.selectNode(node)
                }
                //增加
                scope.addNode = function (node) {
                    var newnode=self.tree.addNodes(scope.selectedNode, node);
                    return newnode;
                }
                //增加
                scope.removeNode = function (node) {
                   var parentNode=node.getParentNode();
                   self.tree.removeNode(node);
                   self.tree.selectNode(parentNode)
                }
                //点击展开事件
                function nodeBeforeExpand(treeId, treeNode) {
                    var fullpath=self.convertPath(treeNode.getPath())
                    self.LoadConfigTree(fullpath, treeNode.tId);
                }
                self.$.addClass("ztree");
                scope.init();
            }
        };
    });
});