module.exports = {
	dist: {
		options: {
			force: true
		},
		src: [
			'./tmp',
			'./dist',
			'./.sass-cache'
		]
	},
	sass: {
		options: {
			force: true
		},
		src: ['./sass-cache']
	},
	www_toc: {
		options: {
			force: true
		},
		src: ['../www/toc/*', '!../www/toc/api']
	},
	www_paf: {
		options: {
			force: true
		},
		src: ['../www/paf/*', '!../www/paf/api']
	}
};
