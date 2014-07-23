module.exports = {
    options: {
        livereload: true
    },
    jade: {
        files: [
            'src/content/**/*.{yaml,jade}'
        ],
        tasks: ['jade:dev', 'cachebust:dev:html']
    },
    tasks: {
        files: ['tasks/**/*.js'],
        tasks: ['jshint:tasks', 'build:dev']
    },
    fonts: {
        files: ['src/fonts/**/*.{ttf,otf,eot,woff,svg}'],
        tasks: ['fonts']
    },
    images: {
        files: ['src/images/**/*.{gif,jpg,png}'],
        tasks: ['images:dev']
    },
    sass: {
        files: ['src/styles/**/*.scss'],
        tasks: ['styles:dev', 'cachebust:dev']
    },
    scripts: {
        files: [
            'src/scripts/**/*.js'
        ],
        tasks: ['scripts:dev', 'cachebust:dev:html']
    },
    media: {
        files: [
            'src/media/**/*'
        ],
        tasks: ['media']
    }
};