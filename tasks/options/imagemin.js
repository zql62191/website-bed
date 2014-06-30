module.exports = {
	prod: {
		options: {
			optimizationLevel: 3,
			cache: false,
			pngquant: false
		},
		files: [{
			expand: true,
			cwd: 'src/images/',
			src: ['**/*.{png,jpg,gif}'],
			dest: 'dist/img/'
		}]
	}
};
