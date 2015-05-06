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
    },
    integrate: {
        options: {
            force: true
        },
        src: [
            '../backend/BEDSite/content/'
        ]
    }
};
