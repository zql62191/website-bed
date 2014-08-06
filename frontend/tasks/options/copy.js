module.exports = {
    options: {
        processContentExclude: [
            '.DS_Store',
            '.gitignore',
            '.sass-cache',
            'node_modules',
            'ruby_gems',
            'src/tests/**',
            'src/content/data/**',
            'src/vendor/**'
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
            src: ['**/*.{gif,jpg,png}'],
            expand: true
        }]
    },
    scripts: {
        files: [{
            cwd: 'src/scripts/',
            dest: 'dist/js/',
            src: ['*.{js,htc,map}'],
            expand: true
        }]
    },
    styles: {
        files: [{
            cwd: 'src/styles/',
            dest: 'dist/css/',
            src: ['*.css'],
            expand: true
        }]
    },
    media: {
        files: [{
            cwd: 'src/media/',
            dest: 'dist/media/',
            src: ['**/*'],
            expand: true
        }]
    },
    vendor: {
        files: [{
            cwd: 'src/vendor/',
            dest: 'dist/',
            src: ['**/*'],
            expand: true,
            dot: true
        }]
    },
    integrate: {
        files: [{
            cwd: 'dist/',
            dest: '../backend/BEDSite/content/',
            src: ['**/*', '!privacy.aspx', '!.htaccess', '!robots.txt'],
            expand: true,
            dot: true
        }]
    }
};
