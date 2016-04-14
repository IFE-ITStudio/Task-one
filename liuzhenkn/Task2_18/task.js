window.onload = function(){
	var nameValue = document.getElementById("name");
	var nameInfor = document.getElementById("nameRemind");
	var passwordValue = document.getElementById("password");
	var passwordInfor = document.getElementById("passwordRemind");
	var sureValue = document.getElementById("sure");
	var sureInfor = document.getElementById("sureRemind");
	var emailValue = document.getElementById("email");
	var emailInfor = document.getElementById("emailRemind");
	var phoneValue = document.getElementById("phone");
	var phoneInfor = document.getElementById("phoneRemind");
	var submit = document.getElementById("submit");
	var lengthTest = /^.{4,16}$/;
	var chineseReg = /[\u4E00-\uFA29]|[\uE7C7-\uE7F3]/g;
	var trimReg = /^\s+|\s$/g;
	var emailReg = /^\w+(\.\w+)*@\w+(\.\w+)+$/i;
	var phoneReg = /^1(3|4|5|7|8)\d{9}$/;
	var flag = [];
	var infors = {
		name:{
			"remind":"必填，长度为4~16位字符",
			"null":"姓名不能为空",
			"error":"格式不符，请重新输入",
			"right":"姓名可用"
		},
		password:{
			"remind":"必填，长度为4~16位字符",
			"null":"为空，请重新输入",
			"error":"格式不符，请重新输入",
			"right":"密码可用"
		},
		sure:{
			"remind":"请重新输入密码",
			"null":"为空，请重新输入",
			"length":"格式不符，请重新输入",
			"error":"与密码不符，请重新输入",
			"right":"密码一致"
		},
		email:{
			"remind":"请输入您的邮箱",
			"null":"为空，请重新输入",
			"error":"格式不符，请重新输入",
			"right":"邮箱可用"
		},
		phone:{
			"remind":"必填，长度为11位数字",
			"null":"为空，请重新输入",
			"error":"格式不符，请重新输入",
			"right":"手机可用"
		}
	}
	addEvent(nameValue,"focus",function(){
		var param = infors.name;
		nameInfor.innerHTML = param.remind;
		nameValue.parentNode.className = "";
	});
	addEvent(nameValue,"blur",function(){
		flag[0] = 0;
		var param = infors.name;
		var nameStr = nameValue.value.replace(trimReg,'').replace(chineseReg,'--');
		if(nameStr == ""){
			nameInfor.innerHTML = param.null;
			nameValue.parentNode.className = "error";
		}else if(!lengthTest.test(nameStr)){
			nameInfor.innerHTML = param.error;
			nameValue.parentNode.className = "error";
		}else{
			nameInfor.innerHTML = param.right;
			nameValue.parentNode.className = "right";
			flag[0] = 1;
		}
	});
	addEvent(passwordValue,"focus",function(){
		var param = infors.password;
		passwordInfor.innerHTML = param.remind;
		passwordValue.parentNode.className = "";
	});
	addEvent(passwordValue,"blur",function(){
		flag[1] = 0;
		var param = infors.password;
		var passwordStr = passwordValue.value.replace(trimReg,'');
		if(passwordStr == ""){
			passwordInfor.innerHTML = param.null;
			passwordValue.parentNode.className = "error";
		}else if(!lengthTest.test(passwordStr)){
			passwordInfor.innerHTML = param.error;
			passwordValue.parentNode.className = "error";
		}else{
			passwordInfor.innerHTML = param.right;
			passwordValue.parentNode.className = "right";
			flag[1] = 1;
		}
	});
	addEvent(sureValue,"focus",function(){
		var param = infors.sure;
		sureInfor.innerHTML = param.remind;
		sureValue.parentNode.className = "";
	});
	addEvent(sureValue,"blur",function(){
		flag[2] = 0;
		var param = infors.sure;
		var sureStr = sureValue.value;
		if(sureStr == ""){
			sureInfor.innerHTML = param.null;
			sureValue.parentNode.className = "error";
		}else if(!lengthTest.test(sureStr)){
			sureInfor.innerHTML = param.length;
			sureValue.parentNode.className = "error";
		}else if(sureStr !== passwordValue.value){
			sureInfor.innerHTML = param.error;
			sureValue.parentNode.className = "error";
		}else{
			sureInfor.innerHTML = param.right;
			sureValue.parentNode.className = "right";
			flag[2] = 1;
		}
	});
	addEvent(emailValue,"focus",function(){
		var param = infors.email;
		emailInfor.innerHTML = param.remind;
		emailValue.parentNode.className = "";
	});
	addEvent(emailValue,"blur",function(){
		flag[3] = 0;
		var param = infors.email;
		var emailStr = emailValue.value;
		if(emailStr == ""){
			emailInfor.innerHTML = param.null;
			emailValue.parentNode.className = "error";
		}else if(!emailReg.test(emailStr)){
			emailInfor.innerHTML = param.error;
			emailValue.parentNode.className = "error";
		}else{
			emailInfor.innerHTML = param.right;
			emailValue.parentNode.className = "right";
			flag[3] = 1;
		}
	});
	addEvent(phoneValue,"focus",function(){
		var param = infors.phone;
		phoneInfor.innerHTML = param.remind;
		phoneValue.parentNode.className = "";
	});
	addEvent(phoneValue,"blur",function(){
		flag[4] = 0;
		var param = infors.phone;
		var phoneStr = phoneValue.value;
		if(phoneStr == ""){
			phoneInfor.innerHTML = param.null;
			phoneValue.parentNode.className = "error";
		}else if(!phoneReg.test(phoneStr)){
			phoneInfor.innerHTML = param.error;
			phoneValue.parentNode.className = "error";
		}else{
			phoneInfor.innerHTML = param.right;
			phoneValue.parentNode.className = "right";
			flag[4] = 1;
		}
	});
	addEvent(submit,"click",function(){
		var con;
		for(var i=0;i<5;i++){
			if(flag[i] == 0){
				con = 0;
				break;
			}else{
				con = 1;
			}
		}
		if(con == 1){
			alert("提交成功");
		}else{
			alert("提交失败，请重新填写信息");
		}
	});
}
//浏览器兼容
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