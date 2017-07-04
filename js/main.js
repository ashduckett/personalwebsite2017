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

    // Handle contact form submission
    $('.submit-contact').click(function(event) {

        console.log('You clicked submit');
        
        // AJAX the info over
        var name = $('#nameField').val();
        var email = $('#emailField').val();
        var message = $('#messageField').val();


        console.log('Your name is ' + name);
        console.log('Your email is ' + email);
        console.log('Your message is ' + message);

        $.post("../contact_form.php", {name: name, email: email, message: message}, function(data) {
            
        });

        event.preventDefault();        

        
    });
});