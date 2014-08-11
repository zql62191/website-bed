if (typeof BED === 'undefined') {
    window.BED = {};
}

BED.SlideOut = (function() {

    var initialized = false;

    var focused = false;
    var init = function() {

        if (initialized) {
            return;
        }

        initialized = true;

        $(window)

        .on('resize.slideout', onResize);

        onResize();

        $(document.body)

        .on('click.slideout', 'a[data-slideout]', function(e) {
            toggle($(this).data('slideout'));
        })

        .on('click.slideout', '.slideout', function(e) {
            if (!focused) {
                close($(this));
            }
        })

        .on('click.slideout', '.slideout .close', function(e) {
            close($(this).closest('.slideout'));
        })

        .on('click.slideout', '.slideout .slideout__inner', function(e) {
            e.stopPropagation();
        })

        .on('click.slideout', '.page-nav a', function(e) {
            close($('.slideout--menu'));
        })

        .on('focus.slideout', '.slideout input, .slideout select', function(e) {
            focused = true;
        })

        .on('blur.slideout', '.slideout input, .slideout select', function(e) {
            setTimeout(function() {
                focused = false;
            }, 1);
        });


        if (bowser.ios) {
            // Elegant hack to fix scrolling in fixed position elements

            $('.slideout input[type="text"]').css('pointer-events', 'none');

            $('.slideout').on('click.iosfix', function(e) {

                $('.slideout input[type="text"]').css('pointer-events', 'all');

                var el = $(document.elementFromPoint(e.clientX, e.clientY));

                $('.slideout input[type="text"]').css('pointer-events', 'none');

                if (el.is('input')) {
                    el.focus();
                }

            });

            // $(document).on('touchmove', function(e) {

            //     if ($(document.activeElement).is('input[type="text"]')) {
            //         e.preventDefault();
            //     }

            // });
        }
    };

    var onResize = function(e) {

        var offset = $('.page-wrapper').offset().left;

        $('.slideout').css({
            left: offset,
            right: offset
        });

    };

    var open = function(el) {

        $('.slideout._is_open').exists(function() {
            close();
        });

        var jqSlideOut = (typeof el === 'string') ? $('.slideout--' + el) : el;
        var jqSlideOutInner = jqSlideOut.find('.slideout__inner');

        var getTransition = function(direction) {
            var transitions = {
                'right': 'transition.slideRightIn',
                'left': 'transition.slideLeftIn'
            };

            return transitions[direction] || 'fadeIn';
        };

        var transition = getTransition(jqSlideOut.data('direction'));

        jqSlideOut.addClass('_is_animating');

        jqSlideOut.velocity('fadeIn', {
            complete: function() {
                jqSlideOut.addClass('_is_open').removeClass('_is_animating');
            },
            duration: 300
        });

        jqSlideOutInner.velocity(transition, {
            duration: 300
        });

        // $('body').addClass('modal-open');//css('overflow', 'hidden');

    };

    var close = function(el) {

        var jqSlideOut = $('.slideout._is_open');
        var jqSlideOutInner = jqSlideOut.find('.slideout__inner');

        var getTransition = function(direction) {
            var transitions = {
                'right': 'transition.slideRightOut',
                'left': 'transition.slideLeftOut'
            };

            return transitions[direction] || 'fadeOut';
        };

        var transition = getTransition(jqSlideOut.data('direction'));

        jqSlideOut.addClass('_is_animating');

        jqSlideOut.velocity('fadeOut', {
            complete: function() {
                jqSlideOut.removeClass('_is_open _is_animating');
            },
            duration: 300
        });

        jqSlideOutInner.velocity(transition, {
            duration: 300
        });

        // $('body').removeClass('modal-open');

    };

    var toggle = function(name) {

        var jqSlideOut = $('.slideout--' + name);

        if (jqSlideOut.hasClass('_is_open')) {
            close(jqSlideOut);
        } else {
            open(jqSlideOut);
        }

    };

    // Return the module object
    return {
        init: init,
        open: open,
        close: close,
        toggle: toggle
    };

})();
