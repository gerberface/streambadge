module.exports = function(grunt) {

    // main config
    grunt.initConfig({
        uglify: {
            dev: {
                files: {
                    'js/dev/main.min.js': 'js/dev/main.js',
                    'js/dev/plugins.min.js': 'js/dev/plugins.js'
                }
            }
        },
        concat: {
            dev: {
                files: {
                    'js/app.js': ['js/vendor/jquery-2.0.min.js', 'js/dev/plugins.min.js', 'js/dev/main.min.js']
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    'css/app.css': ['css/dev/normalize.min.css', 'css/dev/main.css']
                }
            }
        },
        jshint: {
            options: {
                globals: {
                    jQuery: true
                },
            },
            files: {
                src: ['js/dev/main.js']
            }
        },
        watch: {
            files: ['css/dev/main.css', 'js/dev/main.js'],
            tasks: ['uglify', 'concat', 'cssmin'],
        }
    });

    // laod the tasks
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // run the task
    grunt.registerTask('default', ['uglify', 'concat', 'cssmin', 'watch']);
    // grunt.registerTask('default', ['jshint']);
};