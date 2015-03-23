if (typeof BED === 'undefined') {
    window.BED = {};
}

BED.Modal = (function() {


    var initialized = false;

    var init = function() {

        if (initialized) {
            return;
        }

        initialized = true;

        $(window)

        .on('resize.modal', onResize);

        onResize();

        $(document.body)

        .on('click.modal', '.modal__inner', function(e) {
            e.stopPropagation();
        })

        .on('click.modal', '.modal .modal__outer, .modal .modal__close, .modal a.button', function(e) {

            close();

        });

    };

    var onResize = function(e) {

        $('.modal__outer').css({
            width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
            height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        });

    };

    var open = function(el, url) {

        var jqModal = (typeof el === 'string') ? $('.modal--' + el) : $(el);

        if (jqModal.is('.modal--interstitial')) {
            jqModal.find('a.button--ok').prop('href', url);
        }

        jqModal.velocity('fadeIn', {
            duration: 250,
            complete: function(e) {
                $(this).addClass('_is_open');
            }
        });

    };

    var close = function() {

        $('.modal._is_open').velocity('fadeOut', {
            duration: 250,
            complete: function(e) {
                $(this).removeClass('_is_open');
            }
        });

    };

    // Return the module object
    return {
        init: init,
        open: open,
        close: close
    };

})();
