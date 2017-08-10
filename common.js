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