var files = {
    'src/scripts/bed.js': [
        'src/scripts/bed/bed.js',
        'src/scripts/bed/bed.ui.js',
        'src/scripts/bed/bed.slideout.js',
        'src/scripts/bed/bed.modal.js',
        'src/scripts/bed/bed.skrollr.js',
        'src/scripts/bed/bed.videoplayer.js',
        'src/scripts/bed/bed.analytics.js',
        'src/scripts/bed/bed.homevideoplayer.js',
        'src/scripts/bed/bed.audio.js'
    ],
    'dist/js/libs.js': [
        'src/scripts/libs/jquery.min.js',
        'src/scripts/libs/lodash.compat.min.js',
        'src/scripts/libs/parseuri.min.js',
        'src/scripts/libs/jquery.velocity.min.js',
        'src/scripts/libs/velocity.ui.min.js',
        'src/scripts/libs/fastclick.min.js',
        // 'src/scripts/libs/jquery.hammer.min.js',
        'src/scripts/libs/jquery.exists.js',
        'src/scripts/libs/jquery.run.js',
        'src/scripts/libs/jquery.browser.min.js',
        'src/scripts/libs/jquery.history.min.js',
        'src/scripts/libs/skrollr.min.js',
        'src/scripts/libs/bowser.min.js',
        'src/scripts/libs/matchMedia.js',
        'src/scripts/libs/jquery.placeholder.js',
        'src/scripts/libs/polyfills.js',
        'src/scripts/libs/angular.min.js',
        'src/scripts/libs/ui-utils.min.js'
    ],
    'dist/js/ie.js': [
        'src/scripts/libs/html5shiv.min.js',
        'src/scripts/libs/nwmatcher.min.js',
        'src/scripts/libs/selectivizr.min.js',
        'src/scripts/libs/respond.min.js'
    ],
    'dist/js/skrollr.ie.js': 'src/scripts/libs/skrollr.ie.min.js'
};

module.exports = {
    options: {
        separator: ';'
    },
    dev: {
        options: {
            sourceMap: true
        },
        files: files
    },
    prod: {
        options: {
            sourceMap: false
        },
        files: files
    }
};
