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
    document.documentElement.style.fontSize = w / 20 + 'px';
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