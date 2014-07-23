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
            cwd: '../backend/BEDWeb/content/',
            dest: '../backend/BEDWeb/content/'
        }]
    }
};