/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
var wrap = document.getElementsByClassName("aqi-chart-wrap")[0];
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};
// 用于渲染图表的数据
var chartData = {};
// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: "day"
}
function addEvent(element, event, listener) {
  if(element.addEventListener) { //标准
    element.addEventListener(event, listener, false);
  }else if (element.attachEvent) { //低版本ie
    element.attachEvent("on" + event, listener);
  }else { //都不行的情况
    element["on" + event] = listener;
  }
}
var color=['#AFF3AF','#B8F5F2','#FFA6A7','#BF6BBF','#504C4C'];
/**
 * 渲染图表
 */
 function getDaysInMonth(year,month){
      month = parseInt(month,10)+1;
      var temp = new Date(year+"/"+month+"/0");
      return temp.getDate();
}
function getRadio(){
  var radios = document.getElementsByName("gra-time");
  for(var i=0;i<radios.length;i++){
      if(radios[i].checked == true){
        radio = radios[i];
      }     
  }
  return radio;
}
function renderChart() {
  var ul = document.createElement("ul");
  var i = 0;
  var arr = [];
  if(pageState.nowGraTime === "day"){
    for(var key in chartData[pageState.nowSelectCity]){
      var li = document.createElement("li");
      li.title = key+"空气污染指数:"+chartData[pageState.nowSelectCity][key];
      li.style.height = chartData[pageState.nowSelectCity][key]+"px";
      li.style.width = 10+"px";
      li.style.backgroundColor=color[Math.floor(chartData[pageState.nowSelectCity][key]/100)];
      arr[i] = chartData[pageState.nowSelectCity][key];
      i++;
      ul.appendChild(li);
    }
    ul.style.height = Math.max.apply(null, arr);
  }else if(pageState.nowGraTime === "week"){
    var weekArr = [];
    var length = Object.getOwnPropertyNames(chartData[pageState.nowSelectCity]).length;
    var index;
    for(var i=0;i<length;i++){
      index = parseInt(i/7);
      if(i%7==0){
        var j = 0;
        var sum = 0;
        var count = 0;
        var flag = index*7;
        for(var key in chartData[pageState.nowSelectCity]){
          count++;
          if (j>=7) {
            weekArr[index] = Math.round(sum/7);
            break;
          }else if(j<7&&count>=flag){
            sum += chartData[pageState.nowSelectCity][key];
            j++;
          }
        }
      } 
    }
    for(var i=0;i<weekArr.length;i++){
      var li = document.createElement("li");
      li.title = "第"+(i+1)+"周空气污染指数:"+weekArr[i];
      li.style.height = weekArr[i]+"px";
      li.style.width = "40px";
      ul.style.height = Math.max.apply(null, weekArr);
      li.style.backgroundColor=color[Math.floor(weekArr[i]/80)];
      ul.appendChild(li);
    }
  }else{
    var monthNumArr = [];
    var monthArr = [];
    for(var key in chartData[pageState.nowSelectCity]){
      var year,month;
      year = key.substr(0,4);
      if (month!=key.substr(5,2)) {
        month = key.substr(5,2);
        monthNumArr.push(getDaysInMonth(year,month));
      }
    }
    console.log(monthNumArr);
    var flag = 0;
    for(var i=0;i<monthNumArr.length;i++){
      var count = 0;
      var sum = 0;
      var j = 0;
      for(var key in chartData[pageState.nowSelectCity]){
        count++;
        if(j>=monthNumArr[i]){
          monthArr[i] = Math.round(sum/monthNumArr[i]);
          break;
        }else if(j<=monthNumArr[i]&&count>=flag){
          sum += chartData[pageState.nowSelectCity][key];
          j++;
        }
      }
      flag += monthNumArr[i];
    }
     for(var i=0;i<monthArr.length;i++){
      var li = document.createElement("li");
      li.title = (i+1)+"月空气污染指数:"+monthArr[i];
      li.style.height = monthArr[i]+"px";
      li.style.width = "80px";
      ul.style.height = Math.max.apply(null, monthArr);
      li.style.backgroundColor=color[Math.floor(monthArr[i]/65)];
      ul.appendChild(li);
    }
  }
  wrap.appendChild(ul);
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  // 设置对应数据
  var radio = getRadio();
  if(radio.value!=pageState.nowGraTime){
      pageState.nowGraTime = radio.value;
    }
  // 调用图表渲染函数
  wrap.innerHTML = "";
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  var select = document.getElementById("city-select");
  // 设置对应数据
  var city = select.selectedIndex;
  console.log(city);
  if(city!=pageState.nowSelectCity){
    pageState.nowSelectCity = city;
    console.log(pageState.nowSelectCity);
  }
  // 调用图表渲染函数
  wrap.innerHTML = "";
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var timeType = document.getElementById("form-gra-time");
  addEvent(timeType,"click", graTimeChange);
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var select = document.getElementById("city-select");
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  addEvent(select, "change", citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var data = [];
  for(var city in aqiSourceData){
    data.push(aqiSourceData[city]); 
  }
  chartData = data;
  graTimeChange();
}
/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();