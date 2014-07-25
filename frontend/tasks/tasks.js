module.exports = function(grunt) {

    grunt.registerTask('images:dev', ['copy:images']);
    // grunt.registerTask('images:prod', ['imagemin:prod']);
    grunt.registerTask('images:prod', ['copy:images']);

    grunt.registerTask('scripts:dev', ['jshint:dev', 'concat', 'copy:scripts']);
    grunt.registerTask('scripts:prod', ['jshint:dev', 'concat', 'copy:scripts', 'uglify:prod']);

    grunt.registerTask('fonts', ['copy:fonts']);

    grunt.registerTask('media', ['copy:media']);

    grunt.registerTask('styles:dev', ['clean:sass', 'sass:dev', 'copy:styles', 'autoprefixer:dev']);
    grunt.registerTask('styles:prod', ['clean:sass', 'sass:prod', 'copy:styles', 'autoprefixer:prod']);

    // grunt.registerTask('cachebust:dev', ['asset_cachebuster']);
    // grunt.registerTask('cachebust:dev:html', ['asset_cachebuster:html']);
    // grunt.registerTask('cachebust:prod', ['asset_cachebuster']);

    grunt.registerTask('cachebust:dev', []);
    grunt.registerTask('cachebust:dev:html', []);
    grunt.registerTask('cachebust:prod', []);

    grunt.registerTask('build:dev', ['verifylowercase', 'clean:dist', 'images:dev', 'fonts', 'media', 'concurrent:dev', 'cachebust:dev']);
    grunt.registerTask('build:prod', ['verifylowercase', 'clean:dist', 'images:prod', 'fonts', 'media', 'concurrent:prod', 'cachebust:prod']);

    grunt.registerTask('default', ['build:dev', 'connect', 'concurrent:local']);
    grunt.registerTask('dev', ['build:dev']);
    grunt.registerTask('prod', ['build:prod']);
    grunt.registerTask('integrate', ['build:prod', 'copy:integrate', 'rebase:integrate', 'string-replace:integrate']);

};