module.exports = {
    dist: {
        options: {
            force: true
        },
        src: [
            './tmp',
            './dist',
            './.sass-cache'
        ]
    },
    sass: {
        options: {
            force: true
        },
        src: ['./sass-cache']
    }
};
