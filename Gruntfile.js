module.exports = function (grunt) {

  // Project configuration
  grunt.initConfig({

      // Watching project content changes
      // Both sections allow the watch of any file
      // inside both directories, recursively (** means « at any
      // place in the tree »
    watch: {
      png: {
        options: {
          event: [ 'added' ],
          livereload: true
        },
        files: [ 'images/png/in/**/*.png' ],
        tasks: [ 'imagemin:png' ]
      },
      jpg: {
        options: {
          event: [ 'added' ],
          livereload: true
        },
        files: [ 'images/jpg/in/**/*.jpg', 'images/jpg/in/**/*.jpeg' ],
        tasks: [ 'imagemin:jpg' ]       
      },
      bash: {
        options: {
          event: [ 'added' ],
          livereload: true
        },
        files: [ 'workplace/scripts/bash/**' ],
        tasks: [ 'shell_runner:execute' ],
      }
    },
    imagemin: {
      png: {
        options: {                       // Target options
          optimizationLevel: 3
        },
        files: [                         // Dictionary of files
          {
            expand: true,
            cwd:    'workplace/images/png/in',
            src:    [ '**/*.png' ],
            dest:   'workplace/images/png/out/',
            ext:    'png'
          }
        ] 
      },
      jpg: {
        files: [                         // Dictionary of files
          {
            expand: true,
            cwd:    'workplace/images/jpg/in',
            src:    [ '**/*.jpeg', '**/*.jpg' ],
            dest:   'workplace/images/jpg/out/',
            ext:    'jpg'
          }
        ]
      }
    },
    shell_runner: {
      execute: {
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        },
        files: [ { src: 'workplace/scripts/bash/**/*.sh' } ]
      }
    }
  });


  // Loading plugins. They have to be loaded one at a time
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  //grunt.loadNpmTasks('grunt-shell-runner');

  grunt.registerTask('default', 'watch', 'imagemin');
};
