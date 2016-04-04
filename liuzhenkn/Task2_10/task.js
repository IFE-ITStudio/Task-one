var speed,anime;//设置定时器及播放速度
function traversal(value){
	reset();
	var drowArr = [];
	var root_node = document.getElementById("root");
	if(value == 'pre'){
		drowArr.push(root_node);
		pre_traversal(root_node.children,drowArr);
	}else if(value == 'mid'){
		mid_traversal(root_node,drowArr);
	}else{
		last_traversal(root_node,drowArr);
	}
	drow(drowArr);
}
//动画函数
function drow(drowArr){
	var i=0;
	speed = document.getElementById("speed").value;
	anime = setInterval(function(){
		if(i<drowArr.length&&i>0){
			drowArr[i].style.backgroundColor = "#88ccff";
			drowArr[i-1].style.backgroundColor = "#fff";
		}else if(i==0){
			drowArr[i].style.backgroundColor = "#88ccff";
		}else{
			drowArr[i-1].style.backgroundColor = "#fff";
			clearInterval(anime);			
		}
		i++;
	},speed);
}
//前序遍历
function pre_traversal(sonArr,drowArr){
	for(var i=0;i<sonArr.length;i++){
		drowArr.push(sonArr[i]);
		pre_traversal(sonArr[i].children,drowArr);
	}
}
//中序遍历
function mid_traversal(node,drowArr){
	if(node){
		mid_traversal(node.firstElementChild,drowArr);
		drowArr.push(node);
		mid_traversal(node.lastElementChild,drowArr);
	}
}
//后序遍历
function last_traversal(node,drowArr){
	if(node){
		last_traversal(node.firstElementChild,drowArr);
		last_traversal(node.lastElementChild,drowArr);
		drowArr.push(node);
	}
}
//初始化
function reset(){
	clearInterval(anime);
	var divArr = document.getElementsByTagName('div');
    for (var i=divArr.length-1;i>=0;i--){
        divArr[i].style.backgroundColor = '#fff';
    }
}