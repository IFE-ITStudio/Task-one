
	var input = document.getElementById("input");
    var leftIn = document.getElementById("left_in");
    var leftOut = document.getElementById("left_out");
    var rightIn = document.getElementById("right_in");
    var rightOut = document.getElementById("right_out");
    var addChild = document.getElementById("add");
    //左侧入
    leftIn.addEventListener("click",function(){
    	var child = document.createElement("div");
    	child.className = "div";
    	if(input.value == ""){
    		alert("输入为空");
    	}else{
    		child.innerHTML = input.value;
    		addChild.insertBefore(child,addChild.firstChild);
    	}
    });
    //左侧出
    leftOut.addEventListener("click",function(){
    	var listArr = document.getElementsByClassName("div");
    	for(var i=0;i<listArr.length;i++){
    		if(listArr[i].innerHTML == input.value){
    			addChild.removeChild(listArr[i]);
    			return;
    		}
    	}
    	alert("没有该元素");
    });
    //右侧入
    rightIn.addEventListener("click",function(){
    	var child = document.createElement("div");
    	child.className = "div";
    	if(input.value == ""){
    		alert("输入为空");
    	}else{
    		child.innerHTML = input.value;
    		addChild.insertBefore(child,addChild.lastChild);
    	}
    });
    //右侧出
    rightOut.addEventListener("click",function(){
    	var listArr = document.getElementsByClassName("div");
    	for(var i=listArr.length;i>0;i--){
    		if(listArr[i-1].innerHTML == input.value){
    			addChild.removeChild(listArr[i-1]);
    			return;
    		}
    	}
    	alert("没有该元素");
    });
    //点击某个div
    addChild.addEventListener("click",function(){
	    var listArr=document.getElementsByClassName("div");
		for(var i =0; i< listArr.length;i++){
	    	listArr[i].onclick=function(){
	    		alert("被删除的元素的值:"+this.innerHTML);
	    		this.remove();
	    	}
		}    	
    });