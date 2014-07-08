module.exports = {
	options: {
		compass: true,
		force: true,
		quiet: false,
		trace: false
	},
	dev: {
		options: {
      style: 'expanded',
			sourcemap: false // autoprefixer makes one
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
			sourcemap: false // autoprefixer makes one
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
