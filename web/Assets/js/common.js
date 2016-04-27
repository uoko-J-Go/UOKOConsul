String.prototype.startWith=function(str){     
  var reg=new RegExp("^"+str);     
  return reg.test(this);        
}  

String.prototype.endWith=function(str){     
  var reg=new RegExp(str+"$");     
  return reg.test(this);        
}
//去除字符串头尾空格或指定字符  
String.prototype.trim= function(c)  
{  
    if(c==null||c=="")  
    {  
        var str= this.replace(/^\/s*/,'');  
        var rg = /\/s/;  
        var i = str.length;  
        while (rg.test(str.charAt(--i)));  
        return str.slice(0, i + 1);  
    }  
    else  
    {  
        var rg=new RegExp("^"+c+"*");  
        var str= this.replace(rg, '');  
        rg = new RegExp(c);  
        var i = str.length;  
        while (rg.test(str.charAt(--i)));  
        return str.slice(0, i + 1);  
    }  
}  
  
//去除字符串头部空格或指定字符  
String.prototype.trimStart = function(c)  
{  
    if(c==null||c=="")  
    {  
        var str= this.replace(/^\/s*/, '');  
        return str;  
    }  
    else  
    {  
        var rg=new RegExp("^"+c+"*");  
        var str= this.replace(rg, '');  
        return str;  
    }  
}  
  
//去除字符串尾部空格或指定字符  
String.prototype.trimEnd = function(c)  
{  
    if(c==null||c=="")  
    {  
        var str= this;  
        var rg = /\/s/;  
        var i = str.length;  
        while (rg.test(str.charAt(--i)));  
        return str.slice(0, i + 1);  
    }  
    else  
    {  
        var str= this;  
        var rg = new RegExp(c);  
        var i = str.length;  
        while (rg.test(str.charAt(--i)));  
        return str.slice(0, i + 1);  
    }  
}  