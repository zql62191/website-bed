module.exports = {
  options: {
    basedir: 'src/content/',
    processContent: function(content) {
      var yfm = require('assemble-yaml');
      return yfm.stripYFM(content, {
        fromFile: false
      });
    },
    processName: function(filename) {
      // return filename.replace('src/content/pages', '').replace('.jade', '');
      return filename;
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
          site: yfm.extractJSON('src/content/data/site.yaml'),
          env: yfm.extractJSON('src/content/data/dev.yaml'),
          page: yfm.extractJSON('./' + src)
        };
      }
    },
    files: [{
      cwd: 'src/content/pages',
      dest: 'dist/',
      src: ['**/*.jade', '!**/_*.jade'],
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
          site: yfm.extractJSON('src/content/data/site.yaml'),
          env: yfm.extractJSON('src/content/data/prod.yaml'),
          page: yfm.extractJSON('./' + src)
        };
      }
    },
    files: [{
      cwd: 'src/content/pages/',
      dest: 'dist/',
      src: ['**/*.jade', '!**/_*.jade'],
      expand: true,
      filter: 'isFile',
      ext: '.html'
    }]
  }
};