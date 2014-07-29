module.exports = {
    options: {
        separator: ';',
    },
    all: {
        files: {
            'dist/js/libs.js': [
                'src/scripts/libs/jquery.min.js',
                'src/scripts/libs/lodash.compat.min.js',
                'src/scripts/libs/parseuri.min.js',
                'src/scripts/libs/jquery.velocity.min.js',
                'src/scripts/libs/velocity.ui.min.js',
                'src/scripts/libs/jquery.hammer.min.js',
                'src/scripts/libs/jquery.exists.js',
                'src/scripts/libs/skrollr.min.js',
                'src/scripts/libs/bowser.min.js',
                'src/scripts/libs/matchMedia.js',
                'src/scripts/libs/angular.min.js'
            ],
            'dist/js/ie.js': [
                'src/scripts/libs/html5shiv.min.js',
                'src/scripts/libs/nwmatcher.min.js',
                'src/scripts/libs/selectivizr.min.js',
                'src/scripts/libs/respond.min.js'
            ],
            'dist/js/skrollr.ie.js': 'src/scripts/libs/skrollr.ie.min.js'
        }
    }
};
