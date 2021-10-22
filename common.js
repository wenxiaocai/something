



___________________________________________________________________________
JS数组的交集、并集、差集，数组去重，获取两个数组重复的元素，去除两个数组相同的元素
复制代码
        let arr1=[1,2,3,4,5,6]
        let arr2=[4,5,6,7,8,9]
        // 并集 数组去重 
        let RemoveSame=[...new Set([...arr1,...arr2])]
        console.log(RemoveSame) //[1, 2, 3, 4, 5, 6, 7, 8, 9]

        //数组交集，或得两个数组重复的元素
        let SamePart=arr1.filter(item=>arr2.includes(item))
        console.log(SamePart) //[4, 5, 6]

        //差集=并集-交集  去除两个数组相同的元素
        let Difference=RemoveSame.filter(item=>!SamePart.includes(item))
        console.log(Difference) //[1, 2, 3, 7, 8, 9]

__________________________________________________________

#自定义函数清空属性值
clearValue(obj){
    Object.keys(obj).forEach(key => {
        if (typeof obj[key]=='object'){
            this.clearValue(obj[key])
        }else {
            obj[key]='';
        }
    });
}
_________________________________________________________

ajax 接口文件流，打开pdf,创建pdfurl
axios({
      url: url,
      method: 'get',
      responseType: 'blob'
    }).then(response => {
      const blob = new Blob([response.data], {
        type: 'application/pdf;chartset=UTF-8'
      })
      const fileName = decodeURI(response.headers["content-disposition"]).split(';')[1].split('filename=')[1];
      console.log('fileName', fileName)
      document.title = fileName
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, fileName)
      } else {
        let fileURL = URL.createObjectURL(blob)
        console.log('fileURL',fileURL)
        window.open(fileURL)
      }

    });

——————————————————————————————
// 去首尾空格
trimStr(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}


————————————————————————————————
// ws
/**
 * 依赖文件sockjs.js、stomp.js
 * */
;!(function (window) {
    'use strict'
    let WS = function () {
        //保存所有的订阅事件 {Aevent:[pubfun(status,data),pubfun(status,data),...]}
        this.subEvents = {};
        this.isConnect = false;
        this.stompClient = null;
        this.selfClose = false;
        this.ws = null;
        this.url = null;
    };

    WS.prototype = {
        constructor: WS
        //设置连接状态
        , setConnect(status) {
            this.isConnect = status;
        }
        //建立连接
        , connect(url) {
            //若没有连接，才连接
            this.isConnect = false;
            this.url = url;
            this.ws = new SockJS(url);
            this.stompClient = Stomp.over(ws);
            this.stompClient.connect({}, (data) => {
                this.setConnect(true);
                this.connectSuc.apply(this, [stompClient, data]);
            }, (error) => {
                this.setConnect(false);
                this.connectErr.apply(this,[stompClient,error]);
            });
            this.ws.onclose =  (e) => {
                this.isConnect = false;
                if(!this.selfClose){
                    this.reConnect();
                }
            }
            return stompClient;
        }
        //手动断开连接
        , disconnect() {
            if(this.stompClient != null && this.isConnect) {
                this.stompClient.disconnect();
                this.isConnect = false;
                this.selfClose = true;
                this.ws = null;
                this.stompClient = null;
            }
        }
        //重连
        , reConnect(){
            if(this.isConnect){return;}
            this.connect(this.url);
        }
        //连接成功后的回调
        , connectSuc(stompClient, data) {
            if(this.isConnect){
                //发布连接成功事件
                this.trigger.apply(this, ['connectSuc', stompClient.subscribe.bind(stompClient), data]);
                //发布发送消息到服务端事件
                this.trigger.apply(this, ['sendMessage', stompClient.send.bind(stompClient), data]);
            }
        }
        //连接失败后的回调
        , connectErr(stompClient, data){
            //发布连接失败事件
            this.trigger.apply(this, ['connectErr', stompClient, data]);
        }
        //发布函数
        , trigger(eventType, ...data) {
            eventType = this.subEvents[eventType];
            for (var i = 0; i < eventType.length; i++) {
                eventType[i].apply(this, data);
            }
        }
        //订阅方法 --->用于订阅指定事件
        , on(eventType, handle) {
            if (!(eventType in this.subEvents)) {
                this.subEvents[eventType] = [];
            }
            this.subEvents[eventType].push(handle);
        }
        //删除订阅
        , off(eventType, handle) {
            eventType = this.subEvents[eventType];
            if (eventType) {
                let handleIndex = eventType.indexOf(handle);
                if (handleIndex >= 0) {
                    eventType.splice(handleIndex, 1);
                }
            }
        }
    };
    window.WS = WS;
})(window);


/**
 *
 *  var ws = new WS();
    ws.connect("/helloWebsocket");

    ws.on('connectSuc',function (subscribe,data) {
        subscribe('/topic/serverSend', function(response){
            info.innerHTML += "<div>"+response+"</div>";
        });
        subscribe('/topic/serverResponse',function (response) {
            info.innerHTML += "<div>"+response+"</div>";
        });
    });

    ws.on('connectErr',function (stompClient,data) {

    });

    //客户端发送消息给服务端
    ws.on('sendMessage',function (send,data) {
        send("/client/clientSendMessage",{},"hello server !!");
    });



     //强制关闭窗口后,断开连接
    window.onunload = function (ev) {
        ws.disconnect();
    }
 *
 * */



——————————————————————————————————————————————————————————————
// 预览打开excel文件流
const _this = this;
_this.fnShowTips('正在生成excel，请稍后');
// 方法没有传入contractNo则接口不需要传入contractNo（仅协商中两份合同的导出需要传contractNo）
const contractId = contractNo ? ('&contractNo=' + contractNo) : '';
axios({
  url: this.baseUrl + `order/l_exportExcel?orderId=${this.orderId}` + contractId,
  method: 'get',
  responseType: 'blob'
}).then(response => {
  // console.log('get')
  let blob = new Blob([response.data], {
    type: 'application/vnd.ms-excel'
  })
  const fileName = decodeURI(response.headers["content-disposition"]).split(';')[1].split('filename=')[1];
  // let fileName = `${(this.orderInfo.sorderType==1||this.orderInfo.sorderType==4)?'报价单':'订单'}-${this.orderInfo.custName}-${this.formatDate(new Date())}`
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, fileName)
  } else {
    var link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.download = fileName
    link.click()
    //释放内存
    window.URL.revokeObjectURL(link.href)
  }
  // console.log('done')

  // }
});
// 预览打开pdf文件流
const _this = this;
_this.fnShowTips('正在生成excel，请稍后');
// 方法没有传入contractNo则接口不需要传入contractNo（仅协商中两份合同的导出需要传contractNo）
const contractId = contractNo ? ('&contractNo=' + contractNo) : '';
axios({
  url: this.baseUrl + `order/l_exportPDF?orderId=${this.orderId}` + contractId,
  method: 'get',
  responseType: 'blob'
}).then(response => {
  const blob = new Blob([response.data], {
    type: 'application/pdf;chartset=UTF-8'
  })
  const fileName = decodeURI(response.headers["content-disposition"]).split(';')[1].split('filename=')[1];
  if (window.navigator.msSaveOrOpenBlob) {
    navigator.msSaveBlob(blob, fileName)
  } else {
    let fileURL = URL.createObjectURL(blob)
    window.open(fileURL)
  }

});

axios({
  url: this.baseUrl + `order/l_exportExcel?orderId=${this.orderId}`,
  method: 'get',
  responseType: 'blob'
}).then(response => {
  console.log(response)
  if (response.code == 3) {
    window.location.href = '/login/index.html';
  } else {
    let blob = new Blob([response.data], {
      type: 'application/vnd.ms-excel'
    })
    let fileName = this.orderInfo.sorderNumber
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, fileName)
    } else {
      var link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = fileName
      link.click()
      //释放内存
      window.URL.revokeObjectURL(link.href)
    }

  }
});


filters: {
  statusToText(value) {
    let reValue;
    switch (value) {
      case 1:
        reValue = "代付款";
        break;
      case 2:
        reValue = "代发货";
        break;
      case 3:
        reValue = "待收货";
        break;
      case 4:
        reValue = "已完成";
        break;
      case 5:
        reValue = "已取消";
        break;
      case 6:
        reValue = "售后处理";
        break;
    }
    return reValue;
  }
}


1. innerWidth
对于IE9 + 、Chrome、 Firefox、 Opera 以及 Safari：
window.innerHeight = 浏览器窗口的内部高度
window.innerWidth = 浏览器窗口的内部宽度

1. clientWidth
一、 对于 Internet Explorer 8、 7、 6、 5：
document.documentElement.clientHeight表示HTML文档所在窗口的当前高度
document.documentElement.clientWidth表示HTML文档所在窗口的当前宽度
在不同浏览器都实用的 JavaScript 方案：
var w = document.documentElement.clientWidth || document.body.clientWidth;
var h = document.documentElement.clientHeight || document.body.clientHeight;

clientWidth也可以用来获取元素的宽高， 不包含元素的border.
clientWidth = 元素的width + padding

3. scrollWidth
scrollHeight和scrollWidth， 获取网页内容和宽度.
一、 针对IE、 Opera: (针对整个网页来说)
scrollHeight是网页内容的实际高度， 可以小于clientHeight.
二、 针对NS、 FF: (针对整个网页来说)
scrollHeight也是网页内容的实际高度， 但是最小值是clientHeight.
也就是说就算网页内容比浏览器窗口小， 但是返回值还是cliengHeight.
浏览器兼容:
  var w = document.documentElement.scrollWidth ||
    document.body.scrollWidth;
var h = document.documentElement.scrollHeight ||
  document.body.scrollHeight;

scrollHeight和scrollWidth还可以获取Dom元素中内容实际占用的高度和宽度.
scrollWidth = 元素的width + padding

4. 网页尺寸offsetHeight
offsetHeight和offsetWidth， 获取网页内容高度和宽度(包括滚动条等边线， 会随窗口的显示大小改变)。
offsetHeight = clientHeight + 滚动条 + 边框.(整个网页来说)
浏览器兼容性
var w = document.documentElement.offsetWidth ||
  document.body.offsetWidth;
var h = document.documentElement.offsetHeight

offset用来获取DOM元素中内容高度和宽度时包括元素的border.
offsetWidth = 元素的width + padding + border————————————————
版权声明： 本文为CSDN博主「 mr_fzz」 的原创文章， 遵循 CC 4.0 BY - SA 版权协议， 转载请附上原文出处链接及本声明。
原文链接： https: //blog.csdn.net/mr_fzz/article/details/53033877



  $('#J-tab li').each(function(i) {
    $(this).on('click', function() {
      $(this).addClass('active').siblings('li').removeClass('active');
      $('#J-tabCnt .J-cnt').eq(i).addClass('active').siblings('.J-cnt').removeClass('active');
    })
  })

var $root = $('html, body');
$('.fixMenu li a ').click(function() {
  $root.animate({
    scrollTop: $($.attr(this, 'href')).offset().top
  }, 1000);
  return false;
});

// 字号
function zoomSize() {
  var w = document.documentElement.offsetWidth;
  document.documentElement.style.fontSize = w / 32 + 'px';
}
zoomSize();
window.onresize = function() {
  zoomSize();
}


var RegEmail = /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
var RegPhone = /^1[3|4|5|7|8]\d{9}$/;
var RegPsw = /^(?![a-zA-z]+$)(?!\d+$)(?![!+@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;



// 移动端判断是否双击
var lastClickTime = 0,
  clickTimer;
$('body')
  .on('click', 'h1', function() {
    var nowTime = new Date().getTime();
    if (nowTime - lastClickTime < 400) {
      /*双击*/
      lastClickTime = 0;
      clickTimer && clearTimeout(clickTimer);
      alert('双击');

    } else {
      /*单击*/
      lastClickTime = nowTime;
      clickTimer = setTimeout(() => {
        alert('单击');
      }, 400);
    }
  })


//删除左右两端的空格
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
//删除左边的空格
function ltrim(str) {
  return str.replace(/(^\s*)/g, "");
}
//删除右边的空格
function rtrim(str) {
  return str.replace(/(\s*$)/g, "");
}

// 获取鼠标位置
var oMouseX = event.originalEvent.x || event.originalEvent.layerX || 0;
var oMouseY = event.originalEvent.y || event.originalEvent.layerY || 0;



$('.txt').on('keypress', function(event) {
  var ee = event || window.event;
  if (ee.keyCode == "13") {
    console.log("enter");

  }
});

// 页面到底部自动加载内容 
var divH = document.body.scrollHeight,
  top = document.body.scrollTop,
  windowH = window.screen.availHeight;
if ((top + windowH) > divH) {
  console.log('该他妈的加载内容了。');
}
console.log('网页正文全文高：' + document.body.scrollHeight + ' 网页被卷去的高： ' + document.body.scrollTop + ' 屏幕可用工作区高度:' + window.screen.availHeight);

// 保留指定小数位数
var num = 2.443242342;
num = num.toFixed(4); // num will be equal to   2.4432


// 图片加载失败，并防止死循环
onerror = "this.src=aaa.jpg;this.onerror=null;"


//JS性能优化之创建文档碎片(document.createDocumentFragment） 为了解决这个问题， 我们可以引入createDocumentFragment() 方法， 它的作用是创建一个文档碎片， 把要插入的新节点先附加在它上面， 然后再一次性添加到document中。 代码如下： 代码如下:

//先创建文档碎片

var oFragmeng = document.createDocumentFragment();


for (var i = 0; i < 10000; i++) {
  var op = document.createElement("span");
  var oText = document.createTextNode(i);
  op.appendChild(oText);
  //先附加在文档碎片中
  oFragmeng.appendChild(op);
}
//最后一次性添加到document中
document.body.appendChild(oFragmeng);


// 获取各种浏览器可见窗口大小

s += " 网页可见区域宽：" + document.body.clientWidth;
s += " 网页可见区域高：" + document.body.clientHeight;
s += " 网页可见区域宽：" + document.body.offsetWidth + " (包括边线和滚动条的宽)";
s += " 网页可见区域高：" + document.body.offsetHeight + " (包括边线的宽)";
s += " 网页正文全文宽：" + document.body.scrollWidth;
s += " 网页正文全文高：" + document.body.scrollHeight;
s += " 网页被卷去的高(ff)：" + document.body.scrollTop;
s += " 网页被卷去的高(ie)：" + document.documentElement.scrollTop;
s += " 网页被卷去的左：" + document.body.scrollLeft;
s += " 网页正文部分上：" + window.screenTop;
s += " 网页正文部分左：" + window.screenLeft;
s += " 屏幕分辨率的高：" + window.screen.height;
s += " 屏幕分辨率的宽：" + window.screen.width;
s += " 屏幕可用工作区高度：" + window.screen.availHeight;
s += " 屏幕可用工作区宽度：" + window.screen.availWidth;
s += " 你的屏幕设置是 " + window.screen.colorDepth + " 位彩色";
s += " 你的屏幕设置 " + window.screen.deviceXDPI + " 像素/英寸";

// jq 获取各种浏览器可见窗口大小 
alert($(window).height()); //浏览器当前窗口可视区域高度 
alert($(document).height()); //浏览器当前窗口文档的高度 
alert($(document.body).height()); //浏览器当前窗口文档body的高度 
alert($(document.body).outerHeight(true)); //浏览器当前窗口文档body的总高度 包括border padding margin 
alert($(window).width()); //浏览器当前窗口可视区域宽度 
alert($(document).width()); //浏览器当前窗口文档对象宽度 
alert($(document.body).width()); //浏览器当前窗口文档body的高度 
alert($(document.body).outerWidth(true)); //浏览器当前窗口文档body的总宽度 包括border padding margin 


先介绍几个属性：（ 暂时只测了IE和firefox， 实际上我工作中用到的最多的是chrome）

网页被卷起来的高度 / 宽度（ 即浏览器滚动条滚动后隐藏的页面内容高度）

(javascript) document.documentElement.scrollTop //firefox

(javascript) document.documentElement.scrollLeft //firefox

(javascript) document.body.scrollTop //IE

(javascript) document.body.scrollLeft //IE

(jqurey) $(window).scrollTop()

(jqurey) $(window).scrollLeft()

网页工作区域的高度和宽度

  (javascript) document.documentElement.clientHeight // IE firefox       

(jqurey) $(window).height()

元素距离文档顶端和左边的偏移值

  (javascript) DOM元素对象.offsetTop //IE firefox

(javascript) DOM元素对象.offsetLeft //IE firefox

(jqurey) jq对象.offset().top

(jqurey) jq对象.offset().left



//回到顶部
$('body,html').animate({ scrollTop: 0 }, 100);

localStorage.setItem('myCat', 'Tom');


//写cookies
function setCookie(name, value, day) {
  var day = day;
  var exp = new Date();
  exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
  console.log(new Date());
  console.log(exp);
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}


new Date("month dd,yyyy hh:mm:ss");
new Date("month dd,yyyy");
new Date(yyyy, mth, dd, hh, mm, ss);
new Date(yyyy, mth, dd);
new Date(ms);


// if (localStorage.getItem('newPopReceive-discount') == 0) return;
console.log(new Date().getTime());
console.log(new Date().getTime());
console.log(new Date().getYear());
console.log(new Date().getMonth());
console.log(new Date().getDate());
console.log(new Date().getHours());
console.log(new Date().getMinutes());
console.log(new Date().getSeconds());
// 传入月份要比实际要写入的月份减一个月，例如1月要写0；不然跟new Date()对比的时候会出错，因为new Date().getMonth()获取到的月份比实际少一个月。
console.log(new Date(2018, 0, 05, 14, 15, 00).getTime());
console.log(new Date(2018, 0, 05, 14, 15, 00).getYear());
console.log(new Date(2018, 0, 05, 14, 15, 00).getMonth());
console.log(new Date(2018, 0, 05, 14, 15, 00).getDate());
console.log(new Date(2018, 0, 05, 14, 15, 00).getHours());
console.log(new Date(2018, 0, 05, 14, 15, 00).getMinutes());
console.log(new Date(2018, 0, 05, 14, 15, 00).getSeconds());

js中获取时间new date() 的用法
获取时间：

var myDate = new Date(); //获取系统当前时间
获取特定格式的时间：

myDate.getYear(); //获取当前年份(2位)
myDate.getFullYear(); //获取完整的年份(4位,1970-????)
myDate.getMonth(); //获取当前月份(0-11,0代表1月)
myDate.getDate(); //获取当前日(1-31)
myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
myDate.getHours(); //获取当前小时数(0-23)
myDate.getMinutes(); //获取当前分钟数(0-59)
myDate.getSeconds(); //获取当前秒数(0-59)
myDate.getMilliseconds(); //获取当前毫秒数(0-999)
myDate.toLocaleDateString(); //获取当前日期
var mytime = myDate.toLocaleTimeString(); //获取当前时间
myDate.toLocaleString(); //获取日期与时间


// 获取当前时间戳(以s为单位)
var timestamp = Date.parse(new Date());
timestamp = timestamp / 1000;
//当前时间戳为：1403149534
console.log("当前时间戳为：" + timestamp);

// 获取某个时间格式的时间戳
var stringTime = "2014-07-10 10:21:12";
var timestamp2 = Date.parse(new Date(stringTime));
timestamp2 = timestamp2 / 1000;
//2014-07-10 10:21:12的时间戳为：1404958872 
console.log(stringTime + "的时间戳为：" + timestamp2);

// 将当前时间换成时间格式字符串
var timestamp3 = 1403058804;
var newDate = new Date();
newDate.setTime(timestamp3 * 1000);
// Wed Jun 18 2014 
console.log(newDate.toDateString());
// Wed, 18 Jun 2014 02:33:24 GMT 
console.log(newDate.toGMTString());
// 2014-06-18T02:33:24.000Z
console.log(newDate.toISOString());
// 2014-06-18T02:33:24.000Z 
console.log(newDate.toJSON());
// 2014年6月18日 
console.log(newDate.toLocaleDateString());
// 2014年6月18日 上午10:33:24 
console.log(newDate.toLocaleString());
// 上午10:33:24 
console.log(newDate.toLocaleTimeString());
// Wed Jun 18 2014 10:33:24 GMT+0800 (中国标准时间)
console.log(newDate.toString());
// 10:33:24 GMT+0800 (中国标准时间) 
console.log(newDate.toTimeString());
// Wed, 18 Jun 2014 02:33:24 GMT
console.log(newDate.toUTCString());

Date.prototype.format = function(format) {
  var date = {
    "M+": this.getMonth() + 1,
    "d+": this.getDate(),
    "h+": this.getHours(),
    "m+": this.getMinutes(),
    "s+": this.getSeconds(),
    "q+": Math.floor((this.getMonth() + 3) / 3),
    "S+": this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
        date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}
console.log(newDate.format('yyyy-MM-dd h:m:s'));



// 公用方法
/*#region myLoading*/
(function($) {
  $.myLoading = function() {
    var defaults = {
      self_bgFrame: null, //背景层
      self: null //dialog dom
    };
    return createPlugin().init(defaults);
  };

  function create(options) {
    var tmp1 = '<div class="ui_loading_bgframe"></div>';
    var tmp2 = '<div class="ui_loading1"><i></i><i></i><i></i><i></i><i></i><i></i></div>';

    options.self_bgFrame = $(tmp1).appendTo(window.document.body);
    options.self = $(tmp2).appendTo(window.document.body);


    //var x = ($(window).width() - $(".ui_loading1").width()) / 2;
    //var y = ($(window).height() - $(".ui_loading1").height()) / 2;
    //$(options.self).css("left", x + "px");
    //$(options.self).css("top", y + "px");


    if (!window.myTopLayoutIndex) window.myTopLayoutIndex = 100;
    else window.myTopLayoutIndex = window.myTopLayoutIndex + 1;
    options.self_bgFrame.css("z-index", window.myTopLayoutIndex);
    options.self.css("z-index", window.myTopLayoutIndex);

    show(options);
  }

  function show(options) {
    var docw = $(document).width();
    var doch = $(document).height();
    options.self_bgFrame.width(docw);
    options.self_bgFrame.height(doch);

    //loading size
    var lsize = 48;
    var x = ($(window).width() - lsize) / 2 + document.body.scrollLeft;
    var y = ($(window).height() - lsize) / 2 + document.body.scrollTop;
    $(options.self).css("left", x + "px");
    $(options.self).css("top", y + "px");
  }

  function close(options) {
    $(options.self_bgFrame).remove();
    $(options.self).remove();
  }

  function createPlugin() {
    return {
      options: null,
      init: function(options) {
        this.options = options;
        create(options);
        return this;
      },
      show: function() {
        show(this.options);
      },
      close: function() {
        close(this.options);
      }
    }
  }
})(jQuery);
/*#endregion*/

/*#region myDialog*/
(function($) {
  $.myDialog = function(options) {
    var defaults = {
      id: this.attr("id"), //容器id
      self_bgFrame: null, //背景层
      self: null, //dialog dom
      title: "标题",
      width: 400,
      height: 300,
      buttons: [],
      closeBefore: null
    };
    //覆盖默认值(true嵌套/深度拷贝)
    var ops = $.extend(true, {}, defaults, options);
    return new createPlugin().init(ops);
  };

  function create(options) {
    var tmp1 = '<div class="ui_dialog2_bgframe" data-type="dialog_bg_layout"></div>';
    var tmp2 = '<div class="ui_dialog2">' +
      '<div class="ui_dialog2_top">' +
      '<label class="ui_dialog2_title_txt" data-type="title">标题</label>' +
      '<span class="ui_dialog2_close_btn" title="关闭" data-type="close"></span>' +
      '</div>' +
      '<div class="ui_dialog2_body"></div>' +
      '<div class="ui_dialog2_bottom">' +
      '<div class="ui_dialog2_buttons" data-type="buttons"></div>' +
      '</div>' +
      '</div>';

    var op = options;
    options.self_bgFrame = $(tmp1).appendTo(window.document.body);
    options.self = $(tmp2).appendTo(window.document.body);
    if (!window.myTopLayoutIndex) window.myTopLayoutIndex = 100;
    else window.myTopLayoutIndex = window.myTopLayoutIndex + 1;
    options.self_bgFrame.css("z-index", window.myTopLayoutIndex);
    options.self.css("z-index", window.myTopLayoutIndex);

    //
    var titlebar = options.self.children("DIV")[0];
    var body = options.self.children("DIV")[1];
    var footbar = options.self.children("DIV")[2];

    $("#" + options.id).appendTo(body);

    //dialog width/height
    var dlgw = options.width + 20; //
    var dlgh = options.height + 32; //titlebar.height=32
    if (options.buttons.length > 0) dlgh += 55; //footbar.height=48      
    options.self.width(dlgw);
    options.self.height(dlgh);

    //
    $(body).width(options.width);
    $(body).height(options.height);

    //title
    var title = $(titlebar).find("[data-type='title']")[0];
    $(title).width(options.width - 18); //closeButton.width=18
    $(title).html(options.title);

    //add button
    var btnContainer = $(footbar).find("[data-type='buttons']")[0];
    if (options.buttons.length > 0) {
      for (var i = 0; i < options.buttons.length; i++) {
        var btn = options.buttons[i];
        if (typeof(btn) == "string")
          $("#" + btn).appendTo(btnContainer);
        else
          $(btnContainer).append(btn);
      }
    } else {
      $(btnContainer).css("display", "none");
    }

    var closeBtn = $(titlebar).find("[data-type='close']")[0];
    $(closeBtn).click(function() {
      close(op);
    });
    $(window).resize(function() {
      var docw = $(document).width();
      var doch = $(document).height();
      $(op.self_bgFrame).width(docw);
      $(op.self_bgFrame).height(doch);
    });
  }

  function show(options) {
    var docw = $(document).width();
    var doch = $(document).height();
    options.self_bgFrame.width(docw);
    options.self_bgFrame.height(doch);

    var x = ($(window).width() - options.width - 20) / 2;
    var y = ($(window).height() - options.height - 32) / 2;
    $(options.self).css("left", x + "px");
    $(options.self).css("top", y + "px");

    $(options.self_bgFrame).show();
    $(options.self).show();
  }

  function close(options) {
    $(options.self_bgFrame).hide();
    $(options.self).hide();
  }

  function setTitle(options) {
    var title = $(options.self).find("[data-type='title']")[0];
    $(title).html(options.title);
  }

  function createPlugin() {
    return {
      options: null,
      init: function(options) {
        this.options = options;
        create(options);
        return this;
      },
      show: function() {
        show(this.options);
      },
      close: function() {
        close(this.options);
      },
      setTitle: function(title) {
        this.options.title = title;
        setTitle(this.options);
      }
    }
  }
})(jQuery);
/*#endregion*/

/*#region myAlert*/
(function($) {
  $.myAlert = function(msg, options, callback) {
    var defaults = {
      self_bgFrame: null, //背景层
      self: null, //dialog dom
      width: 300,
      height: 150
    };
    var ops = $.extend(true, {}, defaults, options);
    var al = createPlugin().init(ops, callback);
    show(ops, msg);
    return al;
  };

  function create(options, callback) {
    var tmp1 = '<div class="ui_alert2_bgframe"></div>';
    var tmp2 = '<div class="ui_alert2">' +
      '<div class="ui_alert2_top">' +
      '<span class="ui_alert2_close_btn" title="关闭" data-type="close"></span>' +
      '</div>' +
      '<div class="ui_alert2_body"></div>' +
      '<div class="ui_alert2_bottom">' +
      '<button class="ui_alert2_ok" type="button" data-type="ok">知道了</button>' +
      '</div>' +
      '</div>';

    var op = options;
    options.self_bgFrame = $(tmp1).appendTo(window.document.body);
    options.self = $(tmp2).appendTo(window.document.body);
    if (!window.myTopLayoutIndex) window.myTopLayoutIndex = 100;
    else window.myTopLayoutIndex = window.myTopLayoutIndex + 1;
    options.self_bgFrame.css("z-index", window.myTopLayoutIndex);
    options.self.css("z-index", window.myTopLayoutIndex);

    //
    var titlebar = options.self.children("DIV")[0];
    var body = options.self.children("DIV")[1];
    var footbar = options.self.children("DIV")[2];

    //dialog width/height 
    options.self.width(options.width);
    options.self.height(options.height);

    //
    $(body).width(options.width - 20);
    $(body).height(options.height - 70 - 20);

    //title
    var closeBtn = $(titlebar).find("[data-type='close']")[0];
    $(closeBtn).click(function() {
      if (callback != null && callback != undefined)
        callback();
      close(options);
    });

    var okBtn = $(footbar).find("[data-type='ok']")[0];
    $(okBtn).click(function() {
      if (callback != null && callback != undefined)
        callback();
      close(options);
    });

    $(window).resize(function() {
      var docw = $(document).width();
      var doch = $(document).height();
      $(options.self_bgFrame).width(docw);
      $(options.self_bgFrame).height(doch);
    });
  }

  function show(options, msg) {
    var docw = $(document).width();
    var doch = $(document).height();
    options.self_bgFrame.width(docw);
    options.self_bgFrame.height(doch);

    var body = options.self.children("DIV")[1];
    $(body).html(msg);

    var x = ($(window).width() - options.width) / 2;
    var y = ($(window).height() - options.height) / 2;
    $(options.self).css("left", x + "px");
    $(options.self).css("top", y + "px");

    $(options.self_bgFrame).show();
    $(options.self).show();
  }

  function close(options) {
    $(options.self_bgFrame).remove();
    $(options.self).remove();
  }

  function createPlugin() {
    return {
      options: null,
      init: function(options, callback) {
        this.options = options;
        create(options, callback);
        return this;
      },
      show: function(msg) {
        show(this.options, msg);
      },
      close: function() {
        close(this.options);
      }
    }
  }
})(jQuery);
/*#endregion*/

/*#region myConfirm*/
(function($) {
  $.myConfirm = function(msg, yesCallback, noCallback, options) {
    var defaults = {
      self_bgFrame: null, //背景层
      self: null, //dialog dom
      title: "询问",
      width: 320,
      height: 200
    };
    var ops = $.extend(true, {}, defaults, options);
    var al = new createPlugin().init(msg, yesCallback, noCallback, ops);
    show(ops, msg);
    return al;
  };

  function create(msg, yesCallback, noCallback, options) {
    var tmp1 = '<div class="ui_alert2_bgframe"></div>';
    var tmp2 = '<div class="ui_alert2">' +
      '<div class="ui_alert2_top">' +
      '<label class="ui_alert2_title_txt" data-type="title">询问</label>' +
      '</div>' +
      '<div class="ui_alert2_body"></div>' +
      '<div class="ui_alert2_bottom">' +
      '<button type="button" class="ui_alert2_yes" data-type="yes">是</button>' +
      '<button type="button" class="ui_alert2_no" data-type="no">否</button>' +
      '</div>' +
      '</div>';

    var op = options;
    var win = window;
    options.self_bgFrame = $(tmp1).appendTo(win.document.body);
    options.self = $(tmp2).appendTo(win.document.body);
    if (!win.myTopLayoutIndex) win.myTopLayoutIndex = 100;
    else win.myTopLayoutIndex = win.myTopLayoutIndex + 1;
    options.self_bgFrame.css("z-index", win.myTopLayoutIndex);
    options.self.css("z-index", win.myTopLayoutIndex);

    //
    var titlebar = options.self.children("DIV")[0];
    var body = options.self.children("DIV")[1];
    var footbar = options.self.children("DIV")[2];

    //dialog width/height 
    options.self.width(options.width);
    options.self.height(options.height);

    //
    $(body).width(options.width - 20);
    $(body).height(options.height - 70 - 20);

    //title
    var title = $(titlebar).find("[data-type='title']")[0];
    $(title).width(options.width);
    $(title).html(options.title);

    var btnYes = $(footbar).find("[data-type='yes']")[0];
    $(btnYes).click(function() {
      if (yesCallback != null && yesCallback != undefined)
        yesCallback();
      close(options);
    });
    var btnNo = $(footbar).find("[data-type='no']")[0];
    $(btnNo).click(function() {
      if (noCallback != null && noCallback != undefined)
        noCallback();
      close(options);
    })
  }

  function show(options, msg) {
    var win = window.parent;
    var docw = $(win.document).width();
    var doch = $(win.document).height();
    options.self_bgFrame.width(docw);
    options.self_bgFrame.height(doch);

    var body = options.self.children("DIV")[1];
    $(body).html(msg);

    var x = ($(win).width() - options.width * 2) / 2;
    var y = ($(win).height() - options.height * 2) / 2;
    $(options.self).css("left", x + "px");
    $(options.self).css("top", y + "px");

    $(options.self_bgFrame).show();
    $(options.self).show();
  }

  function close(options) {
    $(options.self_bgFrame).remove();
    $(options.self).remove();
  }

  function createPlugin() {
    return {
      options: null,
      init: function(msg, yesCallback, noCallback, options) {
        this.options = options;
        create(msg, yesCallback, noCallback, options);
        return this;
      },
      show: function(msg) {
        show(this.options, msg);
      },
      close: function() {
        close(this.options);
      }
    }
  }
})(jQuery);
/*#endregion*/

/*#region myUpload */
(function($) {
  $.myUpload = function(options) {
    var defaults = {
      method: 'POST',
      dataType: "json",
      url: '',
      fileId: '',
      requestHeaders: {}, //{'upload': 'ajax-reqeust'}
      progressbar: null,
      xhr: null,
      success: function(obj) {},
      error: function(statusText) {},
      progress: function(loaded, total) {}
    };
    for (var i in options) {
      defaults[i] = options[i];
    }

    return new createPlugin().init(defaults);
  };

  function create(options) {
    var xhr = null;
    if (window.XMLHttpRequest)
      xhr = new XMLHttpRequest();
    else
      xhr = new ActiveXObject("Microsoft.XMLHTTP");
    options.xhr = xhr;
    xhr.onreadystatechange = function() {
      switch (xhr.readyState) {
        case 1:
          loading(options);
          break;
        case 2:
          loaded(options);
          break;
        case 3:
          interactive(options);
          break;
        case 4:
          complete(options, xhr.status, xhr.statusText, xhr.responseText, xhr.responseXML);
          break;
      }
    };

    if (xhr.upload && options.progress) {
      xhr.upload.addEventListener('progress', function(e) {
        options.progress(e.loaded, e.total);
      }, false);
    }
  }

  function send(options, file) {
    var xhr = options.xhr;
    xhr.open(options.method, options.url, true);
    for (var i in options.requestHeaders) {
      xhr.setRequestHeader(i, options.requestHeaders[i]);
    }

    var data = new FormData();
    data.append("file", file);
    xhr.send(data);
  }

  function upload(options) {
    var input = document.getElementById(options.fileId);
    if (input != null) $(input).remove();

    input = document.createElement("input");
    $(input).attr("type", "file");
    $(input).attr("id", options.fileId);
    $(input).css("display", "none");
    var form = $(document.body).find("form")[0];
    $(form).append(input);
    $(input).change(function(e) {
      var files = this.files;
      if (files.length > 0) {
        send(options, files[0]);
      }
    });
    $(input).click();
  }

  function complete(options, status, statusText, responseText, responseXML) {
    var xhr = options.xhr;

    if (options.progressbar != null) {
      options.progressbar.close();
      options.progressbar = null;
    }

    if (status == 200) {
      if (options.success) {
        var responseObj;
        if (options.dataType) {
          switch (options.dataType) {
            case 'json':
              responseObj = eval("(" + responseText + ")");
              break;
            case 'html':
              responseObj = responseText;
              break;
            case 'XML':
              responseObj = responseXML;
              break;
          }
        } else {
          if (responseXML)
            responseObj = responseXML;
          else
            responseObj = responseText;
        }
        options.success(responseObj);
      }
    } else {
      options.error && options.error(statusText);
    }
  }

  function loading(options) {
    options.progressbar = $.myLoading();
  }

  function loaded(options) {}

  function interactive(options) {}

  function createPlugin() {
    return {
      options: null,
      init: function(options) {
        this.options = options;
        create(this.options);
        return this;
      },
      setUrl: function(url) {
        this.options.url = url;
      },
      upload: function() {
        upload(this.options);
      }
    }
  }
})(jQuery);
/*#endregion */

/*#region helpers */
(function(window, undefined) {
  var helpers = {
    /*#region json */
    json: {
      parse: function(str) {
        /// <summary>把json字符串转为对象</summary>
        /// <param name="str">json字符串</param>
        //过滤日期,把.net返回的\Date()\转为 new Date(),自动生成时间对象
        var s = str.replace(/"\\\/(Date\([0-9-]+\))\\\/"/gi, "new $1");

        return eval("(" + s + ")");
      },
      parseToDate: function(str) {
        /// <summary>把/Date(1391184000000)\转为Date</summary>
        /// <param name="str">json字符串</param>
        str = "new " + str.replace("/", "").replace("/", "");
        return eval("(" + str + ")");
      }
    },
    /*#endregion */

    /*#region cookie */
    cookie: {
      set: function(name, value, hour) {
        if (hour != undefined && hour != null) {
          var exp = new Date();
          exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
          window.document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
        } else
          window.document.cookie = name + "=" + escape(value);
      },
      get: function(name) {
        var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (arr != null) return unescape(arr[2]);
        return null;
      },
      del: function(name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = helpers.cookie.get(name);
        if (cval != null) window.document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
      }
    },
    /*#endregion */

    /*#region checkbox */
    checkbox: {
      isChecked: function(elem) {
        if (typeof(elem) == "string" && elem.constructor == String)
          return $("#" + elem).is(":checked");
        else
          return $(elem).is(":checked");
      },
      checked: function(elem, isChecked) {
        var obj;
        if (typeof(elem) == "string" && elem.constructor == String)
          obj = $("#" + elem);
        else
          obj = $(elem);
        if (isChecked == true)
          obj.prop("checked", true);
        else {
          if (obj.is(":checked") == true) {
            obj.prop("checked", false);
          }
        }
      }
    },
    /*#endregion checkbox */

    /*#region radio */
    radio: {
      getValue: function(name) {
        /// <summary>获取radio选中项的value</summary>
        /// <param name="name" type="String">元素name属性</param>
        return $("input[name='" + name + "']:checked").val();
      },
      setValue: function(name, value) {
        var rs = $("input[name='" + name + "']");
        for (var i = 0; i < rs.length; i++) {
          if ($(rs[i]).val() == value)
            $(rs[i]).attr("checked", "checked");
          else
            $(rs[i]).removeAttr("checked");
        }
      }
    },
    /*#endregion radio */

    /*#region select */
    select: {
      selectedText: function(elem) {
        /// <summary>获取select元素当前选中的文本</summary>
        /// <param name="elem" type="String/Object">元素ID或对象</param>
        /// <returns type="String" />
        var obj;
        if (typeof(elem) == "string" && elem.constructor == String)
          obj = $("#" + elem);
        else
          obj = $(elem);
        return obj.find("option:selected").text();
      },
      selectedIndex: function(elem) {
        /// <summary>获取select元素当前选中的索引</summary>
        /// <param name="elem" type="String/Object">元素ID或对象</param>
        /// <returns type="Int" />
        if (typeof(elem) == "string" && elem.constructor == String)
          return document.getElementById(elem).selectedIndex;
        else
          return elem.selectedIndex;
      },
      val: function(elem, value, invokeOnchange) {
        /// <summary>设置select的值</summary>
        /// <param name="elem" type="String/Object">元素ID或对象</param>
        /// <param name="value">值</param>
        var e;
        if (typeof(elem) == "string" && elem.constructor == String)
          e = $("#" + elem);
        else
          e = $(elem);
        e.val(value);
      },
      selectedIntValue: function(elem) {
        /// <summary>获取select元素当前选中的Int值</summary>
        /// <param name="elem" type="String/Object">元素ID或对象</param>
        /// <returns type="Int" />
        if (typeof(elem) == "string" && elem.constructor == String)
          if (document.getElementById(elem).selectedIndex == -1) return 0;
          else return parseInt($("#" + elem).val());
        else
        if (elem.selectedIndex == -1) return 0;
        else return parseInt($(elem).val());
      },
      selectedValue: function(elem) {
        /// <summary>获取select元素当前选中的值</summary>
        /// <param name="elem">元素ID或对象</param>
        if (typeof(elem) == "string" && elem.constructor == String)
          if (document.getElementById(elem).selectedIndex == -1) return "";
          else return $("#" + elem).val();
        else
        if (elem.selectedIndex == -1) return "";
        else return $(elem).val();
      },
      bind: function(data, elem, displayField, valueField, defaultValue) {
        /// <summary>把数据集绑定到select元素的option上</summary>
        /// <param name="data" type="Array">数据源</param>
        /// <param name="elem" type="String|Object">元素ID或对象</param>
        /// <param name="displayField" type="String">显示属性</param>
        /// <param name="valueField" type="String">值属性</param>
        /// <param name="defaultValue">默认值，可以不填</param>
        var obj;
        if (typeof(elem) == "string" && elem.constructor == String)
          obj = $("#" + elem);
        else
          obj = $(elem);

        obj.empty();
        $.each(data, function(i, n) {
          obj.append("<option value='" + String(n[valueField]) + "'>" + n[displayField] + "</option>");
        });
        if (defaultValue != undefined) {
          obj.val(defaultValue);
          if (obj.attr("selectedIndex") != -1) obj.change();
        }
      },
      bindFromArray: function(data, elem, defaultValue) {
        /// <summary>把数据集绑定到select元素的option上</summary>
        /// <param name="data" type="Array">数据源</param>
        /// <param name="elem" type="String|Object">元素ID或对象</param>
        /// <param name="defaultValue">默认值，可以不填</param>
        var obj;
        if (typeof(elem) == "string" && elem.constructor == String)
          obj = $("#" + elem);
        else
          obj = $(elem);

        obj.empty();
        for (var i = 0; i < data.length; i++) {
          obj.append("<option value='" + data[i] + "'>" + data[i] + "</option>");
        };
        if (defaultValue != undefined) {
          obj.val(defaultValue);
          if (obj.attr("selectedIndex") != -1) obj.change();
        }
      }
    },
    /*#endregion select */

    /*#region array */
    array: {
      indexOfByKeys: function(keys, values, arr) {
        /// <summary>查找键值在数组中的位置</summary>
        /// <param name="keys" type="Array">键数组</param>
        /// <param name="values" type="Array">值分组</param>
        /// <param name="arr" type="Array">数组</param>
        /// <returns type="Number" />
        if (values.length != keys.length) return -1;
        for (var i = 0; i < arr.length; i++) {
          var d = arr[i];
          var e = true;
          for (var j = 0; j < keys.length; j++) {
            if (d[keys[j]] != values[j]) {
              e = false;
              break;
            }
          }
          if (e) return i;
        }
        return -1;
      }
    },
    /*#endregion array */

    /*#region value */
    value: {
      isInt: function(v) {
        /// <summary>获取值是否为整数</summary>
        /// <param name="v" type="String">值</param>
        /// <returns type="Boolean" />
        if (v == null || v == undefined || v == "") return false;
        var s = "0123456789";
        for (var i = 0; i < v.length; i++)
          if (s.indexOf(v.substr(i, 1)) == -1) return false;

        return true;
      },
      isNumber: function(v) {
        /// <summary>获取值是否为数字</summary>
        /// <param name="v" type="String">值</param>
        /// <returns type="Boolean" />
        if (v == undefined || v == null || v == "") return false;
        var ex = /^\-{0,1}(?:[0-9]+){0,1}(?:\.[0-9]+){0,1}$/i;
        return ex.test(v);
      },
      isDate: function(v) {
        /// <summary>获取值是否为日期</summary>
        /// <param name="v" type="String">值</param>
        /// <returns type="Boolean" />
        if (v == undefined || v == null || v == "") return false;
        var reg = /^(\d+)-(\d{1,2})-(\d{1,2})$/;
        var r = v.match(reg);
        if (r == null) return false;
        var d = new Date(r[1], r[2], r[3]);
        if (d.getFullYear() != r[1]) return false;
        if (d.getMonth() != r[2]) return false;
        if (d.getDate() != r[3]) return false;
        return true;
      },
      isDateTime: function(v) {
        /// <summary>获取值是否为时间</summary>
        /// <param name="v" type="String">值</param>
        /// <returns type="Boolean" />
        if (v == undefined || v == null || v == "") return false;

        var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        var r = v.match(reg);
        if (r == null) return false;
        var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
        if (d.getFullYear() != r[1]) return false;
        if (d.getMonth() != r[2]) return false;
        if (d.getDate() != r[3]) return false;
        if (d.getHours() != r[4]) return false;
        if (d.getMinutes() != r[5]) return false;
        if (d.getSeconds() != r[6]) return false;
        return true;
      },
      isFunction: function(f) {
        /// <summary>判断是否为函数</summary>
        /// <param name="f" type="Function">函数体</param>
        return typeof(f) == "function";
      },
      includeInt: function(s) {
        var s1 = "0123456789";
        for (var i = 0; i < s.length; i++)
          if (s1.indexOf(s.substr(i, 1)) != -1) return true;

        return false;
      },
      is26Char: function(s) {
        var s1 = "abcdefghijklmnopqrstuvwxyz";
        var s2 = s.toLowerCase();
        for (var i = 0; i < s2.length; i++)
          if (s1.indexOf(s2.substr(i, 1)) != -1) return true;

        return false;
      },
      isOperend: function(s) {
        var s1 = "~!@#$%^&*()_=-+{}\[]'|";
        for (var i = 0; i < s.length; i++)
          if (s1.indexOf(s.substr(i, 1)) != -1) return true;
        return false;
      },
      formatDate: function(v, format) {
        /// <summary>格式化时间</summary>
        /// <param name="v" type="Date">时间的值，可能为null</param>
        /// <param name="format" type="String">格式化字符串</param>
        /// <returns type="String" />
        if (v == null && v == undefined) return "";
        else if (Object.prototype.toString.call(v) === '[object Date]')
          return v.format(format);
        else
          return v;
      },
      getDate: function(date) {
        /// <summary>获取当前系统日期，不包含时间</summary>
        /// <param name="date" type="Date">时间，不填时默认为new Date()</param>
        /// <returns type="Date" />
        if (date == undefined) date = new Date();
        return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
      },
      stringToDate: function(str) {
        /// <summary>把字符串转为Date类型</summary>
        /// <param name="str"></param>
        /// <returns type="Date" />
        var s = str.split(/\D/);
        if (s.length == 3)
          return new Date(s[0], --s[1], s[2]);
        else if (s.length == 6)
          return new Date(s[0], --s[1], s[2], s[3], s[4], s[5]);
        else
          return null;
      },
      daysOfMonth: function() {
        /// <summary>获取一个月的天数(两种参数，1:日期，2:年、月[0 到 11 之间])</summary>
        var year, month;
        if (arguments.length == 1) {
          year = arguments[0].getFullYear();
          month = arguments[0].getMonth();
        } else {
          year = arguments[0];
          month = arguments[1];
        }
        if ((new Date(year, month, 29)).getMonth() != month) return 28;
        if ((new Date(year, month, 30)).getMonth() != month) return 29;
        if ((new Date(year, month, 31)).getMonth() != month) return 30;
        return 31;
      },
      firstDateOfMonth: function() {
        /// <summary>获取一个月的第一天(两种参数，1:日期，2:年、月[0 到 11 之间])</summary>
        var year, month;
        if (arguments.length == 1) {
          year = arguments[0].getFullYear();
          month = arguments[0].getMonth();
        } else {
          year = arguments[0];
          month = arguments[1];
        }
        return new Date(year, month, 1);
      },
      lastDateOfMonth: function() {
        /// <summary>获取一个月的最后一天(两种参数，1:日期，2:年、月[0 到 11 之间])</summary>
        var year, month;
        if (arguments.length == 1) {
          year = arguments[0].getFullYear();
          month = arguments[0].getMonth();
        } else {
          year = arguments[0];
          month = arguments[1];
        }
        var days = helpers.value.daysOfMonth(year, month);
        return new Date(year, month, days);
      },
      textWidth: function(text, container) {
        /// <summary>计算文本宽度</summary>
        /// <param name="text"></param>
        /// <param name="container">文本容器</param>
        var sensor = $("<pre>" + text + "</pre>").css("display", "none");
        if (container == undefined || container == null)
          container = document.body;
        $(container).append(sensor);
        var width = sensor.width();
        sensor.remove();
        return width;
      }
    },
    /*#endregion value */

    /*#region page */
    page: {
      getPath: function() {
        return location.pathname;
      },
      getQueryString: function() {
        var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
        if (result == null) return "";

        for (var i = 0; i < result.length; i++) {
          result[i] = result[i].substring(1);
        }
        return result;
      },
      getQueryStringByName: function(name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1)
          return "";
        else
          return result[1];
      },
      getQueryIntByName: function(name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1)
          return 0;
        else
          return parseInt(result[1]);
      },
      getQueryFloatByName: function(name) {
        var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
        if (result == null || result.length < 1)
          return 0.00;
        else
          return parseFloat(result[1]);
      },
      htmlEncode: function(value) {
        var o = $('<div/>');
        var s = o.text(value).html();
        o.remove();
        return s;
      },
      htmlDecode: function(value) {
        var o = $('<div/>');
        var s = o.html(value).text();
        o.remove();
        return s;
      },
      textToHtml: function(txt) {
        if (txt == null || txt == undefined) return "";
        var s = "";
        for (var i = 0; i < txt.length; i++) {
          var c = txt.substr(i, 1);
          switch (c) {
            case "\n":
              s += "<br/>";
              break;
            case " ":
              s += "&nbsp;";
              break;
            case "<":
              s += "&lt;";
              break;
            case ">":
              s += "&gt;";
              break;
            case "\"":
              s += "&quot;";
              break;
            case "©":
              s += "&copy;";
              break; //版权
            case "®":
              s += "&reg;";
              break; //已注册商标
            default:
              s += c;
              break;
          }
        }
        return s;
      },
      htmlToText: function(html) {
        var t = html.replace(/<style([\s\S]*?)<\/style>/gi, '');
        var t = html.replace(/<script([\s\S]*?)<\/script>/gi, '');
        t = html.replace(/<[^>]+>/gi, "");
        t = t.replace(/&nbsp;/gi, "");
        t = t.replace(/\r/gi, "");
        t = t.replace(/\n/gi, "");
        t = t.replace(/\t/gi, "");
        t = t.replace(/ /gi, "");
        return t;
      }
    },
    /*#endregion value */

    /*#region ui */
    ui: {
      alert: function(msg, callback) {
        $.myAlert(msg, {}, callback);
      },
      confirm: function(msg, onYesCallback, onNoCallback) {
        $.myConfirm(msg, onYesCallback, onNoCallback, {});
      },
      prompt: function(e, msg) {
        if (typeof(e) == "string")
          e = window.document.getElementById(e);
        $(e).html(msg);
        $(e).show("fast");

        var l = msg.length * 2;
        l = Math.min(Math.max(l, 4), 60); //最长1分钟，最短4秒

        setTimeout(function() { $(e).hide("fast") }, l * 1000);
      },
      alertBar: function(msg) {
        var e = $("<div class='alertBar'>" + msg + "</div>");
        $(window.document.body).append(e);

        var l = msg.length * 0.4;
        l = Math.min(Math.max(l, 4), 60); //最长60秒，最短3秒

        setTimeout(function() { $(e).remove(); }, l * 1000);
      },
      alertHtml: function(msg, id) {
        var e = $("<i class='alertHtml'>" + msg + "</i>");
        $("#" + id).append(e);

        var l = msg.length * 0.4;
        l = Math.min(Math.max(l, 4), 30); //最长30秒，最短3秒
        setTimeout(function() { $(e).remove(); }, l * 1000);
      },
      disabled: function(args) {
        /// <summary>禁用元素</summary>
        /// <param name="args">对象数组或对象ID数组</param>
        for (var i = 0; i < arguments.length; i++) {
          var obj;
          if (typeof(arguments[i]) == "string")
            obj = $("#" + arguments[i]);
          else
            obj = $(arguments[i]);
          obj.prop("disabled", true);
        }
      },
      enabled: function(args) {
        /// <summary>启用元素</summary>
        /// <param name="args">对象数组或对象ID数组</param>
        for (var i = 0; i < arguments.length; i++) {
          var obj;
          if (typeof(arguments[i]) == "string")
            obj = $("#" + arguments[i]);
          else
            obj = $(arguments[i]);
          obj.prop("disabled", false);
        }
      }
    },
    /*#endregion ui */

    /*#region common */
    common: {
      clone: function(o) {
        /// <summary>克隆(深层复制)</summary>
        /// <param name="o" type="Object Array">克隆对象</param>
        /// <returns type="Object Array" />
        if (Object.prototype.toString.call(o) === '[object Array]') {
          buf = [];
          var i = o.length;
          while (i--) buf[i] = arguments.callee(o[i]);
          return buf;
        } else {
          // true：深层复制（一层一层往下复制直到最底层）             
          return $.extend(true, {}, o);
        }
      },
      copy: function(o) {
        /// <summary>复制(浅复制,只复制一层)</summary>
        /// <param name="o" type="Object Array">复制对象</param>
        /// <returns type="Object Array" />
        if (Object.prototype.toString.call(o) === '[object Array]') {
          buf = [];
          var i = o.length;
          while (i--) buf[i] = arguments.callee(o[i]);
          return buf;
        } else {
          return $.extend({}, o);
        }
      },
      type: function(o) {
        /// <summary>获取对象的类型</summary>
        /// <param name="o" type="Object">对象</param>
        var _types = {
          'undefined': 'undefined',
          'number': 'number',
          'boolean': 'boolean',
          'string': 'string',
          '[object Function]': 'function',
          '[object RegExp]': 'regexp',
          '[object Array]': 'array',
          '[object Date]': 'date',
          '[object Error]': 'error'
        };
        return _types[typeof(o)] || _types[Object.prototype.toString.call(o)] || (o ? 'object' : 'null');
      },
      isNullOrEmpty: function(o) {
        /// <summary>判断字符串是否为空值</summary>
        /// <param name="o" type="String">对象</param>
        /// <returns type="Boolean" />
        var t = typeof(o);
        return (t == "undefined") || (t == "string" && t == "") || (t == "object" && t == null);
      },
      isEmptyObject: function(obj) {
        /// <summary>判断对象是否为空值</summary>
        /// <param name="o" type="Object Array">对象</param>
        /// <returns type="Boolean" />
        for (var o in obj) return false;
        return true;
      },
      hasAttr: function(o, attr) {
        /// <summary>判断对象是否存在某个属性</summary>
        /// <param name="o" type="Object">对象</param>
        /// <param name="attr" type="String">属性名称</param>
        /// <returns type="Boolean" />
        return typeof(obj.attr(attr)) != "undefined";
      }
    },
    /*#endregion common */
  };

  window.helpers = helpers;
})(window);
/*#endregion */


#
函数声明提升
Js代码分为两个阶段： 编译阶段和执行阶段

Js代码的编译阶段会找到所有的声明， 并用合适的作用域将它们关联起来， 这是词法作用域的核心内容

包括变量声明(var a) 和函数声明(function a() {}) 在内的所有声明都会在代码被执行前的编译阶段首先被处理



过程就好像变量声明和函数声明从他们代码中出现的位置被移动到执行环境的顶部， 这个过程就叫做提升

只有声明操作会被提升， 赋值和逻辑操作会被留在原地等待执行

// 判断是否为手机号  
isPoneAvailable: function(pone) {
    var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!myreg.test(pone)) {
      return false;
    } else {
      return true;
    }
  },


  // 正则
  1 数字： ^ [0 - 9] * $

2 n位的数字： ^ \d { n } $

3 至少n位的数字： ^ \d { n, } $

4 m - n位的数字： ^ \d { m, n } $

5 零和非零开头的数字： ^ (0 | [1 - 9][0 - 9] * ) $

6 非零开头的最多带两位小数的数字： ^ ([1 - 9][0 - 9] * ) + (. [0 - 9] { 1, 2 }) ? $

7 带1 - 2 位小数的正数或负数： ^ (\-) ? \d + (\.\d { 1, 2 }) ? $

8 正数、 负数、 和小数： ^ (\- | \+) ? \d + (\.\d + ) ? $

9 有两位小数的正实数： ^ [0 - 9] + (. [0 - 9] { 2 }) ? $

10 有1~3 位小数的正实数： ^ [0 - 9] + (. [0 - 9] { 1, 3 }) ? $

11 非零的正整数： ^ [1 - 9]\ d * $ 或 ^ ([1 - 9][0 - 9] * ) { 1, 3 } $ 或 ^ \+ ? [1 - 9][0 - 9] * $

12 非零的负整数： ^ \-[1 - 9][] 0 - 9 "*$ 或 ^-[1-9]\d*$

13 非负整数： ^ \d + $ 或 ^ [1 - 9]\ d * | 0 $

14 非正整数： ^ -[1 - 9]\ d * | 0 $ 或 ^ ((-\d + ) | (0 + )) $

15 非负浮点数： ^ \d + (\.\d + ) ? $ 或 ^ [1 - 9]\ d * \.\d * | 0\.\d * [1 - 9]\ d * | 0 ? \.0 + | 0 $

16 非正浮点数： ^ ((-\d + (\.\d + ) ? ) | (0 + (\.0 + ) ? )) $ 或 ^ (-([1 - 9]\ d * \.\d * | 0\.\d * [1 - 9]\ d * )) | 0 ? \.0 + | 0 $

17 正浮点数： ^ [1 - 9]\ d * \.\d * | 0\.\d * [1 - 9]\ d * $ 或 ^ (([0 - 9] + \. [0 - 9] * [1 - 9][0 - 9] * ) | ([0 - 9] * [1 - 9][0 - 9] * \. [0 - 9] + ) | ([0 - 9] * [1 - 9][0 - 9] * )) $

18 负浮点数： ^ -([1 - 9]\ d * \.\d * | 0\.\d * [1 - 9]\ d * ) $ 或 ^ (-(([0 - 9] + \. [0 - 9] * [1 - 9][0 - 9] * ) | ([0 - 9] * [1 - 9][0 - 9] * \. [0 - 9] + ) | ([0 - 9] * [1 - 9][0 - 9] * ))) $

19 浮点数： ^ (- ? \d + )(\.\d + ) ? $ 或 ^ - ? ([1 - 9]\ d * \.\d * | 0\.\d * [1 - 9]\ d * | 0 ? \.0 + | 0) $



// Web Workers start
var w;

function startWorker() {
  if (typeof(Worker) !== "undefined") {
    if (typeof(w) == "undefined") {
      w = new Worker("demo_workers.js");
    }
    w.onmessage = function(event) {
      document.getElementById("result").innerHTML = event.data;
    };
  } else {
    document.getElementById("result").innerHTML = "Sorry, your browser
    does not support Web Workers...";
  }
}

function stopWorker() {
  w.terminate();
}
// Web Workers end


// window 失去焦点，停止输出
window.onblur = function() {};
// window 每次获得焦点
window.onfocus = function() {}





var ua = window.navigator.userAgent;







//javascript通过navigator.userAgent识别各种浏览器
function userBrowser() {
  var browserName = navigator.userAgent.toLowerCase();

  console.log(browserName);
  if (/msie/i.test(browserName) && !/opera/.test(browserName)) {
    alert("IE");
    return;
  } else if (/firefox/i.test(browserName)) {
    alert("Firefox");
    return;
  } else if (/wxwork/i.test(browserName)) {
    alert("wxwork");
    return;
  } else if (/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)) {
    alert("Chrome");
    return;
  } else if (/opera/i.test(browserName)) {
    alert("Opera");
    return;
  } else if (/webkit/i.test(browserName) && !(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))) {
    alert("Safari");
    return;
  } else {
    alert("unKnow");
  }
}

// 倒计时
// html
<
div id = "J-countdown" >
  <
  span id = "day" > < /span> <
span id = "hour" > < /span> <
span id = "min" > < /span> <
span id = "sec" > < /span> < /
div >
  // js

  function ShowCountDown(year, month, day, hour, min, sec, divname) {
    var now = new Date();
    var endDate = new Date(year, month - 1, day, hour, min, sec);
    var leftTime = endDate.getTime() - now.getTime();
    var leftsecond = parseInt(leftTime / 1000);
    //var day1=parseInt(leftsecond/(24*60*60*6)); 
    var day1 = Math.floor(leftsecond / (60 * 60 * 24));
    var hour = Math.floor((leftsecond - day1 * 24 * 60 * 60) / 3600);
    var minute = Math.floor((leftsecond - day1 * 24 * 60 * 60 - hour * 3600) / 60);
    var second = Math.floor(leftsecond - day1 * 24 * 60 * 60 - hour * 3600 - minute * 60);
    var cc = document.getElementById(divname);
    var oDay = document.getElementById('day');
    var oHour = document.getElementById('hour');
    var oMin = document.getElementById('min');
    var oSec = document.getElementById('sec');
    oDay.innerHTML = day1;
    oHour.innerHTML = hour;
    oMin.innerHTML = minute;
    oSec.innerHTML = second;
    // cc.innerHTML = "脚本之家提示距离" + year + "年" + month + "月" + day + "日还有：" + day1 + "天" + hour + "小时" + minute + "分" + second + "秒";
    oMin.innerHTML = minute;
  }
window.onload = function() {
  window.setTimeout(function() {
    ShowCountDown(2018, 3, 27, 15, 0, 0, 'J-countdown');
  }, 0);
}
window.setInterval(function() {
  ShowCountDown(2018, 3, 27, 15, 0, 0, 'J-countdown');
}, 1000);
















// 阻止浏览器关闭
window.onbeforeunload = function(event) {
    return '关闭本窗口即放弃考试！';
  }


  //倒数

  <
  div id = "timer"
style = "color:red" > < /div> <
div id = "warring"
style = "color:red" > < /div>
var maxtime = 50 * 60; //一个小时，按秒计算，自己调整!   
function CountDown() {
  if (maxtime >= 0) {
    minutes = Math.floor(maxtime / 60);
    seconds = Math.floor(maxtime % 60);
    msg = "距离结束还有" + minutes + "分" + seconds + "秒";
    document.all["timer"].innerHTML = msg;
    if (maxtime == 5 * 60) alert("还剩5分钟");
    --maxtime;
  } else {
    clearInterval(timer);
    alert("时间到，结束!");
  }
}
window.onload = function() {
  setTimeout("CountDown()", 0);
}
timer = setInterval("CountDown()", 1000);



// 到一天中的什么时间才去做事情
var curDate = new Date(),
  iCurYear = curDate.getFullYear(),
  iCurMonth = curDate.getMonth(),
  iCurDate = curDate.getDate(),
  iTargetTime = new Date(iCurYear, iCurMonth, iCurDate, 12, 0, 0).getTime(),
  icurTime = curDate.getTime();
console.log(icurTime);
console.log(iTargetTime);
console.log(icurTime < iTargetTime);


stopPropagation();


// html拼接
var oFragmeng = document.createDocumentFragment();
for (var i = 0, len = resultA.length; i < len; i++) {
  var index = (result.res[t].type == 'A') ? (i + 1) : (result.res[0].question.length + i + 1);

  var sLi = '<li id="' + index + '" class="J-question"  data-id="' + resultA[i].id + '"><p class="title"><i>' + index + '.</i>' + resultA[i].question + '</p>';
  for (var j = 0, aswLen = resultA[i].answer.length; j < aswLen; j++) {

    if (result.res[t].type == 'A') {
      sLi += '<label><input type="radio" name="' + resultA[i].id + '" value="' + resultA[i].answer[j].code + '">' + resultA[i].answer[j].content + '</label>';
    } else if (result.res[t].type == 'B') {
      sLi += '<label><input type="checkbox" name="' + resultA[i].id + '" value="' + resultA[i].answer[j].code + '">' + resultA[i].answer[j].content + '</label>';
    }
  }
  sLi += '</li>';
  oFragmeng.appendChild($(sLi)[0]);

  // 输入间隔再请求接口

  var timeoutAuto = 0;
  clearTimeout(timeoutAuto);
  timeoutAuto = setTimeout(function() {
    //.....
  }, 200);