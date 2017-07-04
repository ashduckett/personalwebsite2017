$(document).ready(function() {

    $(window).scroll(function() {
        var scrollTop = $(document).scrollTop();

        if(scrollTop >= 300) {
            $('.s').addClass('shrunk-nav');
            $('.brand h2').addClass('shrunk-brand');
        } else {
            $('.s').removeClass('shrunk-nav');
            $('.brand h2').removeClass('shrunk-brand');
        }
    });

    $('.portfolio-item').mouseover(function() {
        $(this).children('.portfolio-item-overlay').css('opacity', '0.9');
        $(this).children('.portfolio-image').addClass('portfolio-item-zoomed');
    });

    $('.portfolio-item').mouseleave(function() {
        $(this).children('.portfolio-item-overlay').css('opacity', '0');
        $(this).children('.portfolio-image').removeClass('portfolio-item-zoomed');

    });
});