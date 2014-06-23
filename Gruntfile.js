module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['testing/unit testing/server testing/mochaTestSpec.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      },
      options: {
        ignore: ['node_modules/**',
        'bower_components/**',
        'public/**',
        'testing/**'],
        watchedExtensions: ['js']
      }
    },

    uglify: {//need to use ngmin for angular minification
    },
    karma: {
      unit: {
        configFile: './testing/unit testing/front end testing/apptesting.config.js',
        autoWatch: true
      }
    },

    jshint: {
      files: [
          'public/javascripts/*.js',
          'app.js',
          'server/*.js'
      ],
      options: {
        force: false,
        jshintrc: '.jshintrc',
        ignores: [
        ]
      }
    },
    concurrent: {
      target: {
        tasks: ['watch', 'nodemon', 'test', 'karma'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    cssmin: {
    },
    // less: {
    //   development: {
    //     options: {
    //       paths: ["public/stylesheets/"],
    //       yuicompress: true
    //     },
    //     files: {
    //       "public/stylesheets/style.css": "public/stylesheets/style.less"
    //     }
    //   }
    // },
    watch: {
      scripts: {
        files: [
          'server.js',
          'app/**/*.js',
          'config/**/*.js'
        ],
        tasks: [
          'mochaTest'
        ]
      },
      // css: {
      //   files: 'public/stylesheets/*',
      //   tasks: ['less']
      // }
    },

    shell: {
      prodServer: {
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-karma');


  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'jshint',
    'concurrent'
    // 'test'
    // 'less',
    // 'nodemon'
  ]);

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);


};
