module.exports = {
    integrate: {
        options: {
            filter: true,
            base: ''
        },
        files: [{
            expand: true,
            cwd: '../backend/BEDWeb/content/',
            src: '**/*.{html,css}',
            dest: '../backend/BEDWeb/content/',
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
                    'img/': 'content/img/'
                },
                // Matches stylesheet links and their href attribute's value.
                link: {
                    'css/': 'content/css/'
                },
                // Matches script tags, and their sources.
                script: {
                    'js/': 'content/js/'
                }
            }
        }]
    }
};