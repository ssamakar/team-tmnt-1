Testing
---

### Unit Testing

Use unit testing to ensure that individual services and controllers do what you expect them to do. You'll be testing
small bits of functionality.

### Setting up Karma

If you've been using Yeoman, you already have a testing framework in place. If you haven't been using Yeoman... then
shame on you. You're on your own. You'll need to make sure that your karma.conf.js and karma-e2e.conf.js files are
in order.

Here's what your Karma config files might look like.


***team-tmnt/karma.conf.js***

    // Karma configuration
    // http://karma-runner.github.io/0.10/config/configuration-file.html

    module.exports = function(config) {
      config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
          'app/bower_components/angular/angular.js',
          'app/bower_components/angular-mocks/angular-mocks.js',
          'app/scripts/*.js',
          'app/scripts/**/*.js',
          'test/mock/**/*.js',
          'test/spec/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false
      });
    };



***team-tmnt/karma-e2e.conf.js***

    // Karma configuration
    // http://karma-runner.github.io/0.10/config/configuration-file.html

    module.exports = function(config) {
      config.set({
        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        frameworks: ['ng-scenario'],

        // list of files / patterns to load in the browser
        files: [
          'test/e2e/**/*.js'
        ],

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
      });
    };

### Troubleshooting Karma

If you've been following along with the Team-TMNT example project, then your ```main.js``` and ```team.js``` controllers
are stupid simple. They merely assign injected values to $scope like so: ```$scope.teams = teams;``` and ```$scope.team = team;```.

Let's first run ```grunt test``` to see what we get.

Notice the following error...

    Error: [$injector:modulerr] Failed to instantiate module tmntApp due to:
    Error: [$injector:modulerr] Failed to instantiate module ui.router due to:
    Error: [$injector:nomod] Module 'ui.router' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.


Karma is complaining because it can't find ```ui.router```, which is a dependency of your app. Your app relies on
```index.html``` for all of its dependencies. Every time you create a new dependency, you make sure that it's been added to
```index.html```. Karma, however, does not rely on ```index.html``` at all. Karma runs your code independent of your
views. This means that all dependencies must be registered in ```karma.conf.js```. So let's add ```ui.router``` as a
dependency in ```karma.conf.js```.

    files: [
          'app/bower_components/angular/angular.js',
          'app/bower_components/angular-mocks/angular-mocks.js',
          'app/scripts/*.js',
          'app/scripts/**/*.js',
          'test/mock/**/*.js',
          'test/spec/**/*.js',
          'app/bower_components/angular-ui-router/release/angular-ui-router.js'
        ],

Now run ```grunt test``` again. Notice that your tests are running and failing.

Fixing Tests
---

### Main.js and Team.js

Let's start with ```main.js```. You're going to be testing that whatever value is injected into ```main.js``` as
```teams``` will be available on scope. That's all that ```main.js``` does, so it's an easy test.

- Locate ```team-tmnt/test/spec/controllers/main.js`` and create it if you didn't use Yeoman. It should look like this:

        'use strict';

        describe('Controller: MainCtrl', function () {

          // load the controller's module
          beforeEach(module('tmntApp'));

          var MainCtrl,
            scope;

          // Initialize the controller and a mock scope
          beforeEach(inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            MainCtrl = $controller('MainCtrl', {
              $scope: scope
            });
          }));

          it('should attach a list of awesomeThings to the scope', function () {
            expect(scope.teams.length).toBe(2);
          });
        });

- Notice this line: ```MainCtrl = $controller('MainCtrl', {$scope: scope});```.
This is where you mock your controller dependencies. In this case, we're going to inject some ```teams```.

        MainCtrl = $controller('MainCtrl', {
          $scope: scope,
          teams: [{name: 'fakies'}, {name: 'also fake'}]
        });

If you look back at your ```main.js``` controller, you'll notice that it's getting two injections, ```$scope``` and
```teams```. You've now injected a mock ```teams``` object.

- Test that ```teams``` is getting assigned to ```$scope```.

        it('should attach a list of teams to the scope', function () {
          expect(scope.teams.length).toBe(2);
        });

When Karma instantiates your controller with the previously-defined mock injections, it will also run all of the
functions in your controller. This means that ```scope``` should now have ```teams``` assigned to it. We're just
testing the length of ```scope.teams``` for simplicity. Don't get any fancier than you have to with your test suite.

- Now do the same thing with ```team.js```.
Open up ```team-tmnt/test/spec/controllers/team.js```, add a mock value
for ```team``` and test that it's been added to ```scope```. Run ```grunt test``` and make sure that your test is
passing.

In the following example, I've injected the number 10 as ```team```. All I have to do is test that ```scope.team```
is equal to 10. My work is done.

    'use strict';

    describe('Controller: TeamCtrl', function () {

      // load the controller's module
      beforeEach(module('tmntApp'));

      var TeamCtrl,
        scope;

      // Initialize the controller and a mock scope
      beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        TeamCtrl = $controller('TeamCtrl', {
          $scope: scope,
          team: 10
        });
      }));

      it('should attach a team to the scope', function () {
        expect(scope.team).toBe(10);
      });
    });

### Testing Directives

You'll need to have written some directives in order to test them. Again, you should have prepared the directives using
Yeoman. If not, you'll need to create your own test files. An example Yeoman test file looks like this.

***team-tmnt/test/spec/directives/dv-append.js***

    'use strict';

    describe('Directive: dvAppend', function () {

      // load the directive's module
      beforeEach(module('tmntApp'));

      var element,
        scope;

      beforeEach(inject(function ($rootScope) {
        scope = $rootScope.$new();
      }));

      it('should make hidden element visible', inject(function ($compile) {
        element = angular.element('<dv-append></dv-append>');
        element = $compile(element)(scope);
        expect(element.text()).toBe('this is the dvAppend directive');
      }));
    });


We'll write tests for all four ```dv-*``` directives that we covered in ```Directives.md```.

### dv-append

- Change your element to reflect how you'd actually set up a ```<dv-append>``` directive in a view. For instance, try

        element = angular.element('<dv-append text="initial text" append="appended text"></dv-append>');


- Add a ```scope.$digest()``` to force Angular to compile your directive.

        element = angular.element('<dv-append text="initial text" append="appended text"></dv-append>');
        element = $compile(element)(scope);
        scope.$digest();

- Test that your text has been appended.

        expect(element.text()).toBe('initial text appended text');

- Run ```grunt test``` to see it pass. The final product will look something like this:

        'use strict';

        describe('Directive: dvAppend', function () {

          // load the directive's module
          beforeEach(module('tmntApp'));

          var element,
            scope;

          beforeEach(inject(function ($rootScope) {
            scope = $rootScope.$new();
          }));

          it('should append text based on the text and append attributes', inject(function ($compile) {
            element = angular.element('<dv-append text="initial text" append="appended text"></dv-append>');
            element = $compile(element)(scope);
            scope.$digest();
            expect(element.text()).toBe('initial text appended text');
          }));
        });


### dv-color

- Follow the exact same steps that you did for ```dv-append```.
- Find ```team-tmnt/test/spec/directives/dv-color.js```.
- Adjust the element to match how you'd actually set up ```dv-color``` in a view.
- Run ```scope.$digest()```.
- Test that the text color has changed.


        it('should make hidden element visible', inject(function ($compile) {
          element = angular.element('<div dv-color="blue">some text</div>');
          element = $compile(element)(scope);
          scope.$digest();
          expect(element.css('color')).toBe('blue');
        }));


### dv-popup

- Add ```jquery``` to ```karma.conf.js```.
dv-color relies on jQuery, and you'll have all sorts of fun errors if Karma can't find it.

        ...
        files: [
              'app/bower_components/angular/angular.js',
              'app/bower_components/angular-mocks/angular-mocks.js',
              'app/bower_components/angular-ui-router/release/angular-ui-router.js',
              'app/bower_components/jquery/jquery.js',
              'app/scripts/*.js',
              'app/scripts/**/*.js',
              'test/mock/**/*.js',
              'test/spec/**/*.js'
            ],
        ...

- Create an Angular element that includes the ```dv-popup``` directive like you'd use it in a regular view.

        element = angular.element('<button class="trigger">Click Me</button><div dv-popup=".trigger"><div class="popup-guts"></div></div>');

- Run your ```scope.$digest()```.
- Test that your popup wrapper is set to ```display: none```.

        expect(element.children('.popup').css('display')).toBe('none');

- Test that the next ```div``` has the ```popup-guts``` class.

        it('should wrap .popup-guts in a .popup div', inject(function ($compile) {
          element = angular.element('<div dv-popup=".trigger"><div class="popup-guts" style="color: blue;">GUTS</div></div>');
          element = $compile(element)(scope);
          scope.$digest();

          expect(element.children('.popup').attr('style')).toBe('display: none');
          expect(element.children('.popup').eq(0).find('div').hasClass('popup-guts')).toBe(true);
        }));

### dv-table


- Install the html2js preprocessor

        npm install --save-dev karma-ng-html2js-preprocessor

- Add preprocessor to ```karma.conf.js```

        //Add preprocessors,
        preprocessors: {
          'app/views/**/*.html': 'html2js'
        }

- Tell ```html2js``` to strip ```app/``` from the template paths.

        ngHtml2JsPreprocessor: {
          stripPrefix: 'app/' // strip app from the file path
        }

- Add template module to ```team-tmnt/test/spec/directives/dv-table.js```.

        beforeEach(module('views/directives/dv-table.html'));

- Build out the ```scope``` and the angular.element in the ```beforeEach```. Don't forget to inject ```$compile``` and to run ```scope.$digest()```.

        beforeEach(inject(function ($rootScope, $compile) {
          scope = $rootScope.$new();
          scope.data = [{id: 1, name: 'Spike'}, {id: 2, name: "Nelly"}];
          scope.headers = ['id', 'name'];

          element = angular.element('<div dv-table="data" dv-table-headers="headers"></div>');
          element = $compile(element)(scope);
          scope.$digest();
        }));

- Test the thead

        it('should render table headers', inject(function ($compile) {
          var headers = element.find('thead').eq(0).find('th');

          console.log('headers', headers);

          expect(headers.eq(0).text()).toBe('id');
          expect(headers.eq(1).text()).toBe('name');
        }));

- Test the tbody

        it('should render table rows', inject(function ($compile) {
          var rows = element.find('tbody').eq(0).find('tr');

          console.log('rows', rows);

          expect(rows.eq(0).find('td').eq(0).text()).toBe('1');
          expect(rows.eq(0).find('td').eq(1).text()).toBe('Spike');

          expect(rows.eq(1).find('td').eq(0).text()).toBe('2');
          expect(rows.eq(1).find('td').eq(1).text()).toBe('Nelly');
        }));

The final result should look something like this.


    'use strict';

    describe('Directive: dvTable', function () {

      // load the directive's module
      beforeEach(module('tmntApp'));

      var element,
        scope;

      beforeEach(module('views/directives/dv-table.html'));

      beforeEach(inject(function ($rootScope, $compile) {
        scope = $rootScope.$new();
        scope.data = [{id: 1, name: 'Spike'}, {id: 2, name: "Nelly"}];
        scope.headers = ['id', 'name'];

        element = angular.element('<div dv-table="data" dv-table-headers="headers"></div>');
        element = $compile(element)(scope);
        scope.$digest();
      }));

      it('should render table headers', inject(function ($compile) {
        var headers = element.find('thead').eq(0).find('th');

        console.log('headers', headers);

        expect(headers.eq(0).text()).toBe('id');
        expect(headers.eq(1).text()).toBe('name');
      }));

      it('should render table rows', inject(function ($compile) {
        var rows = element.find('tbody').eq(0).find('tr');

        console.log('rows', rows);

        expect(rows.eq(0).find('td').eq(0).text()).toBe('1');
        expect(rows.eq(0).find('td').eq(1).text()).toBe('Spike');

        expect(rows.eq(1).find('td').eq(0).text()).toBe('2');
        expect(rows.eq(1).find('td').eq(1).text()).toBe('Nelly');
      }));
    });

### Testing Services

Services are easy to test once you have all of your dependencies injected properly; however, injecting and mocking
service dependencies can be tricky.

Let's test ```turtle-service.js```.

- Locate ```team-tmnt/test/spec/services/turtle-service.js```.
- Make sure it looks something like this:

        'use strict';

        describe('Service: TurtleService', function () {

          // load the service's module
          beforeEach(module('tmntApp'));

          // instantiate service
          var TurtleService;
          beforeEach(inject(function (_TurtleService_) {
            TurtleService = _TurtleService_;
          }));
        });

- Test ```turtleService.getTeam()```.
Making sure to inject ```$httpBackend```. It's a simple test once you realize how easy it is to mock the ```$http``` request.

        it('should do get a team', inject(function ($httpBackend) {
          var teamId = 1;
          $httpBackend.expectGET('http://pure-ocean-3603.herokuapp.com/team/' + teamId).respond({id: 1, name: 'Streganona'});

          TurtleService.getTeam(1).then(function (result) {
            expect(result.name).toBe('Streganona');
          });
          $httpBackend.flush();

        }));

- Test ```turtleService.getTeams()```

        it('should do get teams', inject(function ($httpBackend) {
          $httpBackend.expectGET('http://pure-ocean-3603.herokuapp.com/team').respond([{id: 1, name: 'Streganona'}, {id: 2, name: 'Mary Poppins'}]);

          TurtleService.getTeams().then(function (result) {
            expect(result[0].name).toBe('Streganona');
            expect(result[1].name).toBe('Mary Poppins');
          });
          $httpBackend.flush();

        }));

- Your final product should look like this:

        'use strict';

        describe('Service: TurtleService', function () {

          // load the service's module
          beforeEach(module('tmntApp'));

          // instantiate service
          var TurtleService;
          beforeEach(inject(function (_TurtleService_) {
            TurtleService = _TurtleService_;
          }));

          it('should do get a team', inject(function ($httpBackend) {
            var teamId = 1;
            $httpBackend.expectGET('http://pure-ocean-3603.herokuapp.com/team/' + teamId).respond({id: 1, name: 'Streganona'});

            TurtleService.getTeam(1).then(function (result) {
              expect(result.name).toBe('Streganona');
            });
            $httpBackend.flush();

          }));


          it('should do get teams', inject(function ($httpBackend) {
            $httpBackend.expectGET('http://pure-ocean-3603.herokuapp.com/team').respond([{id: 1, name: 'Streganona'}, {id: 2, name: 'Mary Poppins'}]);

            TurtleService.getTeams().then(function (result) {
              expect(result[0].name).toBe('Streganona');
              expect(result[1].name).toBe('Mary Poppins');
            });
            $httpBackend.flush();

          }));
        });
