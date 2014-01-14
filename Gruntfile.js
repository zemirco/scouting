
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // compile css files
    stylus: {
      options: {
        compress: false
      },
      ios: {
        files: {
          'app/css/prod/style.css': 'app/css/dev/ios-platform.styl'
        }
      },
      web: {
        files: {
          'app/css/prod/style.css': 'app/css/dev/web-platform.styl'
        }
      }
    },
    // compile static jade templates to html files
    jade: {
      compile: {
        options: {
          pretty: true
        },
        files: [{
          expand: true,
          cwd: 'app/views/dev/',
          src: '*.jade',
          dest: 'app/views/prod/',
          ext: '.html'
        }]
      }
    },
//    watch: {
//      stylus: {
//        files: ['css/src/*.styl'],
//        tasks: ['stylus']
//      }
//    },
    // start server so we can run the example in chrome
    connect: {
      server: {
        options: {
          keepalive: true,
          base: 'app/'
        }
      }
    },
    // e2e testing with protractor
    protractor: {
      options: {
        keepAlive: false,
        configFile: "./test/protractor.conf.js"
      },
      main: {
        // no specific options needed
      }
    },
    // copy files from development folders to phonegap www
    copy: {
      main: {
        files: [
          {expand: true, cwd: 'app/', src: ['index.html'], dest: 'phonegap/hello/www'},
          {expand: true, cwd: 'app/', src: ['views/prod/**'], dest: 'phonegap/hello/www/'},
          {expand: true, cwd: 'app/', src: ['js/**'], dest: 'phonegap/hello/www/'},
          {expand: true, cwd: 'app/', src: ['css/prod/style.css'], dest: 'phonegap/hello/www/'},
          {expand: true, cwd: 'app/', src: ['css/*.css'], dest: 'phonegap/hello/www/'},
          {expand: true, cwd: 'app/', src: ['fonts/**'], dest: 'phonegap/hello/www/'},
          {expand: true, cwd: 'app/', src: ['img/**'], dest: 'phonegap/hello/www/'}
        ]
      }
    },
    // copy files to s3 so we can preview them on a mobile device
    s3: {
      options: {
        key: 'AKIAI3TLK72QWNWCGLYQ',
        secret: '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',
        bucket: 'zeMirco',
        access: 'public-read'
      },
      files: {
        options: {
          verify: true
        },
        sync: [
          {src: 'app/css/*.css', dest: 'topcoat/css/'},
          {src: 'app/css/prod/*.css', dest: 'topcoat/css/prod/'},
          {src: 'app/fonts/*', dest: 'topcoat/fonts/'},
          {src: 'app/img/**', dest: 'topcoat/img/'},
          {src: 'app/js/*', dest: 'topcoat/js/'},
          {src: 'app/js/lib/*', dest: 'topcoat/js/lib/'},
          {src: 'app/*.html', dest: 'topcoat/'},
          {src: 'app/views/prod/*', dest: 'topcoat/views/prod/'}
        ]
      }
    }
  });

  // compile all stylus files to css
  grunt.loadNpmTasks('grunt-contrib-stylus');

  // watch task not needed yet
//  grunt.loadNpmTasks('grunt-contrib-watch');

  // upload static files to amazon s3 - preview html files on mobile devices
  grunt.loadNpmTasks('grunt-s3');

  // connect starts a webserver to server the files - needed for Chrome
  grunt.loadNpmTasks('grunt-contrib-connect');

  // copy files from development folders to /phonegap/.../www
  grunt.loadNpmTasks('grunt-contrib-copy');

  // compile static jade templates to html files
  grunt.loadNpmTasks('grunt-contrib-jade');

  // use protractor for e2e testing
  grunt.loadNpmTasks('grunt-protractor-runner');

  // Default task(s).
  grunt.registerTask('default', ['stylus:web']);
  grunt.registerTask('server', ['stylus:web', 'jade', 'connect']);
  grunt.registerTask('ios', ['stylus:ios', 'jade', 'copy']);
  grunt.registerTask('aws', ['stylus:web', 'jade', 's3']);
  grunt.registerTask('test', ['protractor']);

};