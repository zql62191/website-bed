module.exports = {
    integrate: {
        options: {
            replacements: [
                // {
                //     pattern: /<a.*?href="\/([^"]*)".*>/ig,
                //     replacement: function(match, p1, offset, string) {
                //         if (/(?!.*\..*\/).*(\.html)/gi.test(p1)) {
                //             match = match.replace(/(\.html)/, '.aspx');
                //         }
                //         return match;
                //     }
                // },
                {
                    pattern: /\/index.html/ig,
                    replacement: '/'
                }, {
                    pattern: /\/privacy-policy.html/ig,
                    replacement: '/privacy-policy.aspx'
                }, {
                    pattern: /\/contact-us.html/ig,
                    replacement: '/contact-us.aspx'
                }, {
                    pattern: /\/unsubscribe.html/ig,
                    replacement: '/Unsubscribe/'
                }, {
                    pattern: /\/media\/DSM-5_BED_Brochure.pdf/ig,
                    replacement: '/Content/media/DSM-5_BED_Brochure.pdf'
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
