if (typeof BED === 'undefined') {
    window.BED = {};
}

BED.Analytics = (function() {

    var initialized = false;

    var init = function() {

        if (initialized) {
            return;
        }

        initialized = true;

    };

    // Video Play Handler
    var videoOnPlay = function(name) {

        console.log('videoOnPlay fired: ', name);

        if (typeof window.mediaPlayHandler !== 'undefined') {
            window.mediaPlayHandler('Video > ' + name);
        }
    };

    // Video Milestone Handler
    var videoOnPercentage = function(name, percentage) {

        console.log('videoOnPercentage fired: ', name, percentage);

        if (typeof window.mediaMilestoneHandler !== 'undefined') {
            window.mediaMilestoneHandler('Video > ' + name, percentage);
        }
    };

    // Video Complete Handler
    var videoOnComplete = function(name) {

        console.log('videoOnComplete fired: ', name);

        if (typeof window.mediaCompleteHandler !== 'undefined') {
            window.mediaCompleteHandler('Video > ' + name);
        }
    };

    var formOnComplete = function(name) {

        console.log('formOnComplete fired: ', name);

        if (typeof window.formCompleteHandler !== 'undefined') {
            window.formCompleteHandler(name);
        }

    };

    // Return the module object
    return {
        init: init,
        videoOnPlay: videoOnPlay,
        videoOnPercentage: videoOnPercentage,
        videoOnComplete: videoOnComplete,
        formOnComplete: formOnComplete
    };

})();
