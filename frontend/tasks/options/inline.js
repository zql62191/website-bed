module.exports = {
    prod: {
        options: {
            cssmin: true,
            uglify: true
        },
        src: ['dist/**/*.html']
    }
};
