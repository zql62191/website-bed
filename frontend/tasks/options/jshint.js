module.exports = {
    options: {
        browser: true,
        curly: true,
        devel: true,
        eqeqeq: true,
        evil: true,
        immed: true,
        indent: 4,
        regexdash: true,
        sub: true,
        trailing: true,
        unused: true,
        white: true,
        globals: {
            jQuery: true,
            modernizr: true,
            angular: true
        },
        force: true, // allow build to continue with errors
        '-W013': true, // Missing space after 'x'. It fires with "function() { }"
        '-W098': true // variables defined but never used
    },
    dev: {
        src: [
            'src/scripts/*.js'
        ]
    },
    tasks: {
        src: ['tasks/**/*.js']
    }
};