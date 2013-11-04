module.exports = function(grunt) {

    // main config
    grunt.initConfig({
        sass: {
            dev: {
                files: {
                    'css/dev/main-sass.css': 'css/dev/main.scss'
                }
            }
        },
        uglify: {
            dev: {
                files: {
                    //'js/vendor/handlebars.min.js': 'js/vendor/handlebars.js',
                    'js/dev/main.min.js': ['js/vendor/jquery-2.0.min.js', 'js/dev/main.js']
                    //'js/dev/plugins.min.js': 'js/dev/plugins.js'
                }
            }
        },
        concat: {
            dev: {
                files: {
                    'js/app.js': ['js/dev/main.min.js']
                }
            }
        },
        cssmin: {
            compress: {
                files: {
                    'css/app.css': ['css/dev/normalize.min.css', 'css/dev/main-sass.css']
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
            files: ['css/dev/main.scss', 'js/dev/main.js'],
            tasks: ['sass', 'uglify', 'concat', 'cssmin'],
            options: {
              livereload: 80,
            }
            //tasks: ['uglify', 'concat', 'cssmin'],
        }
    });

    // laod the tasks
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // run the task
    grunt.registerTask('default', ['sass', 'uglify', 'concat', 'cssmin']);
    //grunt.registerTask('default', ['uglify', 'concat', 'cssmin', 'watch']);
    // grunt.registerTask('default', ['jshint']);
};