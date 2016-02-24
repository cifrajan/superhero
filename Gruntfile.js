module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/**/*.js',
                dest: 'build/js/all.js'
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*.js', 'src/**/*.html', 'src/**/*.css'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            }
        },
        clean: ["build/**"],
        copy: {
            main: {
                files: [
                // includes files within path 
                    {
                        expand: true,
                        cwd: 'src/',
                        src: ['**/*.html', 'img/*'],
                        dest: 'build/',
                        filter: 'isFile'
                    }
                ],
            }
        },
        jshint: {
            options: {
                "curly": true,
                "eqnull": true,
                "eqeqeq": true,
                "undef": true,
                "globals": {
                    "jQuery": true,
                    "console": true,
                    "module": true
                }
            },
            all: ['Gruntfile.js', 'src/js/*.js']
        },
        imagemin: {
            dynamic: { // Another target 
                options: { // Target options 
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'src/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/img/'
                }]
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('dev', ['jshint', 'clean', 'copy', 'uglify', 'imagemin']);

};