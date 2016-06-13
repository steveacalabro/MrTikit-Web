// This is the default port that livereload listens on;
// change it if you configure livereload to use another port.
var LIVERELOAD_PORT = 35729;
// lrSnippet is just a function.
// It's a piece of Connect middleware that injects
// a script into the static served html.
var lrSnippet = require('connect-livereload')({ port: LIVERELOAD_PORT });
// All the middleware necessary to serve static files.
var pushState = require('grunt-connect-pushstate/lib/utils').pushState;
var livereloadMiddleware = function (connect, options) {
  return [
    // Inject a livereloading script into static files.
    lrSnippet,
    pushState(),
    // Serve static files.
    connect.static(options.base),
    // Make empty directories browsable.
    connect.directory(options.base)
  ];
};

module.exports = function (grunt) {
    require('connect-livereload')(grunt),
    require('jit-grunt')(grunt);
    require('time-grunt')(grunt);

    grunt.initConfig({
        // Project settings
        config: {
            // Configurable paths
            app: 'app'
        },
        // grunt-contrib-connect will serve the files of the project
        // on specified port and hostname
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    // Configurable paths
                    base: "<%= config.app %>",
                    middleware: livereloadMiddleware
                }
            },
        },
        open: {
            all: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= connect.options.port%>'
            }
        },
        less: {
            development: {
                options: {
                    //compress: true,
                    //yuicompress: true,
                    //optimization: 2
                },
                files: {
                    "app/styles/mainStyle.css": "less/main.less" // destination file and source file
                }
            }
        },
        autoprefixer: {
            options: {
                //Browsers to prefix for
                browsers: ['last 2 version', 'ie 8', 'ie 9', 'Opera 12.1']
            },
            dist: {
                files: {
                    'app/styles/mainStyleFixed.css': 'app/styles/mainStyle.css' // destination file and source file
                }
            }
        },
        watch: {
            options : {
                livereload: LIVERELOAD_PORT
            },
            'lessFiles': {
                files: ['less/**/*.less'],
                tasks: ['less', 'autoprefixer'],
                options: {
                    spawn: false,
                },
            },
            'jsFiles': {
                files: ['app/**/*.js'],
                //tasks: [''],
                options: {
                    spawn: false,
                },
            },
            'htmlFiles': {
                files: ['app/**/*.html'],
                //tasks: [''],
                options: {
                    spawn: false,
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-autoprefixer');

    //Task creation
    grunt.registerTask('default', ['buildLess', 'serve']);
    grunt.registerTask('buildLess', ['less', 'autoprefixer']);
    grunt.registerTask('serve', ['connect:livereload', 'open', 'watch']);
};