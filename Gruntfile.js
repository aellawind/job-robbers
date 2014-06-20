module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
    },

    // mochaTest: {
    //   test: {
    //     options: {
    //       reporter: 'spec'
    //     },
    //     src: ['test/**/*.js']
    //   }
    // },

    nodemon: {
      dev: {
        script: 'app.js'
      },
      options: {
        ignore: ['node_modules/**',
        'bower_components/**',
        'public/**'],
        watchedExtensions: ['js']
      }
    },

    uglify: {//need to use ngmin for angular minification
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
        tasks: ['watch', 'nodemon'],
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
          'public/javascripts/*.js',
          'app.js',
          'server/*.js'
        ],
        tasks: [
          'concat',
          'uglify'
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


  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'jshint',
    // 'less',
    'concurrent'
  ]);

  grunt.registerTask('deploy', [
    // add your deploy tasks here
  ]);


};
