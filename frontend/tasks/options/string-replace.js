module.exports = {
    integrate: {
        options: {
            replacements: [{
                pattern: /<a.*?href="([^"]*)".*>/ig,
                replacement: function(match, p1, offset, string) {
                    if (/(?!.*\..*\/).*(\.html)/gi.test(p1)) {
                        match = match.replace(/(\.html)/, '.aspx');
                    }
                    return match;
                }
            }]
        },
        files: [{
            expand: true,
            src: ['**/*.html'],
            cwd: '../backend/BEDSite/content/',
            dest: '../backend/BEDSite/content/'
        }]
    },
    integrate2: {
        options: {
            replacements: [{
                pattern: /<a.*?href="([^"]*)".*>/ig,
                replacement: function(match, p1, offset, string) {
                    if (/(?!.*\..*\/).*(\.html)/gi.test(p1)) {
                        match = match.replace(/(\.html)/, '.aspx');
                    }
                    return match;
                }
            }]
        },
        files: [{
            expand: true,
            src: ['**/*.html'],
            cwd: '../backend/BEDUnsubscribe/content/',
            dest: '../backend/BEDUnsubscribe/content/'
        }]
    }
};