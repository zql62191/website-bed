module.exports = {
	options: {
		compress: {
			drop_console: true
		}
	},
	dev: {
		options: {
			mangle: false, // setting it to true messes up angular
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
			mangle: false, // setting it to true messes up angular
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
