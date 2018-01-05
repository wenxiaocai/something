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
function placeholderPic() {
    var w = document.documentElement.offsetWidth;
    document.documentElement.style.fontSize = w / 32 + 'px';
}
placeholderPic();
window.onresize = function() {
    placeholderPic();
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
(function ($) {
    $.myLoading = function () {
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


        if (!window.myTopLayoutIndex) window.myTopLayoutIndex = 100; else window.myTopLayoutIndex = window.myTopLayoutIndex + 1;
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
            init: function (options) {
                this.options = options;
                create(options);
                return this;
            },
            show: function () {
                show(this.options);
            },
            close: function () {
                close(this.options);
            }
        }
    }
})(jQuery);
/*#endregion*/

/*#region myDialog*/
(function ($) {
    $.myDialog = function (options) {
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
        if (!window.myTopLayoutIndex) window.myTopLayoutIndex = 100; else window.myTopLayoutIndex = window.myTopLayoutIndex + 1;
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
                if (typeof (btn) == "string")
                    $("#" + btn).appendTo(btnContainer);
                else
                    $(btnContainer).append(btn);
            }
        }
        else {
            $(btnContainer).css("display", "none");
        }

        var closeBtn = $(titlebar).find("[data-type='close']")[0];
        $(closeBtn).click(function () {
            close(op);
        });
        $(window).resize(function () {
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
            init: function (options) {
                this.options = options;
                create(options);
                return this;
            },
            show: function () {
                show(this.options);
            },
            close: function () {
                close(this.options);
            },
            setTitle: function (title) {
                this.options.title = title;
                setTitle(this.options);
            }
        }
    }
})(jQuery);
/*#endregion*/

/*#region myAlert*/
(function ($) {
    $.myAlert = function (msg, options, callback) {
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
        if (!window.myTopLayoutIndex) window.myTopLayoutIndex = 100; else window.myTopLayoutIndex = window.myTopLayoutIndex + 1;
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
        $(closeBtn).click(function () {
            if (callback != null && callback != undefined)
                callback();
            close(options);
        });

        var okBtn = $(footbar).find("[data-type='ok']")[0];
        $(okBtn).click(function () {
            if (callback != null && callback != undefined)
                callback();
            close(options);
        });

        $(window).resize(function () {
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
            init: function (options, callback) {
                this.options = options;
                create(options, callback);
                return this;
            },
            show: function (msg) {
                show(this.options, msg);
            },
            close: function () {
                close(this.options);
            }
        }
    }
})(jQuery);
/*#endregion*/

/*#region myConfirm*/
(function ($) {
    $.myConfirm = function (msg, yesCallback, noCallback, options) {
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
        if (!win.myTopLayoutIndex) win.myTopLayoutIndex = 100; else win.myTopLayoutIndex = win.myTopLayoutIndex + 1;
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
        $(btnYes).click(function () {
            if (yesCallback != null && yesCallback != undefined)
                yesCallback();
            close(options);
        });
        var btnNo = $(footbar).find("[data-type='no']")[0];
        $(btnNo).click(function () {
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

        var x = ($(win).width() - options.width*2) / 2;
        var y = ($(win).height() - options.height*2) / 2;
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
            init: function (msg, yesCallback, noCallback, options) {
                this.options = options;
                create(msg, yesCallback, noCallback, options);
                return this;
            },
            show: function (msg) {
                show(this.options, msg);
            },
            close: function () {
                close(this.options);
            }
        }
    }
})(jQuery);
/*#endregion*/

/*#region myUpload */
(function ($) {
    $.myUpload = function (options) {
        var defaults = {
            method: 'POST',
            dataType: "json",
            url: '',
            fileId: '',
            requestHeaders: {}, //{'upload': 'ajax-reqeust'}
            progressbar: null,
            xhr: null,
            success: function (obj) { },
            error: function (statusText) { },
            progress: function (loaded, total) { }
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
        xhr.onreadystatechange = function () {
            switch (xhr.readyState) {
                case 1: loading(options); break;
                case 2: loaded(options); break;
                case 3: interactive(options); break;
                case 4:
                    complete(options, xhr.status, xhr.statusText, xhr.responseText, xhr.responseXML);
                    break;
            }
        };

        if (xhr.upload && options.progress) {
            xhr.upload.addEventListener('progress', function (e) {
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
        $(input).change(function (e) {
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

    function loaded(options) { }

    function interactive(options) { }

    function createPlugin() {
        return {
            options: null,
            init: function (options) {
                this.options = options;
                create(this.options);
                return this;
            },
            setUrl: function (url) {
                this.options.url = url;
            },
            upload: function () {
                upload(this.options);
            }
        }
    }
})(jQuery);
/*#endregion */

/*#region helpers */
(function (window, undefined) {
    var helpers = {
        /*#region json */
        json: {
            parse: function (str) {
                /// <summary>把json字符串转为对象</summary>
                /// <param name="str">json字符串</param>
                //过滤日期,把.net返回的\Date()\转为 new Date(),自动生成时间对象
                var s = str.replace(/"\\\/(Date\([0-9-]+\))\\\/"/gi, "new $1");

                return eval("(" + s + ")");
            },
            parseToDate: function (str) {
                /// <summary>把/Date(1391184000000)\转为Date</summary>
                /// <param name="str">json字符串</param>
                str = "new " + str.replace("/", "").replace("/", "");
                return eval("(" + str + ")");
            }
        },
        /*#endregion */

        /*#region cookie */
        cookie: {
            set: function (name, value, hour) {
                if (hour != undefined && hour != null) {
                    var exp = new Date();
                    exp.setTime(exp.getTime() + hour * 60 * 60 * 1000);
                    window.document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
                }
                else
                    window.document.cookie = name + "=" + escape(value);
            },
            get: function (name) {
                var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
                if (arr != null) return unescape(arr[2]); return null;
            },
            del: function (name) {
                var exp = new Date();
                exp.setTime(exp.getTime() - 1);
                var cval = helpers.cookie.get(name);
                if (cval != null) window.document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
            }
        },
        /*#endregion */

        /*#region checkbox */
        checkbox: {
            isChecked: function (elem) {
                if (typeof (elem) == "string" && elem.constructor == String)
                    return $("#" + elem).is(":checked");
                else
                    return $(elem).is(":checked");
            },
            checked: function (elem, isChecked) {
                var obj;
                if (typeof (elem) == "string" && elem.constructor == String)
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
            getValue: function (name) {
                /// <summary>获取radio选中项的value</summary>
                /// <param name="name" type="String">元素name属性</param>
                return $("input[name='" + name + "']:checked").val();
            },
            setValue: function (name, value) {
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
            selectedText: function (elem) {
                /// <summary>获取select元素当前选中的文本</summary>
                /// <param name="elem" type="String/Object">元素ID或对象</param>
                /// <returns type="String" />
                var obj;
                if (typeof (elem) == "string" && elem.constructor == String)
                    obj = $("#" + elem);
                else
                    obj = $(elem);
                return obj.find("option:selected").text();
            },
            selectedIndex: function (elem) {
                /// <summary>获取select元素当前选中的索引</summary>
                /// <param name="elem" type="String/Object">元素ID或对象</param>
                /// <returns type="Int" />
                if (typeof (elem) == "string" && elem.constructor == String)
                    return document.getElementById(elem).selectedIndex;
                else
                    return elem.selectedIndex;
            },
            val: function (elem, value, invokeOnchange) {
                /// <summary>设置select的值</summary>
                /// <param name="elem" type="String/Object">元素ID或对象</param>
                /// <param name="value">值</param>
                var e;
                if (typeof (elem) == "string" && elem.constructor == String)
                    e = $("#" + elem);
                else
                    e = $(elem);
                e.val(value);
            },
            selectedIntValue: function (elem) {
                /// <summary>获取select元素当前选中的Int值</summary>
                /// <param name="elem" type="String/Object">元素ID或对象</param>
                /// <returns type="Int" />
                if (typeof (elem) == "string" && elem.constructor == String)
                    if (document.getElementById(elem).selectedIndex == -1) return 0; else return parseInt($("#" + elem).val());
                else
                    if (elem.selectedIndex == -1) return 0; else return parseInt($(elem).val());
            },
            selectedValue: function (elem) {
                /// <summary>获取select元素当前选中的值</summary>
                /// <param name="elem">元素ID或对象</param>
                if (typeof (elem) == "string" && elem.constructor == String)
                    if (document.getElementById(elem).selectedIndex == -1) return ""; else return $("#" + elem).val();
                else
                    if (elem.selectedIndex == -1) return ""; else return $(elem).val();
            },
            bind: function (data, elem, displayField, valueField, defaultValue) {
                /// <summary>把数据集绑定到select元素的option上</summary>
                /// <param name="data" type="Array">数据源</param>
                /// <param name="elem" type="String|Object">元素ID或对象</param>
                /// <param name="displayField" type="String">显示属性</param>
                /// <param name="valueField" type="String">值属性</param>
                /// <param name="defaultValue">默认值，可以不填</param>
                var obj;
                if (typeof (elem) == "string" && elem.constructor == String)
                    obj = $("#" + elem);
                else
                    obj = $(elem);

                obj.empty();
                $.each(data, function (i, n) {
                    obj.append("<option value='" + String(n[valueField]) + "'>" + n[displayField] + "</option>");
                });
                if (defaultValue != undefined) {
                    obj.val(defaultValue);
                    if (obj.attr("selectedIndex") != -1) obj.change();
                }
            },
            bindFromArray: function (data, elem, defaultValue) {
                /// <summary>把数据集绑定到select元素的option上</summary>
                /// <param name="data" type="Array">数据源</param>
                /// <param name="elem" type="String|Object">元素ID或对象</param>
                /// <param name="defaultValue">默认值，可以不填</param>
                var obj;
                if (typeof (elem) == "string" && elem.constructor == String)
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
            indexOfByKeys: function (keys, values, arr) {
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
            isInt: function (v) {
                /// <summary>获取值是否为整数</summary>
                /// <param name="v" type="String">值</param>
                /// <returns type="Boolean" />
                if (v == null || v == undefined || v == "") return false;
                var s = "0123456789";
                for (var i = 0; i < v.length; i++)
                    if (s.indexOf(v.substr(i, 1)) == -1) return false;

                return true;
            },
            isNumber: function (v) {
                /// <summary>获取值是否为数字</summary>
                /// <param name="v" type="String">值</param>
                /// <returns type="Boolean" />
                if (v == undefined || v == null || v == "") return false;
                var ex = /^\-{0,1}(?:[0-9]+){0,1}(?:\.[0-9]+){0,1}$/i;
                return ex.test(v);
            },
            isDate: function (v) {
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
            isDateTime: function (v) {
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
            isFunction: function (f) {
                /// <summary>判断是否为函数</summary>
                /// <param name="f" type="Function">函数体</param>
                return typeof (f) == "function";
            },
            includeInt: function (s) {
                var s1 = "0123456789";
                for (var i = 0; i < s.length; i++)
                    if (s1.indexOf(s.substr(i, 1)) != -1) return true;

                return false;
            },
            is26Char: function (s) {
                var s1 = "abcdefghijklmnopqrstuvwxyz";
                var s2 = s.toLowerCase();
                for (var i = 0; i < s2.length; i++)
                    if (s1.indexOf(s2.substr(i, 1)) != -1) return true;

                return false;
            },
            isOperend: function (s) {
                var s1 = "~!@#$%^&*()_=-+{}\[]'|";
                for (var i = 0; i < s.length; i++)
                    if (s1.indexOf(s.substr(i, 1)) != -1) return true;
                return false;
            },
            formatDate: function (v, format) {
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
            getDate: function (date) {
                /// <summary>获取当前系统日期，不包含时间</summary>
                /// <param name="date" type="Date">时间，不填时默认为new Date()</param>
                /// <returns type="Date" />
                if (date == undefined) date = new Date();
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
            },
            stringToDate: function (str) {
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
            daysOfMonth: function () {
                /// <summary>获取一个月的天数(两种参数，1:日期，2:年、月[0 到 11 之间])</summary>
                var year, month;
                if (arguments.length == 1) {
                    year = arguments[0].getFullYear();
                    month = arguments[0].getMonth();
                }
                else {
                    year = arguments[0];
                    month = arguments[1];
                }
                if ((new Date(year, month, 29)).getMonth() != month) return 28;
                if ((new Date(year, month, 30)).getMonth() != month) return 29;
                if ((new Date(year, month, 31)).getMonth() != month) return 30;
                return 31;
            },
            firstDateOfMonth: function () {
                /// <summary>获取一个月的第一天(两种参数，1:日期，2:年、月[0 到 11 之间])</summary>
                var year, month;
                if (arguments.length == 1) {
                    year = arguments[0].getFullYear();
                    month = arguments[0].getMonth();
                }
                else {
                    year = arguments[0];
                    month = arguments[1];
                }
                return new Date(year, month, 1);
            },
            lastDateOfMonth: function () {
                /// <summary>获取一个月的最后一天(两种参数，1:日期，2:年、月[0 到 11 之间])</summary>
                var year, month;
                if (arguments.length == 1) {
                    year = arguments[0].getFullYear();
                    month = arguments[0].getMonth();
                }
                else {
                    year = arguments[0];
                    month = arguments[1];
                }
                var days = helpers.value.daysOfMonth(year, month);
                return new Date(year, month, days);
            },
            textWidth: function (text, container) {
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
            getPath: function () {
                return location.pathname;
            },
            getQueryString: function () {
                var result = location.search.match(new RegExp("[\?\&][^\?\&]+=[^\?\&]+", "g"));
                if (result == null) return "";

                for (var i = 0; i < result.length; i++) {
                    result[i] = result[i].substring(1);
                }
                return result;
            },
            getQueryStringByName: function (name) {
                var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
                if (result == null || result.length < 1)
                    return "";
                else
                    return result[1];
            },
            getQueryIntByName: function (name) {
                var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
                if (result == null || result.length < 1)
                    return 0;
                else
                    return parseInt(result[1]);
            },
            getQueryFloatByName: function (name) {
                var result = location.search.match(new RegExp("[\?\&]" + name + "=([^\&]+)", "i"));
                if (result == null || result.length < 1)
                    return 0.00;
                else
                    return parseFloat(result[1]);
            },
            htmlEncode: function (value) {
                var o = $('<div/>');
                var s = o.text(value).html();
                o.remove();
                return s;
            },
            htmlDecode: function (value) {
                var o = $('<div/>');
                var s = o.html(value).text();
                o.remove();
                return s;
            },
            textToHtml: function (txt) {
                if (txt == null || txt == undefined) return "";
                var s = "";
                for (var i = 0; i < txt.length; i++) {
                    var c = txt.substr(i, 1);
                    switch (c) {
                        case "\n": s += "<br/>"; break;
                        case " ": s += "&nbsp;"; break;
                        case "<": s += "&lt;"; break;
                        case ">": s += "&gt;"; break;
                        case "\"": s += "&quot;"; break;
                        case "©": s += "&copy;"; break; //版权
                        case "®": s += "&reg;"; break; //已注册商标
                        default: s += c; break;
                    }
                }
                return s;
            },
            htmlToText: function (html) {
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
            alert: function (msg, callback) {
                $.myAlert(msg, {}, callback);
            },
            confirm: function (msg, onYesCallback, onNoCallback) {
                $.myConfirm(msg, onYesCallback, onNoCallback, {});
            },
            prompt: function (e, msg) {
                if (typeof (e) == "string")
                    e = window.document.getElementById(e);
                $(e).html(msg);
                $(e).show("fast");

                var l = msg.length * 2;
                l = Math.min(Math.max(l, 4), 60); //最长1分钟，最短4秒

                setTimeout(function () { $(e).hide("fast") }, l * 1000);
            },
            alertBar: function (msg) {
                var e = $("<div class='alertBar'>" + msg + "</div>");
                $(window.document.body).append(e);

                var l = msg.length * 0.4;
                l = Math.min(Math.max(l, 4), 60); //最长60秒，最短3秒

                setTimeout(function () { $(e).remove(); }, l * 1000);
            },
            alertHtml: function (msg, id) {
                var e = $("<i class='alertHtml'>" + msg + "</i>");
                $("#" + id).append(e);

                var l = msg.length * 0.4;
                l = Math.min(Math.max(l, 4), 30); //最长30秒，最短3秒
                setTimeout(function () { $(e).remove(); }, l * 1000);
            },
            disabled: function (args) {
                /// <summary>禁用元素</summary>
                /// <param name="args">对象数组或对象ID数组</param>
                for (var i = 0; i < arguments.length; i++) {
                    var obj;
                    if (typeof (arguments[i]) == "string")
                        obj = $("#" + arguments[i]);
                    else
                        obj = $(arguments[i]);
                    obj.prop("disabled", true);
                }
            },
            enabled: function (args) {
                /// <summary>启用元素</summary>
                /// <param name="args">对象数组或对象ID数组</param>
                for (var i = 0; i < arguments.length; i++) {
                    var obj;
                    if (typeof (arguments[i]) == "string")
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
            clone: function (o) {
                /// <summary>克隆(深层复制)</summary>
                /// <param name="o" type="Object Array">克隆对象</param>
                /// <returns type="Object Array" />
                if (Object.prototype.toString.call(o) === '[object Array]') {
                    buf = [];
                    var i = o.length;
                    while (i--) buf[i] = arguments.callee(o[i]);
                    return buf;
                }
                else {
                    // true：深层复制（一层一层往下复制直到最底层）             
                    return $.extend(true, {}, o);
                }
            },
            copy: function (o) {
                /// <summary>复制(浅复制,只复制一层)</summary>
                /// <param name="o" type="Object Array">复制对象</param>
                /// <returns type="Object Array" />
                if (Object.prototype.toString.call(o) === '[object Array]') {
                    buf = [];
                    var i = o.length;
                    while (i--) buf[i] = arguments.callee(o[i]);
                    return buf;
                }
                else {
                    return $.extend({}, o);
                }
            },
            type: function (o) {
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
                return _types[typeof (o)] || _types[Object.prototype.toString.call(o)] || (o ? 'object' : 'null');
            },
            isNullOrEmpty: function (o) {
                /// <summary>判断字符串是否为空值</summary>
                /// <param name="o" type="String">对象</param>
                /// <returns type="Boolean" />
                var t = typeof (o);
                return (t == "undefined") || (t == "string" && t == "") || (t == "object" && t == null);
            },
            isEmptyObject: function (obj) {
                /// <summary>判断对象是否为空值</summary>
                /// <param name="o" type="Object Array">对象</param>
                /// <returns type="Boolean" />
                for (var o in obj) return false;
                return true;
            },
            hasAttr: function (o, attr) {
                /// <summary>判断对象是否存在某个属性</summary>
                /// <param name="o" type="Object">对象</param>
                /// <param name="attr" type="String">属性名称</param>
                /// <returns type="Boolean" />
                return typeof (obj.attr(attr)) != "undefined";
            }
        },
        /*#endregion common */
    };

    window.helpers = helpers;
})(window);
/*#endregion */