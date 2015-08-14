
// replace all function to get correct fileString
String.prototype.replaceAll = function(str1, str2, ignore) {
    return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 


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
                    aspx: false,
                    dev: true,
                    devIntegrate: false,
                    prod: false,
                    from: src,
                    to: dest,
                    fileName: src[0].replace('src/markup/pages/', '').replace('.jade', '').split('/').pop(),
                    fileString: src[0].replace('src/markup/pages/', '').replace('.jade', '').split('/').pop().replaceAll('-', ''),
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
    // same as dev but will trigger addition of aspx tags in jade base template
    devIntegrate: {
        options: {
            pretty: true,
            debug: false,
            data: function(dest, src) {
                var yfm = require('assemble-yaml');
                return {
                    aspx: true,
                    dev: false,
                    prod: false,
                    from: src,
                    to: dest,
                    fileName: src[0].replace('src/markup/pages/', '').replace('.jade', '').split('/').pop(),
                    fileString: src[0].replace('src/markup/pages/', '').replace('.jade', '').split('/').pop().replaceAll('-', ''),
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
    // same as dev/devIntegrate for JUST for the unsubscribe sub-site
    unsubIntegrate: {
        options: {
            pretty: true,
            debug: false,
            data: function(dest, src) {
                var yfm = require('assemble-yaml');
                return {
                    aspx: true,
                    dev: false,
                    prod: false,
                    from: src,
                    to: dest,
                    fileName: src[0].replace('src/markup/pages/', '').replace('.jade', '').split('/').pop(),
                    fileString: src[0].replace('src/markup/pages/', '').replace('.jade', '').split('/').pop().replaceAll('-', ''),
                    site: yfm.extractJSON('src/markup/data/site.yaml'),
                    env: yfm.extractJSON('src/markup/data/dev.yaml'),
                    page: yfm.extractJSON('./' + src)
                };
            }
        },
        files: [{
            cwd: 'src/markup/pages',
            dest: 'dist/hcpUnsubscribe',
            src: ['unsubscribe.jade', 'partials/*.jade'],
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
                    aspx: true,
                    dev: false,
                    prod: true,
                    from: src,
                    to: dest,
                    fileName: src[0].replace('src/markup/pages/', '').replace('.jade', '').split('/').pop(),
                    fileString: src[0].replace('src/markup/pages/', '').replace('.jade', '').split('/').pop().replaceAll('-', ''),
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
