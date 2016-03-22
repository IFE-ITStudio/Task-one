/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function trim(str) {//去除值前后的空格
	return str.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g, "");
}
function addAqiData() {
	var inCity = document.getElementById("aqi-city-input").value;
	var inNum = document.getElementById("aqi-value-input").value;
	var citys = trim(inCity);
	var nums = trim(inNum);
	if(!citys.match(/^[\u4e00-\u9fa5]/)){
		alert("城市名必须为中文字符，请重新输入");
		return;
	}
	if (!nums.match(/^\d+$/)){
		alert("空气质量必须为整数，请重新输入");
		return;
	}
	aqiData[citys] = nums;
}
/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	var content = "";
	for(citys in aqiData){
		content += "<tr><td>"+citys+"城市空气质量：</td><td>"+aqiData[citys]+"</td><td><button data-city='"+citys+"'>删除</button></td></tr>";
	}
	table.innerHTML = content;
}
/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(citys) {
  // do sth.
  delete aqiData[citys];
  renderAqiList();
}

function init() {
	var addBtn = document.getElementById("add-btn");
	var table = document.getElementById("aqi-table");
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    addBtn.addEventListener("click",addBtnHandle,false);
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    table.addEventListener("click",function(event){
	    if(event.target.nodeName.toLowerCase()=="button"){
	    	delBtnHandle.call(null,event.target.dataset.city);
	    }
	})
}

init();