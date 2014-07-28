module.exports = {
    options: {

    },
    dev: {
        options: {
            compress: {
                drop_console: false
            },
            sourceMap: true
        },
        files: [{
            expand: true,
            cwd: 'src/scripts',
            src: ['*.js'],
            dest: 'dist/js/',
            ext: '.js'
        }]
    },
    prod: {
        options: {
            compress: {
                drop_console: true
            },
            sourceMap: false
        },
        files: [{
            expand: true,
            cwd: 'src/scripts',
            src: ['*.js'],
            dest: 'dist/js/',
            ext: '.js'
        }]
    }
};
