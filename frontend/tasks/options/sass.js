module.exports = {
    options: {
        compass: true,
        force: true,
        quiet: false,
        trace: false,
        noCache: false
    },
    dev: {
        options: {
            style: 'expanded',
            sourcemap: 'file'
        },
        files: [{
            expand: true,
            src: ['**/*.scss', '!**/_*.scss'],
            cwd: 'src/styles',
            dest: 'dist/css',
            ext: '.css'
        }]
    },
    prod: {
        options: {
            style: 'compressed',
            sourcemap: 'none'
        },
        files: [{
            expand: true,
            src: ['**/*.scss', '!**/_*.scss'],
            cwd: 'src/styles',
            dest: 'dist/css',
            ext: '.css'
        }]
    }
};
