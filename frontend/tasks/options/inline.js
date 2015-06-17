module.exports = {
    prod: {
        options: {
            cssmin: true,
            uglify: true,
            exts: [
                'html',
                'jsp',
                'aspx'
            ]
        },
        src: ['dist/**/*.{html,jsp,aspx}', '!dist/views/**/*.{html,jsp,aspx}']
    }
};
