var nameStr = document.getElementById('name');
var btn = document.getElementById('btn');
var msg = document.getElementById('message');
var box = document.getElementById('container');

var msg_inf = {
	error_length:{
		"infor":"请输入长度为4~16的字符串",
		"className":"error"
	},
	error_required:{
		"infor":"输入为空，前后不允许有空格，请重新输入",
		"className":"error"
	},
	right:{
		"infor":"成功，符合输入条件",
		"className":"right"
	}
}
function addEvent(ele,event,fn){
    try{
        ele.addEventListener(event,fn,false);
    }
    catch(e){
        try{
            ele.attachEvent("on" + event,fn);
        }
        catch(e){
            ele["on" + event] = fn;
        }
    }
}
function refresh(element,param){
	element.className = param.className;
	msg.innerHTML = param.infor;
}
function judge(){
	var lengthTest = /^.{4,16}$/;
	var chineseReg = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
	var trimReg = /^\s+|\s$/g;
	var strValue = nameStr.value;
	var strTest = strValue.replace(trimReg,'').replace(chineseReg,'--');
	console.log(strTest.length);
	var param;
	if(strTest.length == 0){
		param = msg_inf.error_required;
	}else if(!lengthTest.test(strTest)){
		param = msg_inf.error_length;
	}else{
		param = msg_inf.right;
	}
	refresh(box,param);
}