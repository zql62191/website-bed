module.exports = {
    options: {
        basedir: 'src/markup/',
        processContent: function(content) {
            var yfm = require('assemble-yaml');
            return yfm.stripYFM(content, {
                fromFile: false
            });
        },
        processName: function(filename) {
            // return filename.replace('src/markup/pages', '').replace('.jade', '');
            return filename;
        },
        filters: {
            raw: function(html, options) {
                return '\n' + html + '\n';
            }
        }
    },
    dev: {
        options: {
            pretty: true,
            debug: false,
            data: function(dest, src) {
                var yfm = require('assemble-yaml');
                return {
                    dev: true,
                    prod: false,
                    from: src,
                    to: dest,
                    fileName: src[0].replace('src/markup/pages/', '').replace('.jade', '').split('/').pop(),
                    site: yfm.extractJSON('src/markup/data/site.yaml'),
                    env: yfm.extractJSON('src/markup/data/dev.yaml'),
                    page: yfm.extractJSON('./' + src)
                };
            }
        },
        files: [{
            cwd: 'src/markup/pages',
            dest: 'dist/',
            src: ['**/*.jade'],
            expand: true,
            filter: 'isFile',
            ext: '.aspx'
        }, {
            cwd: 'src/markup/views',
            dest: 'dist/views',
            src: ['**/*.jade'],
            expand: true,
            filter: 'isFile',
            ext: '.html'
        }]
    },
    prod: {
        options: {
            pretty: true,
            debug: false,
            data: function(dest, src) {
                var yfm = require('assemble-yaml');
                return {
                    dev: false,
                    prod: true,
                    from: src,
                    to: dest,
                    fileName: src[0].replace('src/markup/pages/', '').replace('.jade', '').split('/').pop(),
                    site: yfm.extractJSON('src/markup/data/site.yaml'),
                    env: yfm.extractJSON('src/markup/data/prod.yaml'),
                    page: yfm.extractJSON('./' + src)
                };
            }
        },
        files: [{
            cwd: 'src/markup/pages',
            dest: 'dist/',
            src: ['**/*.jade'],
            expand: true,
            filter: 'isFile',
            ext: '.aspx'
        }, {
            cwd: 'src/markup/views',
            dest: 'dist/views',
            src: ['**/*.jade'],
            expand: true,
            filter: 'isFile',
            ext: '.html'
        }]
    }
};
