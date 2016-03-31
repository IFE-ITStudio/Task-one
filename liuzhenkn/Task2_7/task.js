window.onload = function(){
	var input = document.getElementById("input");
    var leftIn = document.getElementById("left_in");
    var leftOut = document.getElementById("left_out");
    var rightIn = document.getElementById("right_in");
    var rightOut = document.getElementById("right_out");
    var addChild = document.getElementById("add");
    var sortbtn = document.getElementById("sort");
    //左侧入
    function checkInsert(value){
        clearInterval(action);
        var listArr=document.getElementsByClassName("li");
        if(isNaN(value)){
            alert("请输入10-100的数");
            return false;
        }else if(value<10||value>100){
            alert("请输入10-100的数");
            return false;
        }else if(listArr.length>=60){
            alert("数据长度超过60");
            return false;
        }else{
            return true;
        }
    }
    leftIn.addEventListener("click",function(){
        if(checkInsert(input.value)){
            if(input.value == ""){
                alert("输入为空");
            }else{
                var child = document.createElement("li");
                child.innerHTML = input.value;
                child.className = "li";
                var height = parseInt(input.value)*2;
                child.style.height = height + "px";
                child.style.lineHeight = height + "px";
                addChild.insertBefore(child,addChild.firstChild);
            }            
        }
    });
    //左侧出
    leftOut.addEventListener("click",function(){
        clearInterval(action);
    	var listArr = document.getElementsByClassName("li");
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
        if(checkInsert(input.value)){
            if(input.value == ""){
                alert("输入为空");
            }else{
                var child = document.createElement("li");
                child.className = "li";
                var height = parseInt(input.value)*2;
                child.style.height = height + "px";
                child.style.lineHeight = height + "px";
                child.innerHTML = input.value;
                addChild.insertBefore(child,addChild.lastChild);
            }            
        }
    });
    //右侧出
    rightOut.addEventListener("click",function(){
        clearInterval(action);
    	var listArr = document.getElementsByClassName("li");
    	for(var i=listArr.length;i>0;i--){
    		if(listArr[i-1].innerHTML == input.value){
    			addChild.removeChild(listArr[i-1]);
    			return;
    		}
    	}
    	alert("没有该元素");
    });
    //点击某个li
    addChild.addEventListener("click",function(){
        //clearInterval(action);
	    var listArr = document.getElementsByClassName("li");
		for(var i =0; i< listArr.length;i++){
	    	listArr[i].onclick=function(){
	    		alert("被删除的元素的值:"+this.innerHTML);
	    		this.remove();
	    	}
		}
        getValues();    	
    });
    sortbtn.addEventListener("click",function(){
        sort();
        action = setInterval("draw()",speed);
    });
}
var action;
var valueArr = [];
var speed = 20;
function getValues(){
    var listArr = document.getElementsByClassName("li");
    for(var i=0;i<listArr.length;i++){
        valueArr[i] = parseInt(listArr[i].innerHTML);
    }  
}
//数组排序（冒泡排序）
function sort(){
    getValues();
    for(var k=0;k<valueArr.length;k++){
        var value;
        for(var j=0;j<valueArr.length-1;j++){
            if(valueArr[j]>valueArr[j+1]){
                value = valueArr[j];
                valueArr[j] = valueArr[j+1];
                valueArr[j+1] = value;
            }
        }
    }
    return valueArr;
}
//动画函数
function draw(){
    var listArr = document.getElementsByClassName("li");
    for(var i=0;i<listArr.length;i++){
        //console.log(listArr[i].offsetHeight);
        var height = listArr[i].offsetHeight;
        if(listArr[i].offsetHeight<valueArr[i]*2){
            height++;
            listArr[i].style.height = height + "px";
            listArr[i].style.lineHeight = height + "px";
            listArr[i].innerHTML = valueArr[i];
        }else if(listArr[i].offsetHeight>valueArr[i]*2){
            height--;
            listArr[i].style.height = height + "px";
            listArr[i].style.lineHeight = height + "px";
            listArr[i].innerHTML = valueArr[i];
        }
    }
}