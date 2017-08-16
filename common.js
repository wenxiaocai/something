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
var RegPst = /^(?![a-zA-z]+$)(?!\d+$)(?![!+@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/;



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