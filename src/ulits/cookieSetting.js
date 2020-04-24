import cookie from "cookie_js";

//导出获取token方法
export  function getToken(){ 
	return cookie.get('admin_token');
} 

//导出存储token方法
export  function setToken(token){ 
	return cookie.set('admin_token',token);
} 

//导出删除token的方法
export  function removeToken(){ 
	return cookie.remove('admin_token')
} 

//导出获取username方法
export  function getUsername(){ 
	return cookie.get('username');
} 

//导出存储token方法
export  function setUserName(username){ 
	return cookie.set('username',username);
} 

//导出删除username的方法
export  function removeUserName(){ 
	return cookie.remove('username')
} 