module.exports = function(grunt) {

    grunt.registerTask('images:dev', ['copy:images']);
    // grunt.registerTask('images:prod', ['imagemin:prod']);
    grunt.registerTask('images:prod', ['copy:images']);

    grunt.registerTask('scripts:dev', ['jshint:dev', 'concat:dev', 'copy:scripts']);
    grunt.registerTask('scripts:prod', ['jshint:dev', 'concat:prod', 'uglify:prod']);

    grunt.registerTask('fonts', ['copy:fonts']);

    grunt.registerTask('media', ['copy:media']);

    grunt.registerTask('vendor', ['copy:vendor']);

    grunt.registerTask('styles:dev', ['clean:sass', 'sass:dev', 'copy:styles', 'autoprefixer:dev']);
    grunt.registerTask('styles:prod', ['clean:sass', 'sass:prod', 'copy:styles', 'autoprefixer:prod']);

    // grunt.registerTask('cachebust:dev', ['asset_cachebuster']);
    // grunt.registerTask('cachebust:dev:html', ['asset_cachebuster:html']);
    // grunt.registerTask('cachebust:prod', ['asset_cachebuster']);

    grunt.registerTask('cachebust:dev', []);
    grunt.registerTask('cachebust:dev:html', []);
    grunt.registerTask('cachebust:prod', []);

    grunt.registerTask('build:dev', ['verifylowercase', 'clean:dist', 'images:dev', 'fonts', 'media', 'vendor', 'concurrent:dev', 'cachebust:dev']);
    grunt.registerTask('build:prod', ['verifylowercase', 'clean:dist', 'images:prod', 'fonts', 'media', 'vendor', 'concurrent:prod', 'cachebust:prod']);

    grunt.registerTask('default', ['build:dev', 'connect', 'concurrent:local']);
    grunt.registerTask('dev', ['build:dev']);
    grunt.registerTask('prod', ['build:prod']);
    grunt.registerTask('integrate', ['build:dev', 'copy:integrate', 'rebase:integrate', 'string-replace:integrate']);

};
