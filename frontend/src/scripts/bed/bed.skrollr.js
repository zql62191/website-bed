if (typeof BED === 'undefined') {
    window.BED = {};
}

BED.Skrollr = (function() {

    var animations = {

        // Prevalence
        'prevalence-header': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,-50px,0px)',
            'data-bottom-bottom': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'prevalence-map': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center-center': 'opacity: 1; transform: scale(1);'
        },
        'prevalence-asterisk': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(100px,0px,0px);',
            'data-center-center': 'opacity: 1; transform: translate3d(0px,0,0px);'
        },
        'prevalence-mf-text-1': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,100px,0px);',
            'data-center': 'opacity: 1; transform: translate3d(0px,0px,0px)'
        },
        'prevalence-mf-text-2': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,100px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0px,0px)'
        },
        'prevalence-male-graphic': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(500px,0px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'prevalence-female-graphic': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(-500px,0px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'prevalence-blurb-2': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,100px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },

        //Prevalence Patients
        'patient-1': {
            'data-bottom-top': 'transform: translate3d(-800px,0px,0px);',
            'data--40p-bottom': 'transform: translate3d(0px,0px,0px);'
        },
        'patient-2': {
            'data-bottom-top': 'transform: translate3d(-800px,0px,0px);',
            'data--30p-bottom': 'transform: translate3d(0px,0px,0px);'
        },
        'patient-3': {
            'data-bottom-top': 'transform: translate3d(-800px,0px,0px);',
            'data--20p-bottom': 'transform: translate3d(0px,0px,0px);'
        },
        'patient-4': {
            'data-bottom-top': 'transform: translate3d(-800px,0px,0px);',
            'data--10p-bottom': 'transform: translate3d(0px,0px,0px);'
        },

        //Neurobiology
        'neurobiology-header': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,-50px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'neurobiology-header-2': {
            'data-bottom-top': 'opacity: 0;',
            'data-center': 'opacity: 1;'
        },
        'neurobiology-reward': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(100px,0px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'neurobiology-dysregulation': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(-100px,0px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'neurobiology-endogeneous': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(100px,0px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'neurobiology-risk': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(-100px,0px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'neurobiology-risk-2': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(100px,0px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },

        //Course
        'course-title': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,-50px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'course-21-numbers': {
            'data--10p-bottom': 'transform: translate3d(732px,0px,0px)',
            'data--25p-bottom': 'transform: translate3d(0px,0px,0px)'
        },
        'course-21-copy': {
            'data--20p-bottom': 'opacity: 0; transform: scale(0);',
            'data--35p-bottom': 'opacity: 1; transform: scale(1);'
        },
        'course-80': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center': 'opacity: 1; transform: scale(1);'
        },
        'course-49': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center': 'opacity: 1; transform: scale(1);'
        },

        //Effects
        'effects-title': {
            'data-bottom-top': 'opacity: 0; transform: translate3d(0px,-50px,0px)',
            'data-center': 'opacity: 1; transform: translate3d(0px,0,0px)'
        },
        'effects-63': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center': 'opacity: 1; transform: scale(1);'
        },
        'effects-19': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center': 'opacity: 1; transform: scale(1);'
        },

        //Diagnosis
        'diagnosis-circle': {
            'data-bottom-top': 'transform: rotate(-180deg);',
            'data-center': 'transform: rotate(0deg);'
        },
        'diagnosis-50': {
            'data-bottom-top': 'opacity: 0;',
            'data-center': 'opacity: 1;'
        },
        'diagnosis-50-caption': {
            'data-bottom-top': 'opacity: 0;',
            'data-center': 'opacity: 1;'
        },
        'diagnosis-19': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center': 'opacity: 1; transform: scale(1);'
        },
        'diagnosis-36': {
            'data-bottom-top': 'opacity: 0; transform: scale(0.5);',
            'data-center': 'opacity: 1; transform: scale(1);'
        },

        //Resources
        'resources-signup': {
            'data-bottom-top': 'opacity: 0;',
            'data-center': 'opacity: 1;'
        }

    };

    var instance = null;

    var initialized = false;

    var init = function() {

        if (initialized) {
            return;
        }

        initialized = true;

        // Disable on Mobile/Tablet/IE
        if (!bowser.mobile && !bowser.tablet && !bowser.msie) {

            // Setup skrollr animation attributes
            $('[data-skrollr]').each(function(i, el) {

                var name = $(el).data('skrollr');

                var attrs = animations[name];

                if (attrs) {
                    $(el).attr(attrs);
                }

            });

            // Initialize skrollr
            instance = window.skrollr.init({
                smoothScrolling: true,
                forceHeight: true,
                beforerender: function(data) {
                    // console.log('beforerender: ', data);

                    // Disable on scroll up
                    return data.direction !== 'up';
                },
                render: function(data) {
                    // console.log('render: ', data);
                }
            });

        }

    };
    // Return the module object
    return {
        init: init,
        instance: function() {
            return instance;
        }
    };

})();
