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
        // Ignored Warnings
        // Reference: https://github.com/jshint/jshint/blob/2.1.4/src/shared/messages.js
        '-W013': true, // Missing space after '{a}'.
        '-W032': true, // Unnecessary semicolon.
        '-W098': true // '{a}' is defined but never used.
    },
    dev: {
        src: [
            'src/scripts/*.js',
            'src/scripts/bed/*.js'
        ]
    },
    tasks: {
        src: ['tasks/**/*.js']
    }
};
