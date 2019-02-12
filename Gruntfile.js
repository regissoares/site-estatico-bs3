module.exports = function (grunt) {
  'use strict';

  var configBridge = grunt.file.readJSON('./bower_components/bootstrap/grunt/configBridge.json', {encoding: 'utf8'});

  grunt.initConfig({
    less: {
      options: {
        compress: false,
        strictMath: true
      },
      dist: {
        files: {
          'dist/css/style.css': 'src/less/style.less'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: configBridge.config.autoprefixerBrowsers
      },
      dist: {
        src: 'dist/css/style.css'
      }
    },
    ejs: {
      options: {
        configTmpl: function (config) {
          grunt.config('config', config);
        },
        tmpl: function () {
          return grunt.config.get('config');
        }
      },
      dist: {
        expand: true,
        cwd: 'src/ejs',
        src: ['**/*.ejs', '!partials/**/*'],
        dest: 'dist/',
        ext: '.html'
      }
    },
    copy: {
      dist: {
        files: [
          {expand: true, cwd: 'bower_components/jquery/dist', src: ['**/jquery*.js', '**/jquery*.map'], dest: 'dist/js/'},
          {expand: true, cwd: 'bower_components/bootstrap/dist/js', src: ['**/bootstrap*.js'], dest: 'dist/js/'},
          {expand: true, cwd: 'bower_components/bootstrap/dist/fonts', src: ['**'], dest: 'dist/fonts/'},
          {expand: true, cwd: 'src/js', src: ['**'], dest: 'dist/js/'}
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-ejs');

  // todo: minificar html
  // todo: minificar css
  // todo: minificar js
  // todo: server e livereload
  // todo: clean
  // todo: watch

  grunt.registerTask('default', ['less', 'autoprefixer', 'ejs', 'copy']);
};
