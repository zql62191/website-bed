module.exports = {
    local: {
        tasks: ['weinre', 'watch'],
        options: {
            logConcurrentOutput: true
        }
    },
    dev: {
        tasks: ['jade:dev', 'scripts:dev', 'styles:dev'],
        options: {
            logConcurrentOutput: true
        }
    },
    prod: {
        tasks: ['jade:prod', 'scripts:prod', 'styles:prod'],
        options: {
            logConcurrentOutput: true
        }
    }
};