window.onload = function(){
    var tag_input = document.getElementById("tag");
    var tag_group = document.getElementById("tag_group");
    var textarea = document.getElementById("interest_input");
    var ints_group = document.getElementById("interest_group");
    var btn = document.getElementById("interest_btn");
    //
    addEvent(tag_input,"keyup",function(event){
        if(/[\s|,|，]+$/g.test(tag_input.value) || event.keyCode == 13 ){
            var data = trim(tag_input.value);
            var tagArr = traverseUl(tag_group);
            if(data != ""){
                for(var i=0;i<tagArr.length;i++){
                    if (data == tagArr[i].innerHTML) {
                        alert("标签已存在,请重新输入");
                        return;
                    }
                }
                if(tagArr.length>=10){
                    for(var i=0;i<9;i++){
                        tagArr[i].innerHTML = tagArr[i+1].innerHTML;
                    }
                    tagArr[9].innerHTML = data;
                }else{
                    var li = document.createElement("li");
                    li.innerHTML = data;
                    tag_group.insertBefore(li,tag_group.lastChild);                         
                }
                addTagStyle();
                tag_input.value = "";    
            }
        }
    });
    //
    addEvent(tag_group,"mousemove",function(){
        var tagArr = traverseUl(tag_group);
        for(var i=0;i<tagArr.length;i++){
            tagArr[i].onclick = function(){
                this.remove();
            }
        }
    });
    //
    addEvent(btn,"click",function(){
        var intsArr = trim_textarea(textarea.value);
        var tagArr = traverseUl(ints_group);
        console.log(intsArr);
        for(var i=0;i<intsArr.length;i++){
            var flag = 0;
            for(var j=0;j<tagArr.length;j++){
                if(intsArr[i] == tagArr[j].innerHTML){
                    flag = 1;
                    break;
                }
            }
            if(flag){
                console.log(intsArr[i]);
                continue;
            }else if(tagArr.length<10){
                var li = document.createElement("li");
                li.innerHTML = intsArr[i];
                ints_group.insertBefore(li,ints_group.lastChild); 
                tagArr = traverseUl(ints_group);
            }else{
                for(var k=0;k<9;k++){
                    tagArr[k].innerHTML = tagArr[k+1].innerHTML;
                }
                console.log(i);
                tagArr[9].innerHTML = intsArr[i];  
            }    
        }
    });
}
//事件浏览器兼容
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
//给标签添加样式
function addTagStyle(){
    var tagArr = traverseUl(tag_group);
    for(var i=0;i<tagArr.length;i++){
        //values[i] = tagArr[i].innerHTML;
        tagArr[i].onmouseout = function(){
            //var text = this.innerHTML.substring(2);
            this.innerHTML = this.innerHTML.substring(2);
            this.style.background = "#88ccff";
        };
        tagArr[i].onmouseover = function(){
            var value;
            for(var j=0;j<tagArr.length;j++){
                if(this.innerHTML == tagArr[j].innerHTML){
                    value = tagArr[j].innerHTML;
                }
            }
            this.innerHTML = "删除" + value;
            this.style.background = "#5cb85c";
        };
    }
}
//字符串处理
function trim(str){
    return str.replace(/\s|,|，+$|^\s|,|，+/g,"");
}

function trim_textarea(str){
    var intsArr = str.replace(/[\s,，;；、]*$|^[\s,，;；、]*/g,"").split(/[\s\n,，;；、]+/g);
    return intsArr;
}
//遍历ul获取li
function traverseUl(ele){
    var liArr = ele.getElementsByTagName("li");
    return liArr;
}