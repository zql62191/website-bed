if (typeof BED === 'undefined') {
    window.BED = {};
}

BED.SlideOut = (function() {

    var initialized = false;

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
            close($(this));
        })

        .on('click.slideout', '.slideout .close', function(e) {
            close($(this).closest('.slideout'));
        })

        .on('click.slideout', '.slideout .slideout__inner', function(e) {
            e.stopPropagation();
        })

        .on('click.slideout', '.page-nav a', function(e) {
            close($('.slideout--menu'));
        });
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
            close($(this));
        });

        var jqSlideOut = el;
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

    };

    var close = function(el) {

        var jqSlideOut = el;
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
