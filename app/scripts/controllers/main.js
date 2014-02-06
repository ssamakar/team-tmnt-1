'use strict';

angular.module('teamTmntApp')
  .controller('MainCtrl', function ($scope, teams) {
    $scope.teams = teams;
  });
