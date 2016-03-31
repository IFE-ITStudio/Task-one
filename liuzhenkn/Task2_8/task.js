
var input = document.getElementById("input");
var leftIn = document.getElementById("left_in");
var leftOut = document.getElementById("left_out");
var rightIn = document.getElementById("right_in");
var rightOut = document.getElementById("right_out");
var addChild = document.getElementById("add");
var stringArr = [];
var matchInput = document.getElementById("match_input");
var match = document.getElementById("match");
var reset = document.getElementById("reset");
//左侧入
function checkInert(){
    if(/[^\w\u4e00-\u9fa5\n\，\,\、\。\.\s]+/g.test(input.value)){
        alert("输入有误,请重新输入");
        return false;
    }else{
        stringArr = input.value.replace(/[\n|\，|\,|\、|\.|\。|\s]+/g," ").split(" ");
        for(var i=0;i<stringArr.length;i++){
            if (stringArr[i]=="") {
                alert("输入有误，请重新输入")
                return false;
            }
        }
        //console.log(stringArr);
        return true;
    }    
}
leftIn.addEventListener("click",function(){
    if(checkInert()){
        for(var i=stringArr.length-1;i>=0;i--){
            var child = document.createElement("div");
            child.className = "div";
            child.innerHTML = stringArr[i];
            addChild.insertBefore(child,addChild.firstChild);
        }  
    }    
});
//左侧出
leftOut.addEventListener("click",function(){
    if(checkInert()){
        var listArr = document.getElementsByClassName("div");
        for(var j=0;j<stringArr.length;j++){
            for(var i=0;i<listArr.length;i++){
                if(listArr[i].innerHTML == stringArr[j]){
                    addChild.removeChild(listArr[i]);
                    return;
                }
            }            
        }
        alert("没有符合该组的元素");
    }

});
    //右侧入
rightIn.addEventListener("click",function(){
    if(checkInert()){
        for(var i=0;i<stringArr.length;i++){
            var child = document.createElement("div");
            child.className = "div";
            child.innerHTML = stringArr[i];
            addChild.insertBefore(child,addChild.lastChild);          
        }
    }

});
//右侧出
rightOut.addEventListener("click",function(){
    if(checkInert()){
        var listArr = document.getElementsByClassName("div");
        for(var j=0;j<stringArr.length;j++){
            for(var i=listArr.length;i>0;i--){
                if(listArr[i-1].innerHTML == stringArr[j]){
                    addChild.removeChild(listArr[i-1]);
                    return;
                }
            }            
        }
        alert("没有符合该组的元素");        
    }

});
    //点击某个div
addChild.addEventListener("click",function(){
	var listArr = document.getElementsByClassName("div");
	for(var i =0; i< listArr.length;i++){
	    listArr[i].onclick=function(){
	    	alert("被删除的元素的值:"+this.innerHTML);
	    	this.remove();
	    }
	}    	
});
match.addEventListener("click",function(){
    var listArr = document.getElementsByClassName("div");
    var matchString = matchInput.value;
    if(matchString == ""){
        alert("请输入查询内容");
        return;
    }
    var keyword = new RegExp(matchString);
    for(var i=0;i<listArr.length;i++){
        listArr[i].style.background = "#eee";
        if(keyword.test(listArr[i].innerHTML)){
            listArr[i].style.background = "red";
        }
    }
});
reset.addEventListener("click",function(){
    var listArr = document.getElementsByClassName("div");
    for(var i=0;i<listArr.length;i++){
        listArr[i].style.background = "#eee";
    }
});