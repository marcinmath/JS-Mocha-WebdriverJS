'use strict';

module.exports = function (grunt) {
    // configure tasks
    grunt.initConfig({
      shell: {
        runTests: {
            command: function(platform, browser, version) {
              return 'PLATFORM='+platform+' BROWSER='+browser+' VERSION='+version+' ./node_modules/.bin/parallel-mocha tests/*-spec.js'
            }
        }
      },
      junit_report: {
          foo : {
              options : {
                  xmlFolder : "./reports/xml",
                  outputFolder : "./output"
              }
          }
      },
      parallel: {
        assets: {
            options: {
                grunt: true
            },
            tasks: ['run_XP_firefox_42', 'run_Linux_chrome_45', 'run_Windows7_ie_11']
        }
      }
    });

    // load tasks
    grunt.loadNpmTasks('grunt-parallel');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-junit-report');

    // register tasks
    grunt.registerTask('default', ['parallel']);

    grunt.registerTask('run_XP_firefox_42', ['shell:runTests:XP:firefox:42']);
    grunt.registerTask('run_Linux_chrome_45', ['shell:runTests:Linux:chrome:45']);
    grunt.registerTask('run_Windows7_ie_11', ['shell:runTests:"Windows 7":"internet explorer":11']);
};
