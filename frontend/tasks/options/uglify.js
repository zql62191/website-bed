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
            cwd: 'dist/',
            src: ['js/*.js', '!js/libs/**/*.js', '!js/**/*.min.js'],
            dest: 'dist/',
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
            cwd: 'dist/',
            src: ['js/*.js', '!js/libs/**/*.js', '!js/**/*.min.js'],
            dest: 'dist/',
            ext: '.js'
        }]
    }
};