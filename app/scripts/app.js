'use strict';

angular.module('teamTmntApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      resolve: {
        teams: function(turtleService) {
          return turtleService.getTeams();
        }
      }
    })
    .state('team', {
      url: '/team/:teamId',
      templateUrl: 'views/team.html',
      controller: 'TeamCtrl',
      resolve:  {
        team: function($stateParams, turtleService) {
          return turtleService.getTeam($stateParams.teamId);
        }
      }
    });
});
