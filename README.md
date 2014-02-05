team-tmnt
=========

A simple project for practicing Angular, angular-ui-router, and services

The goal of this project is to practice using the angular-ui-router combined with promises and services.

##Step 1: Setup your project
* Using Yeoman, create a new angular app
  * Be sure uncheck the angular-route option at setup
* Using bower, install angular-ui-router. **Note** due to a recently-introduced [bug](https://github.com/angular-ui/ui-router/commit/ccdab193315f304eb3be5f5b97c47a926c79263e) in angular-ui-router, you need to install a specific version of the bower package or the router will not work. Specifically:

```
bower install --save angular-ui-router#0.2.8-bowratic-tedium
```

Note the --save option, which ensures that this version is saved to your bower.json file.
* Run `grunt bower-install` so that grunt includes the angular-ui-router reference in your html file.
* In the index.html file, remove the MainCtrl ng-controller reference and the ng-include reference and include angular-ui-router's ui-view reference. When you're done, it should look like this:

```
<div class="container" ui-view></div>
```
* Take out all the html in the main.html template and replace it with an h1 called "TMNT"

##Step 2: Setup your router/states
`$stateProvider` from angular-ui-router is much more flexible and powerful than the default router in Angular. Let's set it up.
* Read the documentation for setting up the stateProvider, specifically Step 3 and Step 5. [Documentation link](https://github.com/angular-ui/ui-router#nested-states--views)
* In your app.js, include the `ui.router` dependency for the app.
* Add a config to your app module, and specify `$stateProvider` and `urlRouterProvider` as dependenies.
* Add the default routing for any non-matched states using `urlRouterProvider`

```javascript
$urlRouterProvider.otherwise('/');
```
* Configure the default state, `main`, with the following:
 * URL: '/'
 * templateUrl: 'views/main.html'
 * controller: 'MainCtrl',
* Configure a "team" state with the following:
  * URL: '/team/:teamId' 
  * Template: 'templates/team.html'
  * Controller: 'TeamCtrl'
* Setup or create TeamCtrl and TeamView (hint: Yeoman makes this really easy ...)
* Ensure that your application works as expected (/ should show the default main view and #/team/1 should show the team template)

##Step 3: Create a `TurtleService`
* Use Yeoman to create a TurtleService (*hint*: if you specify `turtle-service` when creating the service, it will automatically camel-case the name for you).
* Create a `getTeams` method on TurtleService that will return the team members. You'll get the team data from a remote server. You'll create a deferred object with a promise that will fetch the data using Angular's $http service and return the results. Here's how we'll do that:
  * Inside the getTeams function, create a deffered object from Angular's `$q.defer()`

```javascript
var deferred = $q.defer();
```
  * Make sure you include $q and $http as injected dependencies in the TurtleService.
  * Next, invoke $http with a "GET" request that references this url: 'http://pure-ocean-3603.herokuapp.com/team'
  * On the success function of the $http request, resolve the deferred object with the data retrieved.
  * Finally, return the deferred.promise from the getTeams method. Your getTeams method on the TurtleService should now look something like this:

```javascript
getTeams: function() {
  var deferred = $q.defer();

  $http({method: 'GET', url: 'http://pure-ocean-3603.herokuapp.com/team'}).success(function(data) {
      deferred.resolve(data);
    }
  );
  return deferred.promise;
}
```

* Back in your main app.js, include the TurtleService as a dependency in your main app's config function
* Add a `resolve` option to the main state in your router
  * The resolve will have a list of variables that will be injected into your MainCtrl, make one called `teams`
  * Have `team` point to a function that returns TurtleService's `getTeams` method

```javascript
resolve: {
  teams: function(TurtleService) {
    return TurtleService.getTeams();
  }
}
```

* In the MainCtrl, we need to send the results of the `teams` resolve to the scope. `$scope.teams = teams` (Be sure to specify the teams var as a dependency coming from the router).
* Now, let's add the hook in the view. Head back over to your main.html view and add an h3 tag that repeats for every team in teams, and spits out an anchor tag with ng-href that points it the link to `#/team/{{team.id}}` and shows the team name.
* Test your app to make sure the `/` route and the main state are working as expected.

##Step 4: Add a team state/page
* Modify the team state in your app's stateProvider.
  * The URL should still point to `/team/:teamId` (teamId will be a passed param)
  * The controller should point to the Yeoman-made controller, TeamCtrl
  * Make a resolve for the team state that populates a `team` var with the result of the TurtleService's `getTeam` method that you're going to make in a minute. You're going to need to pass the id from the url into the getTeam call, so reference that using Angular's $stateParams var, so your resolve should look something like this:

```javascript
resolve:  {
  team: function($stateParams, TurtleService) {
    return TurtleService.getTeam($stateParams.teamId);
  }
}
```

* Go into the TurtleService and make a getTeam method almost exactly as before, but with the following changes:
  * the function will need to be passed a teamId
  * the URL will be a combination of the sever team url and the teamId: http://pure-ocean-3603.herokuapp.com/team/'+teamId
* In the TeamCtrl, we need to send the results of the `team` resolve to the scope, just like we did with the MainCtrl.
* Add an ng-repeat to the team view that spits out the character name for ever character in team.characters
* Test your app and the links to the team page to see if they're working
* **NOTE** If you're having problems getting the characters to show up, check the structure of the data being sent to the `team` resolve. Is it an Object? An Array? How can you send the data to the view in a way that makes sense?
* Make a way in your team view to get back to the home page

##Step 5 (Black Diamond): Make a nested view for each individual character
* Add a `getCharacter` method for the TurtleService using this url: 'http://pure-ocean-3603.herokuapp.com/character/'+charId
* Nest a view and create the appropriate state for showing the character information when someone clicks on a character on the team page. Use the [angular-ui-router](https://github.com/angular-ui/ui-router) docs for help.
