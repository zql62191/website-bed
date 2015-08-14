module.exports = {
    options: {
        processContentExclude: [
            '.DS_Store',
            '.gitignore',
            '.sass-cache',
            'node_modules',
            'ruby_gems'
        ]
    },
    fonts: {
        files: [{
            cwd: 'src/fonts/',
            dest: 'dist/fonts/',
            src: ['**/*.{ttf,otf,eot,woff,svg}'],
            expand: true
        }]
    },
    images: {
        files: [{
            cwd: 'src/images/',
            dest: 'dist/img/',
            src: ['**/*.{gif,jpg,png}', '!**/sprites/*.png'],
            expand: true
        }]
    },
    scripts: {
        files: [{
            cwd: 'src/scripts/',
            dest: 'dist/js/',
            src: ['*.{js,htc,map}'],
            expand: true
        }, {
            cwd: 'src/scripts/inline/',
            dest: 'dist/js/inline/',
            src: ['*.{js,htc,map}'],
            expand: true
        }]
    },
    assets: {
        files: [{
            cwd: 'src/assets/',
            dest: 'dist/',
            src: ['**/*'],
            expand: true,
            dot: true
        }]
    },
    integrate: {
        files: [{
            expand: true,
            cwd: 'dist/',
            src: ['**'],
            dest: '../backend/hcp/',
            dot: true
        }]
    }
    ,unsubIntegrate: {
        files: [{
            expand: true,
            cwd: 'dist/unsubscribe/',
            src: ['**'],
            dest: '../backend/hcpUnsubscribe/',
            dot: true
        // },
        // {
        //     expand: true,
        //     cwd: 'src/markup/partials/',//header & footer
        //     src: ['*.jade'],
        //     dest: '../backend/unsubscribe/',
        //     dot: true
        // },
        // {
        //     expand: true,
        //     cwd: 'src/markup/pages/layouts/',//base layout
        //     src: ['base.jade'],
        //     dest: '../backend/unsubscribe/',
        //     dot: true
        // },
        // {
        //     // maybe i should just use ALL the scripts since there are AngularJS dependencies everywhere... JM
        //     expand: true,
        //     cwd: 'src/markup/scripts/',
        //     src: ['**/*'],
        //     dest: '../backend/unsubscribe/',
        //     dot: true
        // },
        // {
        //     expand: true,
        //     cwd: 'src/styles/pages/',
        //     src: ['_unsubscribe.scss'],
        //     dest: '../backend/unsubscribe/',
        //     dot: true
        }]
    }
};
