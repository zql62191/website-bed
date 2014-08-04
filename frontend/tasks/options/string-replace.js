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
                    replacement: '/'
                }, {
                    pattern: '/privacy-policy.html',
                    replacement: '/privacy-policy.aspx'
                }, {
                    pattern: '/contact-us.html',
                    replacement: '/contact-us.aspx'
                }, {
                    pattern: '/unsubscribe.html',
                    replacement: '/Unsubscribe/'
                }, {
                    pattern: 'img/dsm5-tab-bg.png',
                    replacement: '/content/img/dsm5-tab-bg.png'
                }
            ]
        },
        files: [{
            expand: true,
            src: ['**/*.{js,html}'],
            cwd: '../backend/BEDSite/content/',
            dest: '../backend/BEDSite/content/'
        }]
    }
};
