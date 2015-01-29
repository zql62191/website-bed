var BED = (function() {

    var initialized = false;

    var snag = function() {

        $('.slideout').css({
            position: 'absolute',
            bottom: 0
        });

        var jqSections = $('.section');
        var jqNexts = $('.bar--next');

        $('.next-section, .next-section .content-wrap').css({
            position: 'absolute',
            height: 0,
            width: 0,
            top: 0,
            left: 0,
            right: 0
        });

        setTimeout(function() {

            $(window).scrollTop(9999999);

        }, 1);

        setTimeout(function() {
            $(window).scrollTop(0);
        }, 500);

        $('.pagination').hide();

        jqNexts.each(function(i, el) {

            $(el).css({
                position: 'absolute',
                display: 'block',
                top: jqSections.eq(i + 1).offset().top
            });

        });

        $(document.body).on('click.snag', function() {

            jqNexts.each(function(i, el) {

                $(el).css({
                    position: 'absolute',
                    display: 'block',
                    top: jqSections.eq(i + 1).offset().top
                });

            });
        });
    };

    var init = function() {

        if (initialized) {
            return;
        }

        initialized = true;

        // Init all the things!
        BED.Analytics.init();
        BED.Skrollr.init();
        BED.UI.init();
        BED.SlideOut.init();
        BED.Modal.init();
        BED.VideoPlayer.init();

        if (typeof parseUri(window.location.href).queryKey['snag'] !== 'undefined') {
            $(window).load(snag);
        }

        $('input, textarea').placeholder();

        $('[data-load]').each(function(i, el) {
            $(el).load($(el).data('load'));
        });

    

        // BED 2.0 Patient Profiles

        $(document).ready(function() {

            // desktop patient profile nav
            $('.profile-button')

            .on('click touch', function() {
                var target = $(this).data('target');

                $('.profile-button').removeClass('active-profile-button');
                $(this).addClass('active-profile-button');

                $('.profile').removeClass('active-profile');
                $('.' + target).addClass('active-profile');
            })

            .hover( function() {
                $(this).addClass('hover');
            }, function() {
                $(this).removeClass('hover');
            });


            // function to update status of next/previous arrows based on current profile (mobile only)
            var updateNavArrows = function(profileIndex) {

                console.log(profileIndex);

                $('.arrow').removeClass('inactive');

                switch (profileIndex) {
                    case 1:
                        $('.arrow-prev').addClass('inactive');
                        break;
                    case 4:
                        $('.arrow-next').addClass('inactive');
                        break;
                    default:
                        break;
                }

            }


            var profileWidth = 548;

            // mobile patient profile nav
            $('.arrow').on('click touch', function() {


                var currentProfileIndex = parseInt($('.active-profile').data('profile-num'));

                // go to next profile
                if ($(this).hasClass('arrow-next') && !$(this).hasClass('inactive')) {

                    $('.active-profile').removeClass('active-profile').next().addClass('active-profile');
                        
                    $('.profile').css('transform', 'translateX( -' + currentProfileIndex * profileWidth + 'px)');

                    updateNavArrows(++currentProfileIndex);                

                // go to previous profile
                } else if ($(this).hasClass('arrow-prev') && !$(this).hasClass('inactive')) {

                    $('.active-profile').removeClass('active-profile').prev().addClass('active-profile');
                        
                    $('.profile').css('transform', 'translateX( -' + (currentProfileIndex-2) * profileWidth + 'px)');

                    updateNavArrows(--currentProfileIndex);

                }

            });
        });
    };
    

    // Return the module object
    return {
        init: init
    };

})();
