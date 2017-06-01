module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take.
    require('time-grunt')(grunt);

    var appConfig = {
        hostname: '127.0.0.1',
        dist: 'dist',
        app: 'app',
        port: grunt.option('port') || 9000,
        livereloadPort: 55555
    };

    grunt.initConfig({

        appConfig: appConfig,

        connect: {
            options: {
                port: appConfig.port,
                hostname: '<%= appConfig.hostname %>', // underscore
                livereload: appConfig.livereloadPort
            },
            livereload: {
                options: {
                    open: true,
                    base: ['.tmp', '.', 'bower_components', 'app']
                }
            },
            dist: {
                options: {
                    open: true,
                    base: ['.tmp', 'dist']
                }
            }
        },

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            sass: {
                files: [
                    '<%= appConfig.app %>/styles/**/*.{scss,sass}'
                ],
                tasks: ['sass', 'autoprefixer']
            },
            jshint: {
                files: [
                    '<%= appConfig.app %>/**/*.js'
                ],
                tasks: ['jshint', 'includeSource:server']
            },
            html: {
                files: ['<%= appConfig.app %>/**/*.html'],
                tasks: ['includeSource:server']
            },
            livereload: {
                options: {
                    livereload: '<%= appConfig.livereloadPort %>'
                },
                files: [
                    '.tmp/*.html',
                    '<%= appConfig.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= appConfig.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        wiredep: {
            app: {
                src: [
                    '<%= appConfig.app %>/list.html',
                    '<%= appConfig.app %>/landing.html'
                ],
                ignorePath: /\.\.\//
            },
            sass: {
                src: ['<%= appConfig.app %>/styles/{,*/}*.{scss,sass}']
            }
        },

        includeSource: {
            options: {
                basePath: ['<%= appConfig.app %>', '.tmp'],
                baseUrl: '',
            },
            server: {
                files: {
                    '.tmp/list.html': '<%= appConfig.app %>/list.html',
                    '.tmp/landing.html': '<%= appConfig.app %>/landing.html'
                }
            },
            dist: {
                files: {
                    '<%= appConfig.dist %>/list.html': '<%= appConfig.app %>/list.html',
                    '<%= appConfig.dist %>/landing.html': '<%= appConfig.app %>/landing.html'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= appConfig.app %>/**/*.js'
                ]
            }
        },

        sass: {
            options: {
                sourceMap: true
            },
            all: {
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: ['styles/main.scss'],
                    dest: '.tmp',
                    ext: '.css'
                }]
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 10 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '**/*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.sass-cache',
                        '.tmp',
                        '<%= appConfig.dist %>'
                    ]
                }]
            }
        },

        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= appConfig.app %>',
                    dest: '<%= appConfig.dist %>',
                    src: [
                        'assets/**/*',
                    ]
                }]
            }
        },

        filerev: {
            dist: {
                src: [
                    '<%= appConfig.dist %>/**/*.js',
                    '<%= appConfig.dist %>/styles/**/*.css',
                    '<%= appConfig.dist %>/assets/**/*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= appConfig.dist %>/assets/fonts/*'
                ]
            }
        },

        useminPrepare: {
            html: [
                '<%= appConfig.dist %>/list.html',
                '<%= appConfig.dist %>/landing.html'
            ],
            options: {
                dest: '<%= appConfig.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        usemin: {
            html: ['<%= appConfig.dist %>/{,**/}*.html'],
            css: ['<%= appConfig.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= appConfig.dist %>', '<%= appConfig.dist %>/assets']
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= appConfig.dist %>',
                    src: ['**/*.html'],
                    dest: '<%= appConfig.dist %>'
                }]
            }
        }

    });

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'includeSource:dist',
        'useminPrepare',
        'sass',
        'autoprefixer',
        'concat:generated',
        'copy:dist',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:dist',
            'wiredep',
            'includeSource:server',
            'sass',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    // default task
    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);

};