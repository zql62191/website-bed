module.exports = {
  options: {
    compress: {
      drop_console: true
    }
  },
  dev: {
    options: {
      sourceMap: true
    },
    files: [{
      expand: true,
      cwd: 'dist/',
      src: ['js/*.js', '!js/libs/**/*.js', '!js/**/*.min.js'],
      dest: 'dist/',
      ext: '.js'
    }]
  },
  prod: {
    options: {
      sourceMap: false
    },
    files: [{
      expand: true,
      cwd: 'dist/',
      src: ['js/*.js', '!js/libs/**/*.js', '!js/**/*.min.js'],
      dest: 'dist/',
      ext: '.js'
    }]
  }
};