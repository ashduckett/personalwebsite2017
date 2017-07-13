$(document).ready(function() {
    // This could probably just be stored in json. Maybe even a database.
    let PortfolioItem = function(title, screenshotUrl, techUsed, linkLive, linkGithub, desc) {
        this.title = title
        this.screenshotUrl = screenshotUrl
        this.techUsed = techUsed
        this.linkLive = linkLive
        this.linkGithub = linkGithub
        this.desc = desc
    };

    let frogger = new PortfolioItem('Frogger', 'img/frogger.png', 'OOP JavaScript/Canvas', 'http://www.ashduckett.com/frogger', 'https://github.com/ashduckett/FEND-Frogger', 'Description');
    let krays = new PortfolioItem('Kray Twins Atlas', 'img/krays.png', 'OOP JavaScript/Canvas', 'http://www.ashduckett.com/kraymap', 'https://github.com/ashduckett/Neighbourhood-Map', 'Description');
    let shout = new PortfolioItem('Shout', 'img/shout.png', 'PHP/JS/jQuery', '#', 'https://github.com/ashduckett/shout', 'Description');
    let ashios = new PortfolioItem('Ashios', 'img/ashios.png', 'Docs/jQuery', '#', 'https://github.com/ashduckett/ashios', 'Description');
    let myreads = new PortfolioItem('My Reads', 'img/myreads.png', 'React/ECMAScript6', 'https://fast-tundra-20236.herokuapp.com/', 'https://github.com/ashduckett/MyReads', 'Description');

    let PortfolioSet = function(title, items) {
        this.title = title
        this.items = items
    };


    PortfolioSet.prototype.createLink = function(href, iconName) {
        let portfolioUrl = $(document.createElement('div'));
        portfolioUrl.addClass('portfolio-url');

        let span = $(document.createElement('span'));
        let anchor = $(document.createElement('a'));

        anchor.prop('href', href)
        anchor.prop('target', '_blank');

        let iThing = $(document.createElement('i'));
        iThing.addClass('fa');
        iThing.addClass(iconName);
        iThing.prop('aria-hidden', 'true');

        anchor.append(iThing);

        portfolioUrl.append(span);
        span.append(anchor);
        return portfolioUrl;

    }

    PortfolioSet.prototype.draw = function(element) {
        // Create the main header
        element.append('<h2>' + this.title + '</h2>');

        let portfolioRow = $(document.createElement('div'));
        portfolioRow.addClass('portfolio-row');

        for (item of this.items) {

            // To the portfolio row, we add a div called portfolio item
            let portfolioItem = $(document.createElement('div'));
            portfolioItem.addClass('portfolio-item');
            portfolioRow.append(portfolioItem);

            // Create an image
            let portfolioImage = $(document.createElement('img'));
            portfolioImage.addClass('portfolio-image');
            portfolioImage.prop('src', item.screenshotUrl);

            let portfolioOverlay = $(document.createElement('div'));
            portfolioOverlay.addClass('portfolio-item-overlay');

            let links = $(document.createElement('div'));

            let portfolioOverlayDiv = $(document.createElement('div'));
            portfolioOverlayDiv.addClass('links');

            portfolioOverlayDiv.append('<h3>' + item.title + '</h3>');
            portfolioOverlayDiv.append('<h4>' + item.techUsed + '</h4>');


            let liveLink 
            
            if(item.linkLive !== null) {
                liveLink = this.createLink(item.linkLive, 'fa-play');
                portfolioOverlayDiv.append(liveLink);
            }

            
            let githubLink = this.createLink(item.linkGithub, 'fa-github');
            let descLink = this.createLink(item.linkGithub, 'fa-info-circle');

            
            portfolioOverlayDiv.append(githubLink);
            portfolioOverlayDiv.append(descLink);
            portfolioOverlay.append(portfolioOverlayDiv);

            portfolioItem.append(portfolioImage);
            portfolioItem.append(portfolioOverlay);

            portfolioRow.append(portfolioItem);
        }

        element.append(portfolioRow);
    };

    let webPortfolioSet = new PortfolioSet('Web', [frogger, krays, shout, ashios, myreads]);
    webPortfolioSet.draw($('section#portfolio .container'));


    let onTheMap = new PortfolioItem('On the Map', 'img/OnTheMap.png', 'Swift/iOS/MapKit', null, 'https://github.com/ashduckett/FEND-Frogger', 'Description');
    let virtualTourist = new PortfolioItem('Virtual Tourist', 'img/virtualTouristOnPhone.png', 'Swift/iOS/MapKit', null, 'https://github.com/ashduckett/FEND-Frogger', 'Description');
    let pitchPerfect = new PortfolioItem('Pitch Perfect', 'img/pitchPerfectOnPhone.png', 'Autolayout/Swift/iOS', null, 'https://github.com/ashduckett/FEND-Frogger', 'Description');
    let memeMe = new PortfolioItem('Meme Me', 'img/memeMeOnPhone.png', 'Autolayout/Swift/iOS', null, 'https://github.com/ashduckett/FEND-Frogger', 'Description');

    let iosPortfolioSet = new PortfolioSet('iOS', [onTheMap, virtualTourist, pitchPerfect, memeMe]);
    iosPortfolioSet.draw($('section#portfolio .container'));
    
    // Disable send button initially
    $('.submit-contact').prop('disabled', true);

    function isEmail(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }

    $(window).scroll(function() {
        var scrollTop = $(document).scrollTop();

        if(scrollTop >= 300) {
            $('nav').addClass('shrunk-nav');
            $('.brand h2').addClass('shrunk-brand');
        } else {
            $('nav').removeClass('shrunk-nav');
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


    function validateFormInput() {
        var name = $('#nameField').val().trim();
        var email = $('#emailField').val().trim();
        var message = $('#messageField').val().trim();

        if((name !== '') && (email !== '') && (message !== '') && isEmail(email)) {
            $('.submit-contact').prop('disabled', false);
        } else {
            $('.submit-contact').prop('disabled', true);
        }
    }

    $('#nameField').keyup(function() {
        validateFormInput();
    });

    $('#emailField').keyup(function() {
        validateFormInput();
    });

    $('#messageField').keyup(function() {
        validateFormInput();
    });

    $('#emailField').bind('input propertychange', function() { 
        validateFormInput();
    });

    $('#messageField').bind('input propertychange', function() { 
        validateFormInput();
    });

    $('#nameField').bind('input propertychange', function() { 
        validateFormInput();
    });

    $('#portfolio-link').click(function() {
        $('html, body').animate({
            scrollTop: $('section#portfolio').offset().top - 80
        }, 800, function(){});
    });

    $('#about-link').click(function() {
        $('html, body').animate({
            scrollTop: $('section#about').offset().top - 80
        }, 800, function(){});
    });

    $('#contact-link').click(function() {
        $('html, body').animate({
            scrollTop: $('section#contact').offset().top - 80
        }, 800, function(){});
    });
});