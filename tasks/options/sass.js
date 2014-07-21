module.exports = {
  options: {
    compass: true,
    force: true,
    quiet: false,
    trace: false,
	noCache: true
  },
  dev: {
    options: {
      style: 'expanded',
      sourcemap: true // sass-media_query_combiner does not work when this is true, luckily we only want it for a prod build :)
    },
    files: [{
      expand: true,
      src: ['**/*.scss', '!**/_*.scss'],
      cwd: 'src/styles',
      dest: 'dist/css',
      ext: '.css'
    }]
  },
  prod: {
    options: {
      style: 'compressed',
      sourcemap: false
    },
    files: [{
      expand: true,
      src: ['**/*.scss', '!**/_*.scss'],
      cwd: 'src/styles',
      dest: 'dist/css',
      ext: '.css'
    }]
  }
};