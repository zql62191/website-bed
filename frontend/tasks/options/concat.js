module.exports = {
    options: {
        separator: ';',
    },
    all: {
        files: {
            'dist/js/libs.js': [
                'src/scripts/libs/jquery.js',
                'src/scripts/libs/lodash.compat.js',
                'src/scripts/libs/jquery.velocity.js',
                'src/scripts/libs/velocity.ui.js',
                'src/scripts/libs/jquery.hammer.js',
                'src/scripts/libs/jquery.exists.js',
                'src/scripts/libs/jquery.highlight.js',
                'src/scripts/libs/skrollr.js',
                'src/scripts/libs/bowser.js',
                'src/scripts/libs/angular.js'
            ],
            'dist/js/ie.js': [
                'src/scripts/libs/html5shiv.js',
                'src/scripts/libs/nwmatcher.js',
                'src/scripts/libs/selectivizr.js',
                'src/scripts/libs/respond.js'
            ]
        }
    }
};