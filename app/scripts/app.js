'use strict';

angular.module('teamTmntApp', ['ui.router']).config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      resolve: {
        teams: function(TurtleService) {
          return TurtleService.getTeams();
        }
      }
    })
    .state('team', {
      url: '/team/:teamId',
      templateUrl: 'views/team.html',
      controller: 'TeamCtrl',
      resolve:  {
        team: function($stateParams, TurtleService) {
          return TurtleService.getTeam($stateParams.teamId);
        }
      }
    });
});
