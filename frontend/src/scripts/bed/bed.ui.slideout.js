BED.UI.SlideOut = {

    init: function() {

        $(document.body)

        .on(BED.UI.gestures.click, 'a[data-slideout]', function(e) {
            BED.UI.SlideOut.toggle($(this).data('slideout'));
        })

        .on(BED.UI.gestures.click, '.slideout', function(e) {
            BED.UI.SlideOut.close($(this));
        })

        .on(BED.UI.gestures.click, '.slideout .close', function(e) {
            BED.UI.SlideOut.close($(this).closest('.slideout'));
        })

        .on(BED.UI.gestures.click, '.slideout .slideout__inner', function(e) {
            e.stopPropagation();
        })

        .on(BED.UI.gestures.click, '.page-nav a', function(e) {

            BED.UI.SlideOut.close($('.slideout--menu'));

        });

    },

    open: function(el) {

        $('.slideout._is_open').exists(function() {
            BED.UI.SlideOut.close($(this));
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

    },

    close: function(el) {

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

    },

    toggle: function(name) {

        var jqSlideOut = $('.slideout--' + name);

        if (jqSlideOut.hasClass('_is_open')) {
            BED.UI.SlideOut.close(jqSlideOut);
        } else {
            BED.UI.SlideOut.open(jqSlideOut);
        }

    }
};
