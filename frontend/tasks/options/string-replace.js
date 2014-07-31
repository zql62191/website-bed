module.exports = {
    integrate: {
        options: {
            replacements: [
                // {
                //     pattern: /<a.*?href="([^"]*)".*>/ig,
                //     replacement: function(match, p1, offset, string) {
                //         if (/(?!.*\..*\/).*(\.html)/gi.test(p1)) {
                //             match = match.replace(/(\.html)/, '.aspx');
                //         }
                //         return match;
                //     }
                // },
                {
                    pattern: '/index.html',
                    replacement: '/Default.aspx'
                }, {
                    pattern: '/privacy-policy.html',
                    replacement: '/privacy-policy.aspx'
                }, {
                    pattern: '/contact-us.html',
                    replacement: '/contact-us.aspx'
                }, {
                    pattern: '/unsubscribe.html',
                    replacement: '/Unsubscribe/Default.aspx'
                }
            ]
        },
        files: [{
            expand: true,
            src: ['**/*.html'],
            cwd: '../backend/BEDSite/content/',
            dest: '../backend/BEDSite/content/'
        }]
    }
};
