module.exports = {
  options: {
    processContentExclude: [
      '.DS_Store',
      '.gitignore',
      '.sass-cache',
      'node_modules',
      'ruby_gems',
      'src/tests/**',
      'src/content/data/**',
      'src/vendor/**'
    ]
  },
  fonts: {
    files: [{
      cwd: 'src/fonts/',
      dest: 'dist/fonts/',
      src: ['**/*.{ttf,otf,eot,woff,svg}'],
      expand: true,
      filter: 'isFile'
    }]
  },
  images: {
    files: [{
      cwd: 'src/images/',
      dest: 'dist/img/',
      src: ['**/*.{gif,jpg,png}'],
      expand: true,
      filter: 'isFile'
    }]
  },
  scripts: {
    files: [{
      cwd: 'src/scripts/',
      dest: 'dist/js/',
      src: ['*.{js,htc}'],
      expand: true,
      filter: 'isFile'
    }]
  },
  styles: {
    files: [{
      cwd: 'src/styles/',
      dest: 'dist/css/',
      src: ['*.css'],
      expand: true,
      filter: 'isFile'
    }]
  },
  media: {
    files: [{
      cwd: 'src/media/',
      dest: 'dist/media/',
      src: ['*'],
      expand: true,
      filter: 'isFile'
    }]
  },
  integrate: {
    files: [{
      cwd: 'dist/',
      dest: '../backend/BEDWeb/content/',
      src: ['**/*'],
      expand: true
    }]
  }
};