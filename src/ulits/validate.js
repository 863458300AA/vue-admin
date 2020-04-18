//过滤特殊字符
export function stripscript(s){
 	 var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
 	 var rs = "";
 	 for (var i = 0; i < s.length; i++) {
 	     rs = rs + s.substr(i, 1).replace(pattern, '');
 	 }
 	 return rs;
}

//验证用户名
export function regUserName(value){
	let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
	return reg.test(value)
}

//验证密码
export function regPassword(value){
	let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
	return reg.test(value)
}

//验证验证码
export function regCode(value){
	let reg = /^[a-z0-9]{6}$/;
	return reg.test(value)
}