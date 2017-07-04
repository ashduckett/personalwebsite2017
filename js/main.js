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
        var self = this;

        // AJAX the info over
        var name = $('#nameField').val();
        var email = $('#emailField').val();
        var message = $('#messageField').val();

        $(this).prop('disabled', true);

        $.post("../contact_form.php", {name: name, email: email, message: message}, function(data) {
            $('#contact-form-feedback > p').html('Thanks for getting in touch. I\'ll get back to you as soon as I can.');
            $(self).prop('disabled', false);

            // There might be a one hit method for this in jQuery?
            $('#nameField').val('');
            $('#emailField').val('');
            $('#messageField').val('');

        });
        event.preventDefault();        
    });
});