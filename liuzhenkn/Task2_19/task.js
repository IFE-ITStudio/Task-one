window.onload = function(){
	var data = {
		beijing:["清华大学","北京大学","北京师范大学"],
		shanghai:["复旦大学","同济大学"],
		shandong:["山东大学","中国海洋大学"]
	};
	var localStu = document.getElementById("local");
	var localSch = document.getElementById("school");
	var text = document.getElementById("text");
	var onSch = document.getElementById("onSchool");
	var outSch = document.getElementById("outSchool");
	addEvent(localStu,"change",function(){
		var index = localStu.selectedIndex;
		var list = localStu.getElementsByTagName("option");
		var value = list[index].value;
		localSch.innerHTML = "";
		for(var i=0;i<data[value].length;i++){
			var newOption = new Option(data[value][i]);
			localSch.add(newOption,undefined);
		}
	});
	addEvent(onSch,"change",function(){
		localStu.style.display = "inline-block";
		localSch.style.display = "inline-block";
		text.style.display = "none";
	});
	addEvent(outSch,"change",function(){
		localStu.style.display = "none";
		localSch.style.display = "none";
		text.style.display = "inline-block";
	});
}
//浏览器兼容
function addEvent(ele,event,fn){
	try{
		ele.addEventListener(event,fn,false);
	}catch(e){
		try{
			ele.attachEvent("on" + event,fn);
		}catch(e){
			ele["on"+event] = fn;
		}
	}
}