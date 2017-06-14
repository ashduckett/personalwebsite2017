$(document).ready(function() {
    console.log('We are off!');

    $(window).scroll(function() {
        console.log('scrolling!');
        var scrollTop = $(document).scrollTop();
        console.log('scrollTop is ' + scrollTop);

        if(scrollTop >= 300) {
            console.log('hitting');
            $('.s').addClass('shrunk-nav');
            $('.brand h2').addClass('shrunk-brand');
        } else {
            $('.s').removeClass('shrunk-nav');
            $('.brand h2').removeClass('shrunk-brand');
        }
    });
});