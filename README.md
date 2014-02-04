team-tmnt
=========

A simple project for practicing Angular, angular-ui-router, and services

The goal of this project is to practice using the angular-ui-router combined with promises and services.

##Step 1: Setup your project
* Using Yeoman, create a new angular app
  * Be sure uncheck the angular-route option at setup
* Using bower, install angular-ui-router. **Note** due to a recently-introduced [bug](https://github.com/angular-ui/ui-router/commit/ccdab193315f304eb3be5f5b97c47a926c79263e) in angular-ui-router, you need to install a specific version of the bower package or the router will not work. Specifically:

```
bower install --save 0.2.8-bowratic-tedium
```

Note the --save option, which ensures that this version is saved to your bower.json file.
* Run `grunt bower-install` so that grunt includes the angular-ui-router reference in your html file.
* In the index.html file, remove the MainCtrl ng-controller reference and the ng-include reference and include angular-ui-router's ui-view reference. When you're done, it should look like this:

```
<div class="container" ui-view></div>
```
* Take out all the html in the main.html template and replace it with an h2 called "Turtle Power"
* Add a link with a ui-sref that points to "team" (a state we'll create momentarily)

##Step 2: Setup your router/states
`$stateProvider` from angular-ui-router is much more flexible and powerful than the default router in Angular. Let's set it up.
* Read the documentation for setting up the stateProvider, specifically Step 3 and Step 5. [Documentation link](https://github.com/angular-ui/ui-router#nested-states--views)
* In your app.js, include the `ui.router` dependency for the app.
* Add a config to your app module, and specify `$stateProvider` and `urlRouterProvider` as dependenies.
* Add the default routing for any non-matched states using `urlRouterProvider`

```javascript
$urlRouterProvider.otherwise('/');
```
* Configure the default state, `main`, with the template pointing to views/main.html and the controller specified as `MainCtrl`
* Configure a "team" state with the following:
  * URL: '/team' 
  * Template: 'templates/team.html'
  * Controller: 'TeamCtrl'
* Setup or create TeamCtrl and TeamView (hint: Yeoman makes this really easy ...)
* Ensure that your application works as expected (/ should show the default main view and /team should show the team template)
* 
##Step 3: Populate the Team Page
* Include an ng-repeat that iterates through each `member` of `team` and spits out a p tag with the member's name
* Be sure to include a link that goes back to the home page

##Step 4: Create a `teamService`
* Use Yeoman to create a teamService.
* Create a `getTeam` method on teamService that will return the team members. The data should look something like this:

```javascript
[{name: 'Michaelangelo'}, {name: 'Donatello'}, {name: 'Raphael'}, {name: 'Leonardo'}]
```

* Include the teamService as a dependency in your main app's config function
* Add a `resolve` option to the team state in your router
  * The resolve will have a list of variables that will be injected into your TeamCtrl, make one called `team`
  * Have `team` point to a function that returns teamService's `getTeam` method
* Test your app and make sure that the /team page shows the team.
* 
##Step 5: Use a promise for loading the team
Now let's load our team from a remote source and use a promise in our service.
* 
