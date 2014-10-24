/*global module:false*/
module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),

		appName : 'Squares',

		// Task configuration.
		concat: {
			options: {},
			dist: {
				src: ['src/scripts/<%= appName %>.js'],
				dest: 'dist/<%= appName %>.js'
			}
		},
		uglify: {
			options: {},
			dist: {
				src: '<%= concat.dist.dest %>',
				dest: 'dist/<%= appName %>.min.js'
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				unused: true,
				boss: true,
				eqnull: true,
				browser: true,
				globals: {}
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			lib_test: {
				src: ['src/**/*.js', 'test/**/*.js']
			}
		},
		watch: {
			options: {
				nospawn: true
			},
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			lib_test: {
				files: '<%= jshint.lib_test.src %>',
				tasks: ['jshint:lib_test']
			},
			source : { 
				files: ['src/{,*/}*.html','src/{,*/}*.css','src/scripts/**/*.js'],
				options: {
					livereload: '<%= connect.source.options.livereload%>'
				}
			}
		},
		connect : {
			source: { 
				options : {
					open: true,
					livereload : true,
					base : 'src'
				}
			}
		},
		karma : {
			options : {
				frameworks: ['jasmine'],
				autoWatch: true,
			    browsers: ['Chrome'],
			    singleRun: false,
			    port: 9876,
			    files: [
			        'src/**/*.js',
			        'test/**/*.js'
			    ]
			},
			unit: {
				autoWatch:true,
				browsers: ["PhantomJS"],
				singleRun: false
			},
			chromeUnit : {
				browsers: ['Chrome'],
			}
		}

	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');

	// Default task.
	grunt.registerTask('build', ['jshint', 'concat', 'uglify']);

	// Unit Test
	grunt.registerTask('test', ['karma:unit']);

	// Development
	grunt.registerTask('dev', ['connect:source','watch:source']);

		// Development
	grunt.registerTask('testchrome', ['karma:chromeUnit']);

};
