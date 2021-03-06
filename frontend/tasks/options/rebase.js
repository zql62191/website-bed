var dir = '/hcp/content/';

module.exports = {
    integrate: {
        options: {
            filter: true,
            base: ''
        },
        files: [{
            expand: true,
            cwd: '../backend/BEDSite/content/',
            src: '**/*.{html,css}',
            dest: '../backend/BEDSite/content/',
            reference: true,
            scopes: {
                // Matches url() resource links in css.
                // url: {
                //   '../img/': '/content/img/'
                // },
                // Matches html link tags and their href attribute's value.
                // a: {
                //   '': ''
                // },
                // Matches image elements and their source value.
                img: {
                    'img/': dir+'img/'
                },
                // Matches stylesheet links and their href attribute's value.
                link: {
                    'css/': dir+'css/',
                    'me/': dir+'me/'
                },
                // Matches script tags, and their sources.
                script: {
                    'js/': dir+'js/',
                    'me/': dir+'me/'
                }
            }
        }]
    }
};
