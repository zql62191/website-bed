module.exports = {
  server: {
    options: {
      hostname: '*', // breaks something (on my machine)
      // hostname: '<%= grunt.config.get("ip") %>',
      port: 3000,
      base: 'dist/'
    }
  }
};