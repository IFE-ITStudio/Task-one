var speed,anime,keyword,flag = 0;//设置定时器、播放速度、关键字
function traversal(value){
	reset();
	var drowArr = [];
	var root_node = document.getElementById("root");
	if(value == 'deep'){
		deep_search(root_node,drowArr);
	}else{
		range_search(root_node,drowArr);
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
		}else if(i==drowArr.length&&flag==1){
			drowArr[i-1].style.backgroundColor = "#88ccff"
			alert("找到节点");
			clearInterval(anime);	
		}else{
			drowArr[i-1].style.backgroundColor = "#fff";
			clearInterval(anime);			
		}
		i++;
	},speed);
}
//深度优先
function deep_search(root,drowArr){
	var sonArr = root.children;
	var keyword = document.getElementById("key").value;
	drowArr.push(root);
	for(var i=0;i<sonArr.length;i++){
		if(trim(sonArr[i].firstChild.nodeValue) == keyword){
			drowArr.push(sonArr[i]);
			flag = 1;
		}else if(flag == 0){
			deep_search(sonArr[i],drowArr);			
		}
	}
}
//广度优先
function range_search(root,drowArr){
	var queue = [];
	var node;
	var keyword = document.getElementById("key").value;
	queue.push(root);
	while(queue.length>0){
		node = queue.shift();
		drowArr.push(node);
		if(trim(node.firstChild.nodeValue) == keyword){
			flag = 1;
			break;
		}
		if(node.firstElementChild){
			queue.push(node.firstElementChild);
			node = node.firstElementChild;
			while(node.nextElementSibling){
				queue.push(node.nextElementSibling);
				node = node.nextElementSibling;
			}
		}
	}
}
//初始化
function reset(){
	clearInterval(anime);
	flag = 0;
	var divArr = document.getElementsByTagName('div');
    for (var i=divArr.length-1;i>=0;i--){
        divArr[i].style.backgroundColor = '#fff';
    }
}
//trim
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}