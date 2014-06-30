module.exports = {
	options: {
		buster: Date.now(),
		htmlExtension: 'html',
		ignore: ['http://', '//', '../fonts/', '/fonts']
	},
	styles: {
		files: [{
			expand: true,
			cwd: 'dist/',
			src: ['**/*.css'],
			dest: 'dist/'
		}]
	},
	html: {
		files: [{
			expand: true,
			cwd: 'dist/',
			src: ['**/*.html'],
			dest: 'dist/'
		}]
	}
};
